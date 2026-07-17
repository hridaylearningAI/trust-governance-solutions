import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Catalog, EventSchedule, Group } from "@carbon/icons-react";
import { ReactNode } from "react";

const problems = [
  {
    icon: EventSchedule,
    title: "Months of manual work",
    text: "2–3 months per review pulling engineers off product.",
  },
  {
    icon: Catalog,
    title: "Same questions, every buyer",
    text: "300-question reviews re-answered from scratch, every time.",
  },
  {
    icon: Group,
    title: "Deals that stall",
    text: "Security reviews create friction, delaying revenue and growth.",
  },
];

export function ProblemSection() {
  return (
    <section id="why-tgs" className="scroll-mt-24 py-16 md:py-24">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center" data-reveal>
          <h2 className="text-balance text-[clamp(1.6rem,3vw,2.1rem)] font-black tracking-[-0.01em] text-ink">
            Solving the vendor compliance problem
          </h2>
          <p className="mt-3 text-lg font-medium text-body">
            Enterprise security reviews are slow, repetitive — and they stall
            deals.
          </p>
        </div>
        <Card
          className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-14"
          data-reveal-group
        >
          {problems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Icon className="size-6 text-brand-deep" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-[15px] font-medium text-body">{text}</p>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
