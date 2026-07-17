import {
  Activity,
  Checkmark,
  ChevronDown,
  Dashboard,
  DocumentView,
  FolderDetails,
  Growth,
  Layers,
  Notification,
  Plug,
  Report,
  Settings,
} from "@carbon/icons-react";

const sideNav = [
  { icon: Dashboard, label: "Overview", active: true },
  { icon: Layers, label: "Frameworks" },
  { icon: DocumentView, label: "Findings" },
  { icon: FolderDetails, label: "Evidence" },
  { icon: Report, label: "Reports" },
  { icon: Activity, label: "Monitoring" },
  { icon: Plug, label: "Integrations" },
  { icon: Settings, label: "Settings" },
];

const frameworkScores = [
  { label: "SOC 2 Type II", score: "100%" },
  { label: "ISO 27001", score: "98%" },
  { label: "Security", score: "100%" },
  { label: "Privacy", score: "98%" },
];

const stats = [
  { label: "Controls Checked", value: "142", note: "12 this month", up: true, count: true },
  { label: "Gaps Fixed", value: "6", note: "4 this month", up: true, count: true },
  { label: "Open Criticals", value: "0", note: "No critical issues", up: false, count: false },
  { label: "Last Scan", value: "2h ago", note: "Continuous", up: false, count: false },
];

function Donut() {
  // r=70 → circumference ≈ 439.8; 99% leaves a 4.4 offset
  return (
    <div
      className="relative h-40 w-40 shrink-0"
      role="img"
      aria-label="99% review-ready"
    >
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <defs>
          <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0fa183" />
            <stop offset="100%" stopColor="#0a5f52" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#e7eef4"
          strokeWidth="15"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#donut-grad)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="439.8"
          strokeDashoffset="4.4"
          transform="rotate(-90 80 80)"
          className="animate-donut"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-black text-ink"
          data-counter
          data-counter-value="99"
          data-counter-suffix="%"
        >
          99%
        </span>
        <span className="text-[11px] font-bold text-faint">Review-ready</span>
      </div>
    </div>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="h-14 w-full max-w-[220px]"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0fa183" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0fa183" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 44 L20 38 L40 42 L60 30 L80 35 L100 24 L120 30 L140 18 L160 25 L180 12 L200 18 L220 8 V56 H0 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 44 L20 38 L40 42 L60 30 L80 35 L100 24 L120 30 L140 18 L160 25 L180 12 L200 18 L220 8"
        fill="none"
        stroke="#0fa183"
        strokeWidth="2"
        strokeLinejoin="round"
        className="animate-spark"
      />
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <div
      className="grid overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-[148px_1fr]"
      aria-label="Preview of the TGS compliance dashboard"
    >
      {/* sidebar */}
      <div className="hidden border-r border-line bg-mist/70 px-3 py-5 sm:block">
        <span className="px-2 text-lg font-black tracking-tight text-ink">
          TGS
        </span>
        <ul className="mt-5 space-y-0.5">
          {sideNav.map(({ icon: Icon, label, active }) => (
            <li key={label}>
              <span
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] font-bold ${
                  active
                    ? "bg-white text-brand-deep shadow-sm"
                    : "text-faint"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* main panel */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-extrabold text-ink">
            Compliance Overview
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-[12px] font-bold text-body">
              Acme Tools
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
            <Notification className="h-4 w-4 text-faint" />
          </span>
        </div>

        <div className="mt-5 flex flex-col items-center gap-6 min-[420px]:flex-row">
          <Donut />
          <ul className="w-full space-y-2.5">
            {frameworkScores.map(({ label, score }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[13px] font-bold text-ink"
              >
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-soft">
                  <Checkmark className="h-3 w-3 text-brand-deep" />
                </span>
                {label}
                <span className="ml-auto font-extrabold text-brand-deep">
                  {score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {stats.map(({ label, value, note, up, count }) => (
            <div
              key={label}
              className="rounded-xl border border-line px-3 py-2.5"
            >
              <span className="block text-[10px] font-extrabold tracking-wide text-faint">
                {label}
              </span>
              <span
                className="mt-0.5 block whitespace-nowrap text-lg font-black text-ink"
                data-counter={count ? "" : undefined}
                data-counter-value={count ? value : undefined}
              >
                {value}
              </span>
              <span
                className={`mt-0.5 flex items-center gap-1 text-[10px] font-bold ${
                  up ? "text-brand-deep" : "text-faint"
                }`}
              >
                {up && <Growth className="h-3 w-3" />}
                {note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-4 rounded-xl border border-line px-4 py-3">
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-[12px] font-extrabold text-ink">
              Monitoring Status
              <span className="flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-extrabold text-brand-deep">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                  aria-hidden="true"
                />
                Live
              </span>
            </span>
            <span className="mt-1 block text-[11px] font-semibold leading-snug text-faint">
              All systems operational and continuously monitored
            </span>
          </div>
          <div className="hidden w-2/5 shrink-0 min-[420px]:block">
            <Sparkline />
          </div>
        </div>
      </div>
    </div>
  );
}
