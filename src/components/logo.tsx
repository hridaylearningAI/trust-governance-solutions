type LogoVariant = "dark" | "light";

/**
 * Placeholder mark — swap this SVG for the real logo asset when it's available.
 * Everything on the site renders the logo through this file, so it's a single swap point.
 */
export function LogoMark({
  variant = "dark",
  className = "h-10 w-10",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const stroke = variant === "dark" ? "#0e2a44" : "#ffffff";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 3 42 10v12.5C42 34.3 34.4 42.7 24 45 13.6 42.7 6 34.3 6 22.5V10L24 3Z"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 20h24"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={stroke}
        fontFamily="inherit"
      >
        TGS
      </text>
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const ink = variant === "dark" ? "text-ink" : "text-white";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span
          className={`block text-[15px] font-extrabold tracking-[0.06em] ${ink}`}
        >
          TRUST GOVERNANCE
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px flex-1 bg-brand" aria-hidden="true" />
          <span className="text-[10px] font-extrabold tracking-[0.32em] text-brand-deep">
            SOLUTIONS
          </span>
          <span className="h-px flex-1 bg-brand" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}
