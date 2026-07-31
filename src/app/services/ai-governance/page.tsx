import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Idea } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "AI Governance & EU AI Act Compliance — TGS",
  description:
    "Comprehensive AI Governance services: EU AI Act readiness, ISO/IEC 42001 AI management, NIST AI RMF, LLM data privacy, and shadow AI detection.",
};

const aiCapabilities = [
  {
    title: "EU AI Act Readiness & Risk Classification",
    desc: "Classify your AI systems under EU AI Act risk tiers (Unacceptable, High, Limited, Minimal) and implement mandatory transparency & human oversight controls.",
  },
  {
    title: "ISO/IEC 42001 (AI Management System) Certification",
    desc: "End-to-end guidance for ISO 42001 certification—the international standard for responsible AI development and deployment.",
  },
  {
    title: "NIST AI Risk Management Framework (AI RMF)",
    desc: "Align AI products with NIST AI RMF core functions: GOVERN, MAP, MEASURE, and MANAGE for trustworthy AI.",
  },
  {
    title: "LLM Data Privacy & Model Safety Audits",
    desc: "Audit training data pipelines, RAG stores, prompt injection vulnerabilities, hallucination risk, and PII leakage safeguards.",
  },
  {
    title: "Shadow AI & SaaS Model Detection",
    desc: "Identify unauthorized AI tool usage across employees and integrate policy enforcement webhooks for OpenAI, Anthropic, and custom APIs.",
  },
  {
    title: "Responsible AI Policy & Ethics Governance",
    desc: "Draft enterprise-grade AI usage policies, algorithmic bias mitigation protocols, and IP protection guidelines.",
  },
];

export default function AIGovernancePage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-xs font-black text-navy-deep shadow-sm">
              <Idea className="h-3.5 w-3.5" /> High-Growth Market Offering
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              AI Governance & Compliance Solutions
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Deploy artificial intelligence, LLMs, and AI agents with confidence. TGS provides full compliance with the EU AI Act, ISO/IEC 42001, and NIST AI RMF.
            </p>
          </div>
        </section>

        {/* AI Governance Capabilities Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">
                AI Governance Services
              </h2>
              <p className="mt-2 text-base font-medium text-body">
                Essential frameworks to satisfy enterprise procurement requirements for AI SaaS vendors.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((cap, i) => (
                <div key={i} className="rounded-2xl border border-line bg-mist/30 p-6 space-y-3 hover:border-brand-deep/50 hover:bg-white transition-all">
                  <div className="flex items-center gap-2">
                    <CheckmarkFilled className="h-5 w-5 text-brand-deep" />
                    <h3 className="text-base font-black text-ink">{cap.title}</h3>
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
