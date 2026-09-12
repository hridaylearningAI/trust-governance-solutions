import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateEmailResult } from "@/lib/admin-types";
import {
  emailAssets,
  resolveAssetOrigin,
  rewriteEmailAssetsForOrigin,
} from "@/lib/email-assets";

const BRAND = {
  ink: "#10263e",
  body: "#43596e",
  navy: "#0e2a44",
  navyDeep: "#0a2033",
  brand: "#0fa183",
  brandDeep: "#0b8069",
  brandSoft: "#e3f4ee",
  mist: "#f3f7fa",
  line: "#e2e9f0",
  white: "#ffffff",
};

function extractJson(text: string): GenerateEmailResult {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const parsed = JSON.parse(raw) as Partial<GenerateEmailResult>;
  if (!parsed.subject || !parsed.html) {
    throw new Error("Gemini response missing subject or html");
  }
  return {
    subject: parsed.subject,
    preheader: parsed.preheader ?? "",
    html: parsed.html,
  };
}

function logoHeaderHtml(assets: ReturnType<typeof emailAssets>) {
  // Logo artwork is navy + teal on transparent/white — keep it on a white panel.
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;background-color:${BRAND.white};">
  <tr>
    <td align="center" style="padding:28px 24px 20px 24px;background-color:${BRAND.white};">
      <a href="https://www.tgsolutions.net" style="text-decoration:none;">
        <img src="${assets.logo}" width="150" alt="Trust Governance Solutions" style="display:block;width:150px;max-width:150px;height:auto;border:0;outline:none;text-decoration:none;background-color:${BRAND.white};" />
      </a>
    </td>
  </tr>
</table>`.trim();
}

/** Ensure generated HTML always carries the hosted brand logo on a matching surface. */
function ensureBrandVisuals(
  html: string,
  assets: ReturnType<typeof emailAssets>,
  origin: string
) {
  let next = rewriteEmailAssetsForOrigin(html, origin);
  const hasLogo =
    next.includes("/email/tgs-logo.png") ||
    next.includes("/email/tgs-logo-on-white.png") ||
    next.includes("/email/tgs-mark.png") ||
    next.includes("/email/tgs-mark-on-white.png");

  if (!hasLogo) {
    const header = logoHeaderHtml(assets);
    if (/<body[^>]*>/i.test(next)) {
      next = next.replace(/<body([^>]*)>/i, `<body$1>\n${header}\n`);
    } else {
      next = `${header}\n${next}`;
    }
  }

  return rewriteEmailAssetsForOrigin(next, origin);
}

export async function generateConvertibleEmail(
  writeup: string,
  options?: {
    audienceHint?: string;
    ctaLabel?: string;
    /** e.g. http://localhost:3000 — used for logo/icon URLs in preview */
    assetOrigin?: string | null;
  }
): Promise<GenerateEmailResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const origin = resolveAssetOrigin(options?.assetOrigin);
  const assets = emailAssets(origin);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  const cta = options?.ctaLabel ?? "Book a Free Gap Check";
  const audience =
    options?.audienceHint ??
    "founders and engineering leads at software vendors selling into the enterprise";

  const prompt = `You are an expert B2B email designer and conversion copywriter for Trust Governance Solutions (TGS).

Brand voice: assured, clear, quietly technical. Numbers over adjectives. No hype, no cyber-fear clichés, no purple gradients.

Brand colors (use exactly):
- Navy deep headers/footers: ${BRAND.navyDeep} / ${BRAND.navy}
- Teal CTA / accents: ${BRAND.brand} / ${BRAND.brandDeep}
- Soft teal icon plate: ${BRAND.brandSoft}
- Body text: ${BRAND.body}
- Headings: ${BRAND.ink}
- Mist page background: ${BRAND.mist}
- Borders: ${BRAND.line}
- White content / logo surfaces: ${BRAND.white}

CRITICAL — logo background matching:
- The TGS logo and shield mark are navy + teal artwork designed for LIGHT surfaces.
- NEVER place tgs-logo.png or tgs-mark.png directly on navy, teal, mist-dark, or photo backgrounds.
- HEADER logo band MUST be solid white (${BRAND.white}) behind the logo. Prefer ${assets.logo} on white, or ${assets.logoOnWhite}.
- FOOTER is navy (${BRAND.navyDeep}). On navy, ONLY use the white-seal mark: ${assets.markOnWhite} (not the raw mark).
- If you place the mark in the body, sit it on white or ${BRAND.brandSoft} only.

Hosted brand assets (MUST use these exact absolute URLs — do not invent URLs, do not use raw SVG, do not use emoji as icons):
- Full logo (white header only): ${assets.logo}
- Full logo on white card (safe anywhere light): ${assets.logoOnWhite}
- Shield mark (light surfaces only): ${assets.mark}
- Shield mark on white seal (navy footer): ${assets.markOnWhite}
- Phosphor icon — magnifying-glass (scan): ${assets.icons.scan}
- Phosphor icon — check-circle (verified): ${assets.icons.check}
- Phosphor icon — clock (timeline): ${assets.icons.clock}
- Phosphor icon — shield-check (security): ${assets.icons.shield}
- Phosphor icon — envelope-simple (contact): ${assets.icons.mail}

These icon PNGs already include a soft teal rounded plate — do not add another colored circle behind them. Place them on white or mist.

Product: TGS scans a vendor's stack, prioritizes and fixes compliance gaps, and issues a buyer-ready compliance report with continuous monitoring so vendors pass enterprise reviews before they start. Primary CTA: "${cta}" (15 minutes, no obligation). Site: https://www.tgsolutions.net. Reply-to contact: hello@tgsolutions.net.

Audience: ${audience}.

Write-up / brief to turn into an email:
"""
${writeup.trim()}
"""

Return ONLY valid JSON with this shape:
{
  "subject": "compelling subject under 60 chars",
  "preheader": "preview text under 90 chars",
  "html": "<!DOCTYPE html>...full email HTML..."
}

HTML requirements:
1. Table-based, email-client-safe layout (Outlook-friendly). Inline CSS only. Max width 600px. Outer background ${BRAND.mist}.
2. No JavaScript, no external stylesheets, no web fonts (Arial, Helvetica, sans-serif). No SVG embeds. No CSS gradients.
3. Include a preheader span hidden visually at the top.
4. HEADER: full-width white band; centered logo (${assets.logo} or ${assets.logoOnWhite}) width 150, linking to https://www.tgsolutions.net. bgcolor/background-color must be ${BRAND.white}.
5. After the headline, a 3-column icon row using Phosphor PNGs at width="44" height="44":
   - Scan ${assets.icons.scan} — "Scan stack"
   - Check ${assets.icons.check} — "Fix gaps"
   - Clock ${assets.icons.clock} — "~3 weeks"
   Columns on white cards; 12px bold labels in ${BRAND.ink}.
6. Body copy short and specific. Optional proof strip with shield icon (${assets.icons.shield}) on white.
7. One primary CTA button: background ${BRAND.brandDeep}, white text, border-radius 8px, padding 14px 28px, link https://www.tgsolutions.net/#get-started. Label: "${cta}".
8. FOOTER on navy (${BRAND.navyDeep}): use ${assets.markOnWhite} width 36 (white seal), then "Trust Governance Solutions", tgsolutions.net, hello@tgsolutions.net, and {{unsubscribe}}.
9. High conversion: clear benefit, specificity, single primary action. Premium and calm.
10. Escape content safely. No fake testimonials or review ratings.
11. Every <img> needs alt, width, and style="display:block;border:0;outline:none;" plus an explicit matching background-color on its parent <td> (white for logo/icons, navy only with markOnWhite).`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = extractJson(text);
  return {
    ...parsed,
    html: ensureBrandVisuals(parsed.html, assets, origin),
  };
}
