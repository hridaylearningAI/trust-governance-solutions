import { NextResponse } from "next/server";
import type { Profile } from "@/lib/admin-types";
import { rewriteEmailAssetsForDelivery } from "@/lib/email-assets";
import { getResend } from "@/lib/resend";
import { createClient } from "@/lib/supabase/server";

type RecipientInput = {
  email: string;
  name?: string | null;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 403 });
    }

    const sender = profile as Profile;

    const body = (await request.json()) as {
      subject?: string;
      html?: string;
      writeup?: string;
      recipients?: RecipientInput[];
      mode?: "individual" | "bulk";
    };

    const subject = body.subject?.trim();
    // Localhost asset URLs work in admin preview; rewrite to the public host for recipients.
    const html = body.html?.trim()
      ? rewriteEmailAssetsForDelivery(body.html.trim())
      : "";
    const mode = body.mode === "bulk" ? "bulk" : "individual";
    const rawRecipients = Array.isArray(body.recipients) ? body.recipients : [];

    if (!subject || !html) {
      return NextResponse.json(
        { error: "Subject and HTML body are required." },
        { status: 400 }
      );
    }

    const recipients = rawRecipients
      .map((r) => ({
        email: normalizeEmail(r.email ?? ""),
        name: r.name?.trim() || null,
      }))
      .filter((r) => isValidEmail(r.email));

    const unique = new Map<string, RecipientInput>();
    for (const r of recipients) {
      unique.set(r.email, r);
    }
    const list = [...unique.values()];

    if (list.length === 0) {
      return NextResponse.json(
        { error: "At least one valid recipient email is required." },
        { status: 400 }
      );
    }

    if (mode === "individual" && list.length !== 1) {
      return NextResponse.json(
        { error: "Individual mode accepts exactly one recipient." },
        { status: 400 }
      );
    }

    const { data: sentRow, error: insertError } = await supabase
      .from("sent_emails")
      .insert({
        subject,
        html_body: html,
        plain_writeup: body.writeup?.trim() || null,
        from_email: sender.from_email,
        cc_email: sender.cc_email,
        send_mode: mode,
        recipient_count: list.length,
        status: "queued",
        sent_by: user.id,
      })
      .select("*")
      .single();

    if (insertError || !sentRow) {
      return NextResponse.json(
        { error: insertError?.message ?? "Failed to log email" },
        { status: 500 }
      );
    }

    const resend = getResend();
    const from = `${sender.full_name} <${sender.from_email}>`;
    const cc = sender.cc_email?.trim().toLowerCase() || null;

    const recipientResults: Array<{
      recipient_email: string;
      recipient_name: string | null;
      resend_id: string | null;
      status: "sent" | "failed";
      error_message: string | null;
    }> = [];

    // Send sequentially to stay within Resend rate limits and capture per-recipient status.
    for (const recipient of list) {
      try {
        // Avoid To/Cc duplicate — ESP delivery often drops or hides those.
        const ccList =
          cc && cc !== recipient.email ? [cc] : undefined;

        const payload = {
          from,
          to: [recipient.email],
          cc: ccList,
          subject,
          html,
          replyTo: cc ?? undefined,
        };

        const { data, error } = await resend.emails.send(payload);

        if (error) {
          console.error("[admin/send] resend error", {
            to: recipient.email,
            from: sender.from_email,
            error,
          });
          recipientResults.push({
            recipient_email: recipient.email,
            recipient_name: recipient.name ?? null,
            resend_id: null,
            status: "failed",
            error_message: error.message,
          });
        } else if (!data?.id) {
          console.error("[admin/send] resend returned no id", {
            to: recipient.email,
            data,
          });
          recipientResults.push({
            recipient_email: recipient.email,
            recipient_name: recipient.name ?? null,
            resend_id: null,
            status: "failed",
            error_message: "Resend accepted the request but returned no email id.",
          });
        } else {
          console.info("[admin/send] resend accepted", {
            to: recipient.email,
            from: sender.from_email,
            resendId: data.id,
          });
          recipientResults.push({
            recipient_email: recipient.email,
            recipient_name: recipient.name ?? null,
            resend_id: data.id,
            status: "sent",
            error_message: null,
          });
        }
      } catch (err) {
        console.error("[admin/send] resend threw", err);
        recipientResults.push({
          recipient_email: recipient.email,
          recipient_name: recipient.name ?? null,
          resend_id: null,
          status: "failed",
          error_message:
            err instanceof Error ? err.message : "Unknown send error",
        });
      }
    }

    const sentCount = recipientResults.filter((r) => r.status === "sent").length;
    const failedCount = recipientResults.length - sentCount;
    const status =
      failedCount === 0
        ? "sent"
        : sentCount === 0
          ? "failed"
          : "partial";

    const { error: recipientsInsertError } = await supabase
      .from("sent_email_recipients")
      .insert(
        recipientResults.map((r) => ({
          sent_email_id: sentRow.id,
          ...r,
        }))
      );

    if (recipientsInsertError) {
      console.error("[admin/send] recipients insert failed", recipientsInsertError);
    }

    const errorMessage =
      failedCount > 0
        ? `${failedCount} of ${recipientResults.length} recipients failed`
        : null;

    const firstResendId =
      recipientResults.find((r) => r.resend_id)?.resend_id ?? null;

    const { error: updateError } = await supabase
      .from("sent_emails")
      .update({
        status,
        error_message: errorMessage,
        resend_batch_id: firstResendId,
      })
      .eq("id", sentRow.id);

    if (updateError) {
      console.error("[admin/send] sent_emails update failed", updateError);
    }

    return NextResponse.json({
      id: sentRow.id,
      status,
      sent: sentCount,
      failed: failedCount,
      from: sender.from_email,
      cc: cc && !list.some((r) => r.email === cc) ? cc : null,
      resendIds: recipientResults.map((r) => r.resend_id).filter(Boolean),
      recipients: recipientResults,
      persistenceWarning: updateError?.message ?? recipientsInsertError?.message ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    console.error("[admin/send]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
