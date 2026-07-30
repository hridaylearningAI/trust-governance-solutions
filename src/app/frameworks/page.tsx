"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FrameworkExplorer } from "@/components/framework-explorer";
import { CtaSection } from "@/components/cta-section";
import {
  Checkmark,
  CheckmarkFilled,
  Document,
  Locked,
} from "@carbon/icons-react";

const frameworkMatrix = [
  {
    framework: "SOC 2 Type II",
    scope: "Security, Availability & Confidentiality",
    controls: "142 Controls",
    auditorType: "AICPA CPA Audit Firm",
    evidenceTypes: "Cloud logs, IAM rosters, PR reviews",
    buyerDemand: "92% of US Enterprise SaaS Deals",
  },
  {
    framework: "ISO 27001:2022",
    scope: "Information Security Management System (ISMS)",
    controls: "114 Controls",
    auditorType: "ISO Accredited Auditor",
    evidenceTypes: "Risk register, ISMS policies, asset log",
    buyerDemand: "88% of EU & Global Enterprise Deals",
  },
  {
    framework: "GDPR / EU Privacy",
    scope: "EU Personal Data & DPA Compliance",
    controls: "48 Controls",
    auditorType: "TGS Digital Attestation & DPO Review",
    evidenceTypes: "RoPA register, DPA templates, SAR logs",
    buyerDemand: "Mandatory for EU Customer Data",
  },
  {
    framework: "HIPAA Security",
    scope: "Protected Health Information (PHI) Safeguards",
    controls: "78 Controls",
    auditorType: "TGS HIPAA Attestation & BAA Track",
    evidenceTypes: "BAA registry, PHI log retention, DR drill",
    buyerDemand: "Mandatory for Healthcare & Healthtech",
  },
];

export default function FrameworksPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Page Hero */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Document className="h-3.5 w-3.5" /> Single Assessment · Universal Framework Mapping
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Map Once. Comply with Every Buyer Standard.
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Stop starting from scratch for every new enterprise buyer. TGS maps your single stack scan
              to SOC 2, ISO 27001, GDPR, HIPAA, and custom security questionnaires.
            </p>
          </div>
        </section>

        {/* Framework Explorer Tool */}
        <FrameworkExplorer />

        {/* In-Depth Framework Comparison Matrix */}
        <section className="py-16 md:py-24 bg-white border-t border-line">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">
                Enterprise Framework Alignment Matrix
              </h2>
              <p className="mt-3 text-base font-medium text-body">
                Side-by-side comparison of controls, auditor requirements, and buyer demand across supported frameworks.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
              <table className="w-full text-left text-xs font-medium text-ink">
                <thead className="bg-mist border-b border-line text-[11px] font-extrabold uppercase tracking-wide text-faint">
                  <tr>
                    <th className="p-4">Framework</th>
                    <th className="p-4">Primary Scope</th>
                    <th className="p-4">Controls Evaluated</th>
                    <th className="p-4">Auditor / Attestation</th>
                    <th className="p-4">Enterprise Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {frameworkMatrix.map((row) => (
                    <tr key={row.framework} className="hover:bg-mist/30 transition-colors">
                      <td className="p-4 font-black text-sm text-ink">{row.framework}</td>
                      <td className="p-4 font-semibold text-body">{row.scope}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-black text-brand-deeper">
                          {row.controls}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-body">{row.auditorType}</td>
                      <td className="p-4 font-bold text-brand-deep">{row.buyerDemand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verified Evidence Pack Inspector */}
        <section className="py-16 bg-mist/40 border-t border-line">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
                <Locked className="h-3.5 w-3.5" /> Buyer-Ready Evidence Package
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-black text-ink">
                What Enterprise Buyers Receive
              </h2>
              <p className="mt-2 text-sm font-medium text-body">
                Instead of a 300-row spreadsheet, buyers get an authenticated digital package with timestamped evidence logs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <CheckmarkFilled className="h-5 w-5 text-brand-deep" /> Automated Evidence Collection
                </h3>
                <ul className="space-y-2.5 text-xs font-semibold text-body">
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> AWS KMS & S3 AES-256 Encryption Audit Logs
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Okta Active User MFA Enforcement Roster
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> GitHub 2-Reviewer Branch Protection Screenshots
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Automated Penetration Test Executive Summary
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <CheckmarkFilled className="h-5 w-5 text-brand-deep" /> Policy & Governance Documents
                </h3>
                <ul className="space-y-2.5 text-xs font-semibold text-body">
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Information Security Policy (ISMS Pack)
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Incident Response & Disaster Recovery Drill Report
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Vendor Risk Management & Subprocessor Register
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkmark className="h-4 w-4 text-brand-deep" /> Data Processing Addendum (DPA) Template
                  </li>
                </ul>
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
