import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { originFromRequest } from "@/lib/email-assets";
import { generateConvertibleEmail } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      writeup?: string;
      audienceHint?: string;
      ctaLabel?: string;
    };

    const writeup = body.writeup?.trim();
    if (!writeup || writeup.length < 20) {
      return NextResponse.json(
        { error: "Provide a write-up of at least 20 characters." },
        { status: 400 }
      );
    }

    const result = await generateConvertibleEmail(writeup, {
      audienceHint: body.audienceHint,
      ctaLabel: body.ctaLabel,
      assetOrigin: originFromRequest(request),
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate email";
    console.error("[admin/generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
