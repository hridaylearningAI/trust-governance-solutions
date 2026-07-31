"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Category,
  Checkmark,
  Development,
  Document,
  Idea,
  Locked,
  Security,
} from "@carbon/icons-react";

interface ServiceCardData {
  id: string;
  href: string;
  title: string;
  tagline: string;
  badge?: string;
  badgeHighlight?: boolean;
  icon: React.ElementType;
  keyDeliverables: string[];
}

const servicesData: ServiceCardData[] = [
  {
    id: "governance",
    href: "/services/governance",
    title: "Governance Services",
    tagline: "Structure, policies, and risk management frameworks built for enterprise rigor.",
    icon: Document,
    keyDeliverables: [
      "Information Security Management System (ISMS) buildout",
      "Risk Assessment Frameworks (NIST SP 800-53 & ISO 27001)",
      "Board & C-Suite Risk Reporting & Security Policy Architecture",
    ],
  },
  {
    id: "ai-governance",
    href: "/services/ai-governance",
    title: "AI Governance",
    tagline: "Comprehensive compliance for AI models, LLM safety, data privacy, and global regulations.",
    badge: "High-Growth Market Focus",
    badgeHighlight: true,
    icon: Idea,
    keyDeliverables: [
      "EU AI Act Readiness & Risk Classification",
      "ISO/IEC 42001 (AI Management System) Certification",
      "NIST AI RMF Alignment & LLM Data Privacy Audits",
    ],
  },
  {
    id: "audit-support",
    href: "/services/audit-support",
    title: "Audit Support & Defense",
    tagline: "End-to-end audit representation with a Zero-Surprise Audit Guarantee.",
    icon: Security,
    keyDeliverables: [
      "SOC 2 Type I/II & ISO 27001 External Audit Representation",
      "Auditor Liaison & Evidence Readiness Verification",
      "300-Row Buyer Questionnaire Defense & White-Glove Support",
    ],
  },
  {
    id: "security-operations",
    href: "/services/security-operations",
    title: "Security Operations & vCISO",
    tagline: "Continuous SecOps monitoring, threat response, and executive security leadership.",
    icon: Development,
    keyDeliverables: [
      "Virtual CISO (vCISO) Executive Advisory & Strategy",
      "24/7 Security Operations & Cloud Posture Management (CSPM)",
      "Incident Response Playbooks & Vulnerability Patch SLAs",
    ],
  },
  {
    id: "technical-assessments",
    href: "/services/technical-security-assessments",
    title: "Technical Security Assessments",
    tagline: "In-depth penetration testing, cloud architecture audits, and code analysis.",
    icon: Locked,
    keyDeliverables: [
      "AWS / GCP / Azure Infrastructure Security Audits",
      "Web Application & API Penetration Testing",
      "Source Code SAST / DAST Audits & IAM Privilege Reviews",
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
            <Category className="h-3.5 w-3.5" /> End-to-End Enterprise Services
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black tracking-tight text-ink">
            Complete Security & Governance Solutions
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-body">
            From automated AI governance to vCISO leadership and audit defense—TGS provides the expertise software vendors need to win enterprise trust.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="group rounded-3xl border border-line bg-mist/30 p-6 flex flex-col justify-between hover:border-brand-deep/50 hover:bg-white hover:shadow-card transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-brand-soft group-hover:bg-brand-deep group-hover:text-white transition-colors">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    {svc.badge && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                          svc.badgeHighlight
                            ? "bg-brand text-navy-deep font-black shadow-sm animate-pulse"
                            : "bg-brand-soft text-brand-deeper"
                        }`}
                      >
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-ink group-hover:text-brand-deep transition-colors">
                      {svc.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-body leading-relaxed">
                      {svc.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-line space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-faint block">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {svc.keyDeliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-ink">
                          <Checkmark className="h-3.5 w-3.5 text-brand-deep shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-line mt-6">
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-deep hover:text-brand-deeper transition-colors"
                  >
                    <span>Explore {svc.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Service Hub Teaser Card */}
          <div className="rounded-3xl border border-brand-deep/30 bg-navy p-6 text-white flex flex-col justify-between shadow-panel relative overflow-hidden">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-extrabold text-brand-soft">
                <Security className="h-3.5 w-3.5 text-brand" /> Tailored Services
              </span>
              <h3 className="text-2xl font-black text-white">Need Custom Security Advisory?</h3>
              <p className="text-xs font-medium text-white/80 leading-relaxed">
                Combine AI Governance, vCISO advisory, and SOC 2 audit defense into a single managed partnership.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/services"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 px-4 text-xs font-extrabold text-navy-deep transition-colors hover:bg-brand-soft"
              >
                <span>View Full Services Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
