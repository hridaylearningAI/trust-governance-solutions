import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { requireProfile } from "@/lib/auth";
import {
  originFromRequest,
  rewriteEmailAssetsForOrigin,
} from "@/lib/email-assets";
import { createClient } from "@/lib/supabase/server";

export default async function SentEmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { profile, userId } = await requireProfile();
  const supabase = await createClient();

  const { data: email } = await supabase
    .from("sent_emails")
    .select("*")
    .eq("id", id)
    .single();

  if (!email) notFound();
  if (profile.role !== "admin" && email.sent_by !== userId) notFound();

  const { data: recipients } = await supabase
    .from("sent_email_recipients")
    .select("*")
    .eq("sent_email_id", id)
    .order("created_at", { ascending: true });

  const { data: sender } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", email.sent_by)
    .single();

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto =
    headerList.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");
  const previewOrigin =
    originFromRequest(
      new Request(`http://local`, {
        headers: host
          ? { host, "x-forwarded-proto": proto }
          : {},
      })
    ) || "http://localhost:3000";
  const previewHtml = rewriteEmailAssetsForOrigin(
    email.html_body,
    previewOrigin
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          href="/admin/sent"
          className="text-xs font-bold text-brand-deep hover:underline"
        >
          ← Back to sent
        </Link>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-ink">
          {email.subject}
        </h1>
        <p className="mt-1 text-sm font-medium text-body">
          {email.send_mode} · {email.status} · from {email.from_email}
          {email.cc_email ? ` · cc ${email.cc_email}` : ""}
          {sender ? ` · by ${sender.full_name}` : ""} ·{" "}
          {new Date(email.created_at).toLocaleString()}
        </p>
      </div>

      {email.error_message ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">
          {email.error_message}
        </p>
      ) : null}

      <section className="rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-5 py-3 text-sm font-black text-ink">
          Recipients ({recipients?.length ?? 0})
        </div>
        <ul className="divide-y divide-line">
          {(recipients ?? []).map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
            >
              <div>
                <p className="font-bold text-ink">
                  {r.recipient_name || r.recipient_email}
                </p>
                <p className="text-xs font-medium text-body">
                  {r.recipient_email}
                  {r.resend_id ? ` · ${r.resend_id}` : ""}
                </p>
                {r.error_message ? (
                  <p className="text-xs font-medium text-red-700">
                    {r.error_message}
                  </p>
                ) : null}
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                  r.status === "sent"
                    ? "bg-brand-soft text-brand-deeper"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-5 py-3 text-sm font-black text-ink">
          HTML preview
        </div>
        <iframe
          title="Sent email preview"
          sandbox="allow-same-origin allow-popups"
          srcDoc={previewHtml}
          className="h-[70vh] w-full"
        />
      </section>
    </div>
  );
}
