"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Checkmark,
  CircleDash,
  Document,
  Earth,
  Locked,
  Security,
} from "@carbon/icons-react";

interface FrameworkDetail {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  controlsCount: number;
  timeline: string;
  targetAudience: string;
  summary: string;
  keyControls: string[];
  sampleEvidence: string[];
}

const frameworksData: FrameworkDetail[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    badge: "Most Requested",
    icon: Security,
    controlsCount: 142,
    timeline: "~3 Weeks",
    targetAudience: "US Enterprise & Mid-Market SaaS Buyers",
    summary:
      "Evaluates security, availability, processing integrity, confidentiality, and privacy over a monitoring period. TGS continuous scanning maintains 100% control posture.",
    keyControls: [
      "Access control & MFA enforcement across all developer tools",
      "S3 & Database encryption at rest with automated key rotation",
      "Vulnerability disclosure & SLA patch management",
      "System change management & branch protection rules",
    ],
    sampleEvidence: [
      "AWS KMS Encryption Policy Logs",
      "Okta Active User & MFA Roster",
      "GitHub Branch Protection Screenshots",
      "Penetration Test Executive Summary",
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    badge: "Global Standard",
    icon: Earth,
    controlsCount: 114,
    timeline: "~3 Weeks",
    targetAudience: "Global & European Enterprise Procurement",
    summary:
      "International standard for information security management systems (ISMS). TGS aligns your operational controls to Annex A controls automatically.",
    keyControls: [
      "Information security roles & executive responsibility",
      "Asset management & classification register",
      "Physical and environment access restrictions",
      "Supplier relationship & third-party risk reviews",
    ],
    sampleEvidence: [
      "Information Security Policy Pack",
      "Risk Treatment Matrix & Asset Log",
      "Incident Response Drill Report",
      "Continuous Monitoring Logs",
    ],
  },
  {
    id: "gdpr",
    name: "GDPR / Privacy",
    badge: "EU Mandatory",
    icon: CircleDash,
    controlsCount: 48,
    timeline: "~2 Weeks",
    targetAudience: "Vendors handling EU customer personal data",
    summary:
      "Ensures compliance with European Union data protection standards, Data Processing Addendums (DPAs), and Subject Access Request (SAR) workflows.",
    keyControls: [
      "Data minimization & retention policies",
      "Lawful basis for processing & consent logging",
      "Data protection impact assessments (DPIA)",
      "Cross-border transfer safeguards & SCCs",
    ],
    sampleEvidence: [
      "Data Processing Addendum (DPA) Template",
      "Records of Processing Activities (RoPA)",
      "Subprocessor Directory & Security Audits",
    ],
  },
  {
    id: "hipaa",
    name: "HIPAA Security",
    badge: "Healthcare",
    icon: Security,
    controlsCount: 78,
    timeline: "~2.5 Weeks",
    targetAudience: "Software vendors serving healthcare & healthtech",
    summary:
      "Technical, physical, and administrative safeguards for Protected Health Information (PHI). Includes automated BAA verification.",
    keyControls: [
      "Business Associate Agreement (BAA) tracking",
      "PHI audit logging & access monitoring",
      "Disaster recovery & data backup validation",
      "Role-based access & minimum necessary privileges",
    ],
    sampleEvidence: [
      "Signed BAA Registry",
      "Cloud AuditTrail & Log Retention Logs",
      "Disaster Recovery Test Results",
    ],
  },
];

export function FrameworkExplorer() {
  const [activeId, setActiveId] = useState("soc2");
  const current = frameworksData.find((f) => f.id === activeId) || frameworksData[0];
  const IconComponent = current.icon;

  return (
    <section id="frameworks" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
            <Document className="h-3.5 w-3.5" /> Comprehensive Framework Coverage
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black tracking-tight text-ink">
            One assessment mapped to every enterprise standard
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-body">
            Stop starting from scratch for every new buyer request. TGS maps your single scan
            to all major security and privacy frameworks.
          </p>
        </div>

        {/* Framework Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {frameworksData.map((fw) => {
            const Icon = fw.icon;
            const isActive = activeId === fw.id;
            return (
              <button
                key={fw.id}
                onClick={() => setActiveId(fw.id)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? "border-brand-deep bg-brand-soft text-brand-deeper shadow-sm ring-2 ring-brand-deep/20"
                    : "border-line bg-mist text-body hover:bg-white hover:text-ink"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-brand-deep" : "text-faint"}`} />
                <span>{fw.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive ? "bg-white text-brand-deeper" : "bg-line text-faint"
                  }`}
                >
                  {fw.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Framework Inspector Card */}
        <div className="mt-8 rounded-3xl border border-line bg-mist/60 p-6 md:p-10 shadow-card">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Overview Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-brand-soft">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-ink">{current.name}</h3>
                  <span className="text-xs font-bold text-brand-deep">{current.targetAudience}</span>
                </div>
              </div>

              <p className="text-sm font-medium leading-relaxed text-body">{current.summary}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl border border-line bg-white p-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wide text-faint">
                    Automated Controls
                  </span>
                  <span className="mt-1 block text-2xl font-black text-ink">
                    {current.controlsCount}
                  </span>
                </div>
                <div className="rounded-2xl border border-line bg-white p-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wide text-faint">
                    Avg Report Delivery
                  </span>
                  <span className="mt-1 block text-2xl font-black text-brand-deep">
                    {current.timeline}
                  </span>
                </div>
              </div>

              <a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-soft"
              >
                <span>Check Your {current.name} Readiness</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right Controls & Evidence Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Key Automated Controls */}
              <div className="rounded-2xl border border-line bg-white p-5">
                <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-ink">
                  <Security className="h-4 w-4 text-brand-deep" /> Key Automated Controls Evaluated
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {current.keyControls.map((ctrl, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-body">
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-soft mt-0.5">
                        <Checkmark className="h-3 w-3 text-brand-deep" />
                      </span>
                      <span>{ctrl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Buyer Evidence Pack */}
              <div className="rounded-2xl border border-line bg-white p-5">
                <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-ink">
                  <Locked className="h-4 w-4 text-brand-deep" /> Included Verified Evidence Pack
                </h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.sampleEvidence.map((ev, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl border border-line bg-mist/50 p-2.5 text-xs font-bold text-ink"
                    >
                      <Document className="h-3.5 w-3.5 text-faint shrink-0" />
                      <span className="truncate">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
