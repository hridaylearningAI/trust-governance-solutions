import { ArrowRight, Checkmark, Earth, Email } from "@carbon/icons-react";
import { LogoMark } from "./logo";

const points = [
  "Free gap check — 15 minutes",
  "See exactly what a buyer will flag",
  "No obligation",
];

export function CtaSection() {
  return (
    <section id="get-started" className="scroll-mt-24 bg-navy py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr_0.8fr] lg:gap-12" data-reveal-group>
        <div>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.5rem)] font-black leading-[1.15] tracking-[-0.01em] text-white">
            Get review-ready before your buyer asks.
          </h2>
          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-base font-bold text-white/90"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Checkmark className="h-3.5 w-3.5 text-navy-deep" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-panel">
          <h3 className="text-center text-lg font-extrabold text-ink">
            Start your free gap check
          </h3>
          <a
            href="mailto:hello@trustgovernance.co"
            className="mt-5 flex items-center gap-3 rounded-lg border border-line px-4 py-3 text-[15px] font-bold text-ink transition-colors hover:border-brand-deep hover:text-brand-deep"
          >
            <Email className="h-4.5 w-4.5 shrink-0 text-brand-deep" />
            hello@trustgovernance.co
          </a>
          <a
            href="mailto:hello@trustgovernance.co?subject=Free%20gap%20check"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-deep px-6 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-brand-deeper"
          >
            Book a Free Gap Check
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 flex items-center justify-center gap-2 text-[13px] font-bold text-body">
            <Earth className="h-4 w-4 text-faint" />
            trustgovernance.co/gap-check
          </p>
        </div>

        <div className="hidden flex-col items-center text-center lg:flex">
          <LogoMark variant="light" className="h-32 w-32" />
          <p className="mt-5 text-base font-extrabold tracking-[0.06em] text-white">
            TRUST GOVERNANCE
          </p>
          <p className="mt-2 flex w-full items-center gap-2">
            <span className="h-px flex-1 bg-brand" aria-hidden="true" />
            <span className="text-[11px] font-extrabold tracking-[0.32em] text-brand">
              SOLUTIONS
            </span>
            <span className="h-px flex-1 bg-brand" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
