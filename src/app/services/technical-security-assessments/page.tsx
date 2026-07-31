import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Locked } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "Technical Security Assessments & Penetration Testing — TGS",
  description:
    "Web application & API penetration testing, cloud infrastructure security audits, source code analysis, and IAM privilege reviews.",
};

const technicalAssessments = [
  {
    title: "Web Application & API Penetration Testing",
    desc: "Rigorous grey-box and black-box penetration testing evaluating OWASP Top 10 vulnerabilities, API authentication flaws, and logic flaws.",
  },
  {
    title: "Cloud Infrastructure Configuration Audits",
    desc: "In-depth technical review of AWS, GCP, and Azure configurations for public S3 buckets, permissive security groups, and root IAM access.",
  },
  {
    title: "Source Code Security & SAST/DAST Analysis",
    desc: "Static and dynamic application security testing to detect hardcoded secrets, SQL injection risks, and third-party library vulnerabilities.",
  },
  {
    title: "IAM & Least Privilege Access Reviews",
    desc: "Audit employee and service account privileges across Okta, Google Workspace, AWS IAM, and database roles.",
  },
];

export default function TechnicalSecurityAssessmentsPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Locked className="h-3.5 w-3.5" /> Offensive & Defensive Technical Testing
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Technical Security Assessments
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Identify security flaws before attackers or buyer security teams do. Professional penetration testing, cloud audits, and code security reviews.
            </p>
          </div>
        </section>

        {/* Technical Assessments Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">Assessment Offerings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalAssessments.map((item, i) => (
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
