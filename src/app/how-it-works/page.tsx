import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/how-it-works";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Time } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "How TGS Works — 3-Week Vendor Compliance Process",
  description:
    "Scan in Week 1, Fix gaps in Week 2, and receive your buyer-ready compliance report with 24/7 continuous monitoring in Week 3.",
};

const weekSteps = [
  {
    week: "Week 1",
    title: "Automated Stack Scan & Gap Discovery",
    desc: "Connect your cloud, code, identity, and tools in under 5 minutes via read-only APIs. TGS evaluates 140+ controls and generates a prioritized gap blueprint within 48 hours.",
    deliverable: "Gap Blueprint & Control Audit",
    items: [
      "Read-only API integration with AWS/GCP, GitHub, and Okta",
      "Automated evaluation against SOC 2, ISO 27001, and GDPR controls",
      "Identification of missing encryptions, MFA gaps, and policy deficiencies",
    ],
  },
  {
    week: "Week 2",
    title: "Managed Gap Remediation & Ownership",
    desc: "Every gap is assigned to specific engineering owners with step-by-step code snippets, Terraform templates, and policy documents so nothing stalls in backlog.",
    deliverable: "Closed Gaps & Verified Controls",
    items: [
      "Pre-written Terraform & AWS policy remediation templates",
      "Direct task assignment to DevOps, Engineering, and IT leads",
      "TGS compliance engineer verification upon fix deployment",
    ],
  },
  {
    week: "Week 3",
    title: "Buyer-Ready Attestation & 24/7 Monitoring",
    desc: "We issue your single, digitally-attested compliance report. Enterprise buyers accept it as-is without 300-question spreadsheets, while 24/7 monitoring keeps it live.",
    deliverable: "TGS Compliance Report & Live Link",
    items: [
      "Digitally signed compliance report mapped to buyer standards",
      "One-click NDA sharing portal for enterprise procurement",
      "Continuous 24/7 drift monitoring with real-time Slack alerts",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Page Hero */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Time className="h-3.5 w-3.5" /> 3-Week Remediation & Report Process
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              From First Scan to Buyer-Ready Report in 21 Days
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              A predictable, structured 3-week timeline designed so software vendors pass enterprise security reviews without interrupting product development.
            </p>
          </div>
        </section>

        {/* Detailed Week-by-Week Execution Steps */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-5xl px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-ink">The 3-Week Execution Roadmap</h2>
            </div>

            <div className="grid gap-8">
              {weekSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-line bg-mist/30 p-6 md:p-8 grid md:grid-cols-12 gap-6 items-start shadow-sm"
                >
                  <div className="md:col-span-3 space-y-2">
                    <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-black text-brand-deeper">
                      {step.week}
                    </span>
                    <h3 className="text-xl font-black text-ink">{step.title}</h3>
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand-deep block">
                      Deliverable: {step.deliverable}
                    </span>
                  </div>

                  <div className="md:col-span-9 space-y-4">
                    <p className="text-sm font-medium text-body leading-relaxed">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-bold text-ink">
                          <CheckmarkFilled className="h-4 w-4 text-brand-deep shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive How It Works Component */}
        <HowItWorks />

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
