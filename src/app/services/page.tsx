import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServicesSection } from "@/components/services-section";
import { CtaSection } from "@/components/cta-section";
import { Category, CheckmarkFilled } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "TGS Security & Governance Services — Enterprise Offerings",
  description:
    "Explore TGS enterprise services: Governance Services, AI Governance, Audit Support & Defense, Security Operations (vCISO), and Technical Security Assessments.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Page Hero */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Category className="h-3.5 w-3.5" /> Comprehensive Enterprise Services
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Security & Governance Services Built for Growth
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Whether you need AI Governance for the EU AI Act, SOC 2 audit representation, or a virtual CISO to lead your security posture—TGS delivers expert-driven solutions.
            </p>
          </div>
        </section>

        {/* Services Section Component */}
        <ServicesSection />

        {/* Why Enterprise Choose TGS Services */}
        <section className="py-16 bg-mist/30 border-t border-line">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-ink">
                The TGS Managed Service Advantage
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <CheckmarkFilled className="h-6 w-6 text-brand-deep" />
                <h3 className="text-base font-bold text-ink">Zero Product Interruption</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  We write policy frameworks, coordinate auditors, and prepare evidence so your engineering team stays focused on shipping features.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <CheckmarkFilled className="h-6 w-6 text-brand-deep" />
                <h3 className="text-base font-bold text-ink">AI & Emerging Tech Ready</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Specialized AI Governance services ensuring your LLMs, AI agents, and ML pipelines comply with global standards like the EU AI Act and ISO 42001.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <CheckmarkFilled className="h-6 w-6 text-brand-deep" />
                <h3 className="text-base font-bold text-ink">Zero-Surprise Audit Defense</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Direct audit representation by TGS security engineers ensuring 100% clean auditor sign-off on SOC 2, ISO 27001, and HIPAA assessments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
