import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { CheckmarkFilled, Development } from "@carbon/icons-react";

export const metadata: Metadata = {
  title: "Security Operations & vCISO Services — TGS",
  description:
    "Fractional Virtual CISO (vCISO) advisory, 24/7 SecOps monitoring, incident response playbooks, and vulnerability patch management.",
};

const secopsServices = [
  {
    title: "Virtual CISO (vCISO) Advisory",
    desc: "Executive security leadership to represent your company in buyer sales calls, lead security strategy, and guide compliance investments.",
  },
  {
    title: "24/7 Cloud Security Posture Management (CSPM)",
    desc: "Real-time threat monitoring and misconfiguration detection across AWS, GCP, Azure, and Kubernetes.",
  },
  {
    title: "Incident Response Playbooks & Drills",
    desc: "Custom incident response plans, tabletop exercises, and 24/7 emergency escalation playbooks required by enterprise buyers.",
  },
  {
    title: "Vulnerability Management & Patch SLAs",
    desc: "Continuous dependency scanning (SAST/SCA), container vulnerability tracking, and SLA remediation monitoring.",
  },
];

export default function SecurityOperationsPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Development className="h-3.5 w-3.5" /> Virtual CISO & SecOps Leadership
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Security Operations & Fractional vCISO
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Get dedicated executive security leadership and 24/7 cloud threat monitoring at a fraction of the cost of a full-time CISO team.
            </p>
          </div>
        </section>

        {/* SecOps Services Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">SecOps & Advisory Offerings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {secopsServices.map((item, i) => (
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
