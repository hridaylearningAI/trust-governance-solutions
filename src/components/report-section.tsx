import {
  ArrowRight,
  Checkmark,
  CheckmarkFilled,
  CircleDash,
  DataBackup,
  Debug,
  Earth,
  Group,
  Locked,
  Renew,
  Security,
  UserFollow,
} from "@carbon/icons-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LogoMark } from "./logo";

const reportStats = [
  { label: "Controls checked", value: "142", accent: false },
  { label: "Gaps fixed", value: "6", accent: true },
  { label: "Open criticals", value: "0", accent: true },
];

const reportFrameworks = [
  { icon: Security, label: "SOC 2 Type II" },
  { icon: Earth, label: "ISO 27001 Certified" },
  { icon: CircleDash, label: "GDPR Aligned" },
];

const evidence = [
  { icon: Locked, label: "Data encryption at rest & transit" },
  { icon: UserFollow, label: "Access control & SSO enforcement" },
  { icon: Debug, label: "Vulnerability management" },
  { icon: DataBackup, label: "Backup & disaster recovery" },
];

const benefits = [
  {
    icon: Security,
    title: "100% mapped to buyer standards",
    text: "Backed by verified evidence from your real product.",
  },
  {
    icon: Group,
    title: "Accepted as-is",
    text: "No follow-up spreadsheets. No repetitive Q&A.",
  },
  {
    icon: Renew,
    title: "Always up to date",
    text: "Continuous monitoring keeps your report live.",
  },
];

function ReportCard({ fill = false }: { fill?: boolean }) {
  return (
    <div
      className={`grid overflow-hidden rounded-2xl border border-line bg-white shadow-card min-[480px]:grid-cols-[140px_1fr] ${
        fill
          ? "h-full w-full rounded-none border-0 shadow-none lg:grid-cols-[180px_1fr]"
          : ""
      }`}
    >
      {/* navy rail: document identity */}
      <div
        className={`flex items-center justify-between gap-4 bg-navy p-5 min-[480px]:flex-col min-[480px]:items-stretch min-[480px]:justify-start ${
          fill ? "lg:p-6" : ""
        }`}
      >
        <div className="flex items-center gap-3 min-[480px]:flex-col min-[480px]:items-start min-[480px]:gap-0">
          <LogoMark
            variant="light"
            className="h-12 w-12 shrink-0 min-[480px]:h-14 min-[480px]:w-14"
          />
          <div className="min-[480px]:mt-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-white/50">
              Trust Governance
            </p>
            <p className="mt-1 text-base font-black leading-tight text-white min-[480px]:text-lg">
              Compliance Report
            </p>
          </div>
        </div>

        {fill && (
          <dl className="mt-6 hidden space-y-4 border-t border-white/15 pt-5 lg:block">
            {[
              ["Report ID", "TGS-2026-0142"],
              ["Issued", "Jul 12, 2026"],
              ["Coverage", "Continuous"],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                  {term}
                </dt>
                <dd className="mt-0.5 text-[12px] font-bold text-white/90">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <span className="inline-flex items-center gap-1.5 self-center rounded-full border border-brand/50 bg-brand/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-soft min-[480px]:mt-auto min-[480px]:self-start min-[480px]:pt-1">
          <Checkmark className="h-3 w-3" />
          Verified
        </span>
      </div>

      {/* document body */}
      <div
        className={`relative ${
          fill ? "flex min-h-0 flex-col p-6 lg:px-9 lg:py-8" : "p-6"
        }`}
      >
        {/* faint seal watermark, as on a stamped document */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
        >
          <LogoMark className="h-64 w-64" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xl font-black text-ink">Acme Tools</span>
            <p className="mt-0.5 text-[11px] font-bold text-faint">
              Vendor Compliance Assessment · Issued Jul 12, 2026
            </p>
          </div>
          <span className="rounded-md bg-mist px-2.5 py-1.5 text-[10px] font-extrabold tracking-wide text-body">
            PREPARED FOR <span className="text-ink">BIGCO</span>
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {reportStats.map(({ label, value, accent }) => (
            <div
              key={label}
              className="rounded-xl border border-line px-3 py-2.5"
            >
              <span className="block text-[9px] font-extrabold uppercase tracking-wide text-faint">
                {label}
              </span>
              <span
                className={`mt-0.5 block text-2xl font-black ${
                  accent ? "text-brand-deep" : "text-ink"
                }`}
                data-counter={value !== "0" ? "" : undefined}
                data-counter-value={value !== "0" ? value : undefined}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[12px] font-extrabold text-ink">Frameworks</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {reportFrameworks.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-bold text-ink"
            >
              <Icon className="h-3.5 w-3.5 text-brand-deep" />
              {label}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[12px] font-extrabold text-ink">Key Evidence</p>
        <ul
          className={`mt-1.5 divide-y divide-line ${
            fill ? "flex flex-1 flex-col justify-evenly" : ""
          }`}
        >
          {evidence.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 py-2 text-[13px] font-semibold text-ink"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-faint" />
              {label}
              <Checkmark
                className="ml-auto h-4 w-4 shrink-0 text-brand-deep"
                aria-label="verified"
              />
            </li>
          ))}
        </ul>

        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-mist px-4 py-3 text-[13px] font-bold text-body">
          <CheckmarkFilled className="h-4 w-4 shrink-0 text-brand-deep" />
          <span>
            Digitally attested by TGS — accepted as-is, no follow-up
            questionnaire.
          </span>
          {fill && (
            <span className="ml-auto text-[10px] font-extrabold tracking-wide text-faint">
              TGS-2026-0142
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function BenefitsList({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <ul
      className={
        horizontal
          ? "mt-9 flex flex-wrap items-start justify-center gap-x-10 gap-y-6"
          : "mt-9 space-y-7"
      }
      data-reveal-group
    >
      {benefits.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft">
            <Icon className="h-5 w-5 text-brand-deep" />
          </span>
          <div className="text-left">
            <h3 className="text-base font-extrabold text-ink">{title}</h3>
            <p
              className={`mt-1 text-[15px] font-medium leading-relaxed text-body ${
                horizontal ? "max-w-[24ch]" : "max-w-[36ch]"
              }`}
            >
              {text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ReportHeading() {
  return (
    <h2 className="text-[clamp(1.9rem,3.4vw,2.5rem)] font-black leading-[1.12] tracking-[-0.01em] text-ink">
      One document.
      <br className="md:hidden" />
      <span className="hidden md:inline"> </span>
      Endless buyers.
    </h2>
  );
}

function ViewReportLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="#get-started"
      className={`inline-flex items-center gap-2 text-base font-extrabold text-brand-deep transition-colors hover:text-brand-deeper ${className}`}
    >
      View report example
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export function ReportSection() {
  return (
    <section>
      {/* Mobile: stacked layout, no 3D scroll effect (the report stays fully readable) */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:hidden">
        <div>
          <ReportHeading />
          <BenefitsList />
          <ViewReportLink className="mt-9" />
        </div>
        <ReportCard />
      </div>

      {/* Desktop: the report rises out of a 3D-tilted tablet as you scroll */}
      <div className="hidden overflow-hidden md:block">
        <ContainerScroll
          titleComponent={
            <div className="mx-auto max-w-5xl px-6 pb-6">
              <ReportHeading />
              <BenefitsList horizontal />
              <ViewReportLink className="mt-8" />
            </div>
          }
        >
          <ReportCard fill />
        </ContainerScroll>
      </div>
    </section>
  );
}
