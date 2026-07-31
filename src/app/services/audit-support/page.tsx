import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Security } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "Audit Support & Audit Defense Services — TGS",
  description:
    "End-to-end audit representation and defense for SOC 2 Type I/II, ISO 27001, and HIPAA with a Zero-Surprise Audit Guarantee.",
};

const auditSupportServices = [
  {
    title: "SOC 2 Type I & II Audit Defense",
    desc: "Complete audit management—we interface with CPA audit firms, present evidence, and resolve auditor inquiries on your behalf.",
  },
  {
    title: "ISO 27001 External Audit Representation",
    desc: "Stage 1 and Stage 2 certification audit representation by certified ISO lead auditors.",
  },
  {
    title: "Zero-Surprise Audit Guarantee",
    desc: "Pre-audit evidence verification and dry-run walkthroughs so your final audit report is 100% clean without exceptions.",
  },
  {
    title: "Enterprise Questionnaire Defense",
    desc: "White-glove response handling for 300-row custom buyer security spreadsheets and procurement reviews.",
  },
];

export default function AuditSupportPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Security className="h-3.5 w-3.5" /> Managed Audit Defense
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Audit Support & External Audit Representation
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Stop dreading audit season. TGS security engineers handle auditor interviews, collect evidence packages, and defend your controls.
            </p>
          </div>
        </section>

        {/* Audit Support Offerings */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">Audit Support Offerings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {auditSupportServices.map((item, i) => (
                <div key={i} className="rounded-2xl border border-line bg-mist/30 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckmarkFilled className="h-5 w-5 text-brand-deep" />
                    <h3 className="text-lg font-black text-ink">{item.title}</h3>
                  </div>
                  <p className="text-xs font-medium text-body leading-relaxed">{item.desc}</p>
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
