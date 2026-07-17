import { CircleDash, Earth, Security, Task } from "@carbon/icons-react";

const frameworks = [
  { icon: Security, label: "SOC 2" },
  { icon: Earth, label: "ISO 27001" },
  { icon: CircleDash, label: "GDPR" },
  { icon: Task, label: "Buyer checklists" },
];

export function FrameworksBand() {
  return (
    <section className="border-y border-line bg-mist py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-[13px] font-extrabold uppercase tracking-[0.22em] text-body">
          Frameworks we map to
        </h2>
        <ul className="mt-7 flex flex-wrap justify-center gap-4" data-reveal-group>
          {frameworks.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-6 py-3.5"
              data-hover-lift
            >
              <Icon className="h-5 w-5 text-brand-deep" />
              <span className="text-[15px] font-extrabold text-ink">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
