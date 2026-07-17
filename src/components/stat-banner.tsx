import { CheckmarkOutline } from "@carbon/icons-react";

export function StatBanner() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <div className="flex flex-col items-center gap-5 rounded-2xl bg-brand-soft px-8 py-8 text-center sm:flex-row sm:text-left" data-reveal>
        <CheckmarkOutline
          className="h-11 w-11 shrink-0 text-brand-deep"
          aria-hidden="true"
        />
        <p className="text-[clamp(1.15rem,2.2vw,1.4rem)] font-extrabold leading-snug text-ink">
          85% less engineering time spent on reviews — one assessment, reused
          by every buyer.
        </p>
      </div>
    </section>
  );
}
