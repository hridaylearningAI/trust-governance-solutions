import Image from "next/image";

type LogoVariant = "dark" | "light";

/**
 * Brand assets (derived from the master file `public/tgs-logo-svg.svg`):
 * - `public/tgs-mark.svg`  — shield mark only, transparent background
 * - `public/tgs-logo.svg`  — full logo with wordmark, transparent background
 *
 * The mark's artwork is navy + teal, so on dark surfaces the `light` variant
 * presents it on a white circular seal (fitting for a compliance brand)
 * instead of disappearing into the background.
 */
export function LogoMark({
  variant = "dark",
  className = "h-10 w-10",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  if (variant === "light") {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-white ${className}`}
      >
        <Image
          src="/tgs-mark.svg"
          alt=""
          width={768}
          height={809}
          className="h-[72%] w-[72%] object-contain"
        />
      </span>
    );
  }
  return (
    <Image
      src="/tgs-mark.svg"
      alt=""
      width={627}
      height={661}
      className={`object-contain ${className}`}
    />
  );
}

export function Logo({
  variant = "dark",
  size = "md",
  className = "",
}: {
  variant?: LogoVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  const ink = variant === "dark" ? "text-ink" : "text-white";
  const lg = size === "lg";
  return (
    <span
      className={`inline-flex items-center ${lg ? "gap-3.5" : "gap-2.5"} ${className}`}
    >
      <LogoMark
        variant={variant}
        className={lg ? "h-14 w-14 shrink-0" : "h-10 w-10 shrink-0"}
      />
      <span className="leading-none">
        <span
          className={`block ${lg ? "text-[19px]" : "text-[15px]"} font-extrabold tracking-[0.06em] ${ink}`}
        >
          TRUST GOVERNANCE
        </span>
        <span className={`${lg ? "mt-2" : "mt-1.5"} flex items-center gap-2`}>
          <span className="h-px flex-1 bg-brand" aria-hidden="true" />
          <span
            className={`${lg ? "text-[12px]" : "text-[10px]"} font-extrabold tracking-[0.32em] text-brand-deep`}
          >
            SOLUTIONS
          </span>
          <span className="h-px flex-1 bg-brand" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}
