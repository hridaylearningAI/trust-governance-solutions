const PRODUCTION_ORIGIN = "https://www.tgsolutions.net";

export function productionSiteOrigin() {
  return (
    process.env.NEXT_PUBLIC_PRODUCTION_SITE_URL?.replace(/\/$/, "") ||
    PRODUCTION_ORIGIN
  );
}

/** Resolve the origin used for email asset URLs (logo/icons). */
export function resolveAssetOrigin(requestOrigin?: string | null) {
  const fromRequest = normalizeOrigin(requestOrigin);
  if (fromRequest) return fromRequest;

  const fromEnv = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return productionSiteOrigin();
}

export function originFromRequest(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const host = forwardedHost || request.headers.get("host");
  if (!host) return null;

  const proto =
    forwardedProto ||
    (host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return normalizeOrigin(`${proto}://${host}`);
}

/**
 * Public email assets.
 * Icons are Phosphor Bold glyphs rendered to PNG for email-client safety
 * (Outlook does not reliably support SVG).
 */
export function emailAssets(origin: string) {
  const base = origin.replace(/\/$/, "");
  return {
    /** Full logo — use only on white / mist surfaces */
    logo: `${base}/email/tgs-logo.png`,
    /** Full logo already composited on a white rounded card */
    logoOnWhite: `${base}/email/tgs-logo-on-white.png`,
    /** Shield mark — use on white / mist surfaces */
    mark: `${base}/email/tgs-mark.png`,
    /** Mark on white seal — use on navy footers */
    markOnWhite: `${base}/email/tgs-mark-on-white.png`,
    icons: {
      /** Phosphor: magnifying-glass-bold */
      scan: `${base}/email/icon-scan.png`,
      /** Phosphor: check-circle-bold */
      check: `${base}/email/icon-check.png`,
      /** Phosphor: clock-bold */
      clock: `${base}/email/icon-clock.png`,
      /** Phosphor: shield-check-bold */
      shield: `${base}/email/icon-shield.png`,
      /** Phosphor: envelope-simple-bold */
      mail: `${base}/email/icon-mail.png`,
    },
  } as const;
}

/** Make /email/* assets load on whatever host is previewing the HTML. */
export function rewriteEmailAssetsForOrigin(html: string, origin: string) {
  const target = origin.replace(/\/$/, "");
  return html
    .replace(/https?:\/\/[^"'/\s]+\/email\//g, `${target}/email/`)
    .replaceAll('src="/email/', `src="${target}/email/`)
    .replaceAll("src='/email/", `src='${target}/email/`);
}

/**
 * Before handing HTML to Resend, point assets at the public production host
 * so recipients (and non-local mail clients) can fetch them.
 */
export function rewriteEmailAssetsForDelivery(html: string) {
  return rewriteEmailAssetsForOrigin(html, productionSiteOrigin());
}

function normalizeOrigin(value?: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.origin;
  } catch {
    return null;
  }
}
