import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InteractiveCalculator } from "@/components/interactive-calculator";
import { CtaSection } from "@/components/cta-section";
import { Checkmark, CloseFilled, Development, Growth } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "Compliance Timeline & Engineering Savings Calculator — TGS",
  description:
    "Estimate your vendor compliance timeline, automated controls ratio, and engineering hours saved in 30 seconds.",
};

const comparisonTable = [
  {
    metric: "Audit Preparation Time",
    diyTools: "3 to 6 Months",
    tgsManaged: "~3 Weeks (21 Days)",
    winner: "TGS 5x Faster",
  },
  {
    metric: "Engineering Time Spent",
    diyTools: "150–300 Hours / Deal",
    tgsManaged: "Under 15 Hours Total",
    winner: "85% Less Eng Time",
  },
  {
    metric: "Buyer Spreadsheet Effort",
    diyTools: "Answer 300 Questions Every Time",
    tgsManaged: "Zero (One Reusable Report)",
    winner: "Single Reusable Report",
  },
  {
    metric: "Continuous Monitoring",
    diyTools: "Manual Screenshot Verification",
    tgsManaged: "24/7 Automated Drift Scanning",
    winner: "Automated 24/7",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Development className="h-3.5 w-3.5" /> Interactive ROI & Savings Calculator
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Calculate Your Compliance Report Delivery Date
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              See how much engineering time your team saves by switching from manual security reviews
              to TGS automated remediation and continuous attestations.
            </p>
          </div>
        </section>

        {/* Interactive Calculator */}
        <InteractiveCalculator />

        {/* Financial & Engineering Impact Comparison */}
        <section className="py-16 md:py-24 bg-white border-t border-line">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
                <Growth className="h-3.5 w-3.5" /> DIY Software vs TGS Managed Remediation
              </span>
              <h2 className="mt-3 text-3xl font-black text-ink">
                Why Software-Only Compliance Tools Fall Short
              </h2>
              <p className="mt-3 text-base font-medium text-body">
                DIY platforms sell software subscriptions, but leave your engineers to write code fixes, collect screenshots, and answer buyer spreadsheets.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
              <table className="w-full text-left text-xs font-medium text-ink">
                <thead className="bg-mist border-b border-line text-[11px] font-extrabold uppercase tracking-wide text-faint">
                  <tr>
                    <th className="p-4">Comparison Metric</th>
                    <th className="p-4">DIY Software-Only Tools</th>
                    <th className="p-4">TGS Managed Solution</th>
                    <th className="p-4">TGS Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {comparisonTable.map((row) => (
                    <tr key={row.metric} className="hover:bg-mist/30 transition-colors">
                      <td className="p-4 font-black text-sm text-ink">{row.metric}</td>
                      <td className="p-4 font-semibold text-red-600 flex items-center gap-1.5">
                        <CloseFilled className="h-4 w-4 shrink-0" />
                        {row.diyTools}
                      </td>
                      <td className="p-4 font-semibold text-brand-deep flex items-center gap-1.5">
                        <Checkmark className="h-4 w-4 shrink-0" />
                        {row.tgsManaged}
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-black text-brand-deeper">
                          {row.winner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Impact Summary Badges */}
        <section className="py-16 bg-mist/40 border-t border-line">
          <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-6 text-center">
            <div className="rounded-2xl border border-line p-6 bg-white shadow-sm space-y-2">
              <span className="text-4xl font-black text-brand-deep">85%</span>
              <h3 className="text-sm font-bold text-ink">Less Engineering Time</h3>
              <p className="text-xs text-body font-medium">Engineers spend hours instead of months on compliance reviews.</p>
            </div>

            <div className="rounded-2xl border border-line p-6 bg-white shadow-sm space-y-2">
              <span className="text-4xl font-black text-ink">~3 Weeks</span>
              <h3 className="text-sm font-bold text-ink">Average Report Delivery</h3>
              <p className="text-xs text-body font-medium">From initial stack scan to buyer-ready attestation report.</p>
            </div>

            <div className="rounded-2xl border border-line p-6 bg-white shadow-sm space-y-2">
              <span className="text-4xl font-black text-brand-deep">100%</span>
              <h3 className="text-sm font-bold text-ink">Buyer Acceptance Rate</h3>
              <p className="text-xs text-body font-medium">Single report accepted as-is by enterprise procurement teams.</p>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
