import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { ArrowRight, Checkmark, CloseFilled, Security } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "TGS Pricing & Plans — Reusable Vendor Compliance",
  description:
    "Transparent pricing plans for software vendors selling to enterprise buyers. Includes automated stack scanning, managed remediation, and buyer-ready reports.",
};

const plans = [
  {
    name: "Startup Vendor",
    tagline: "For seed & Series A vendors closing their first enterprise deals.",
    price: "Custom / Fixed",
    badge: "Most Popular for Seed–Series A",
    highlight: true,
    features: [
      "SOC 2 Type II or ISO 27001 readiness report",
      "Up to 3 cloud & code integrations (AWS/GCP, GitHub, Okta)",
      "Prioritized gap remediation list with assigned owners",
      "Single buyer-ready digital compliance report",
      "12 months continuous 24/7 drift monitoring",
      "15-minute free initial gap check",
    ],
  },
  {
    name: "Scaleup Vendor",
    tagline: "For growing vendors targeting multi-framework enterprise procurement.",
    price: "Custom / Tiered",
    badge: "Multi-Framework",
    highlight: false,
    features: [
      "SOC 2 Type II + ISO 27001 + GDPR multi-framework alignment",
      "Unlimited cloud, code, identity & database integrations",
      "Dedicated TGS compliance engineer & remediation support",
      "Custom buyer security questionnaire mapping",
      "24/7 continuous drift monitoring & Slack alerts",
      "Automated annual report renewal & evidence refreshes",
    ],
  },
  {
    name: "Enterprise Managed",
    tagline: "For established vendors needing fully-managed security review handling.",
    price: "Enterprise",
    badge: "Fully Managed",
    highlight: false,
    features: [
      "All frameworks (SOC 2, ISO 27001, GDPR, HIPAA, FedRAMP, NIST)",
      "Full vendor risk management & custom API connectors",
      "Executive advisory & auditor coordination",
      "White-glove 300-row questionnaire responses",
      "Dedicated Slack channel & 1-hour emergency SLA",
      "Custom NDA & Trust Center hosting",
    ],
  },
];

const featureComparison = [
  { feature: "Automated Stack Scanning", startup: true, scaleup: true, enterprise: true },
  { feature: "SOC 2 Type II Alignment", startup: true, scaleup: true, enterprise: true },
  { feature: "ISO 27001 & GDPR Alignment", startup: false, scaleup: true, enterprise: true },
  { feature: "HIPAA & FedRAMP Support", startup: false, scaleup: false, enterprise: true },
  { feature: "Continuous 24/7 Drift Monitoring", startup: true, scaleup: true, enterprise: true },
  { feature: "Dedicated TGS Compliance Engineer", startup: false, scaleup: true, enterprise: true },
  { feature: "Custom Buyer Questionnaire Autofill", startup: false, scaleup: true, enterprise: true },
  { feature: "1-Hour Emergency Audit SLA", startup: false, scaleup: false, enterprise: true },
];

const faqs = [
  {
    q: "How does TGS differ from DIY compliance tools like Vanta or Drata?",
    a: "Software-only platforms sell software subscriptions where your engineering team still has to manage 100s of controls and handle audits yourself. TGS provides managed gap remediation and issues a single, continuously-monitored buyer-ready attestation report that buyers accept as-is.",
  },
  {
    q: "How fast can we get our buyer-ready report?",
    a: "Our standard remediation and attestation process takes approximately 3 weeks from initial stack scan to final report issuance.",
  },
  {
    q: "Will enterprise buyers accept the TGS report instead of custom questionnaires?",
    a: "Yes! The TGS report is digitally attested, backed by real verified product evidence, and mapped to SOC 2, ISO 27001, and GDPR standards. Enterprise buyers accept it as-is, eliminating follow-up 300-question spreadsheets.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Page Hero */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Security className="h-3.5 w-3.5" /> Predictable Compliance Investment
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              One Assessment. Reused by Every Buyer.
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Pass your enterprise compliance reviews before they start. All plans include automated scanning, gap remediation, and continuous monitoring.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl border p-8 space-y-6 flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? "border-brand-deep bg-white shadow-xl ring-2 ring-brand-deep/30 relative"
                    : "border-line bg-mist/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-extrabold text-brand-deeper">
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-ink">{plan.name}</h3>
                  <p className="mt-2 text-xs font-medium text-body leading-relaxed">{plan.tagline}</p>

                  <div className="mt-6 border-t border-line pt-6">
                    <span className="text-3xl font-black text-ink">{plan.price}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-bold text-ink">
                        <Checkmark className="h-4 w-4 text-brand-deep shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-line">
                  <a
                    href="#get-started"
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold transition-all ${
                      plan.highlight
                        ? "bg-brand-deep text-white hover:bg-brand-deeper"
                        : "bg-navy text-white hover:bg-navy-soft"
                    }`}
                  >
                    <span>Book Free Gap Check</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 md:py-24 bg-mist/40 border-t border-line">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-black text-ink">Plan Feature Comparison</h2>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
              <table className="w-full text-left text-xs font-medium text-ink">
                <thead className="bg-mist border-b border-line text-[11px] font-extrabold uppercase tracking-wide text-faint">
                  <tr>
                    <th className="p-4">Feature</th>
                    <th className="p-4 text-center">Startup</th>
                    <th className="p-4 text-center">Scaleup</th>
                    <th className="p-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {featureComparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-mist/30 transition-colors">
                      <td className="p-4 font-bold text-ink">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.startup ? <Checkmark className="h-4 w-4 text-brand-deep mx-auto" /> : <CloseFilled className="h-4 w-4 text-faint/40 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.scaleup ? <Checkmark className="h-4 w-4 text-brand-deep mx-auto" /> : <CloseFilled className="h-4 w-4 text-faint/40 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.enterprise ? <Checkmark className="h-4 w-4 text-brand-deep mx-auto" /> : <CloseFilled className="h-4 w-4 text-faint/40 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-line">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-ink">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-line bg-mist/30 p-6 space-y-2">
                  <h3 className="text-base font-bold text-ink">{faq.q}</h3>
                  <p className="text-sm font-medium text-body leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
