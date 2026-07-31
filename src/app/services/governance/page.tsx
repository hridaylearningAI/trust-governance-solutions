import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Document } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "Governance Services & ISMS Frameworks — TGS",
  description:
    "Build a robust Information Security Management System (ISMS), risk management frameworks (NIST, ISO 27001), and executive governance policies with TGS.",
};

const governanceCapabilities = [
  {
    title: "ISMS Buildout & Operations",
    desc: "Complete design, implementation, and ongoing management of an Information Security Management System (ISMS) tailored to your tech stack.",
  },
  {
    title: "Risk Assessment & Mitigation Frameworks",
    desc: "Quantitative and qualitative risk management aligned with NIST SP 800-53, ISO 27005, and CIS Controls.",
  },
  {
    title: "Executive & Board Security Reporting",
    desc: "C-Suite dashboards, key risk indicators (KRIs), and executive security metrics to present to board members and investors.",
  },
  {
    title: "Security Policy & Procedure Architecture",
    desc: "30+ custom, enterprise-approved security policies covering Incident Response, Access Control, Change Management, and Vendor Risk.",
  },
];

export default function GovernanceServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Document className="h-3.5 w-3.5" /> Corporate & Technical Governance
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Governance Services Built for Enterprise Scale
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Establish rigorous security policies, risk management frameworks, and executive governance that satisfy the most demanding enterprise security buyers.
            </p>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">Governance Capabilities</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {governanceCapabilities.map((cap, i) => (
                <div key={i} className="rounded-2xl border border-line bg-mist/30 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckmarkFilled className="h-5 w-5 text-brand-deep" />
                    <h3 className="text-lg font-black text-ink">{cap.title}</h3>
                  </div>
                  <p className="text-xs font-medium text-body leading-relaxed">{cap.desc}</p>
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
