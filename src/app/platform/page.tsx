"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { IntegrationsMarquee } from "@/components/integrations-marquee";
import { DashboardPreview } from "@/components/dashboard-preview";
import { CtaSection } from "@/components/cta-section";
import {
  Cloud,
  Code,
  DataBackup,
  Development,
  Locked,
  Notification,
  Plug,
  Security,
  UserFollow,
} from "@carbon/icons-react";

const allIntegrations = [
  { name: "AWS Amazon Web Services", category: "Cloud Infra", icon: Cloud, controls: "68 Controls", desc: "Automated S3, IAM, EC2, KMS, and CloudTrail monitoring." },
  { name: "Google Cloud Platform", category: "Cloud Infra", icon: Cloud, controls: "62 Controls", desc: "GCP IAM, Cloud Storage, Audit Logs, and VPC firewall checks." },
  { name: "Microsoft Azure", category: "Cloud Infra", icon: AzureIcon, controls: "58 Controls", desc: "Azure AD, Key Vault, Blob Storage, and Network Security Groups." },
  { name: "GitHub Enterprise", category: "Version Control", icon: Code, controls: "24 Controls", desc: "Branch protection, 2-person PR approvals, and secret scanning." },
  { name: "GitLab CI/CD", category: "Version Control", icon: Code, controls: "22 Controls", desc: "Merge request approvals, pipeline security, and protected tags." },
  { name: "Okta Identity", category: "Identity & Access", icon: UserFollow, controls: "28 Controls", desc: "Enforces MFA, deprovisioning SLAs, and password complexity." },
  { name: "Google Workspace", category: "Identity & Access", icon: UserFollow, controls: "24 Controls", desc: "2-step verification, OAuth app permissions, and admin log auditing." },
  { name: "Slack Alerts", category: "Alerts & Tasks", icon: Notification, controls: "Real-time", desc: "Instant notifications when cloud controls drift out of compliance." },
  { name: "Jira Software", category: "Remediation", icon: Development, controls: "Auto-sync", desc: "Auto-creates remediation tickets with assigned engineering owners." },
  { name: "PostgreSQL Database", category: "Datastores", icon: DataBackup, controls: "Encryption", desc: "Verifies AES-256 encryption at rest, SSL in transit, and backups." },
  { name: "Cloudflare WAF", category: "WAF & DNS", icon: Security, controls: "Edge Defense", desc: "DDoS mitigation, TLS 1.3 enforcement, and WAF rulesets." },
  { name: "Datadog Observability", category: "Logging", icon: Plug, controls: "Log Audit", desc: "Audit log retention, SIEM integration, and centralized logging." },
];

function AzureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 19h7.5l2.5-4.5L14.5 19H22L12 2z" />
    </svg>
  );
}

export default function PlatformPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Cloud Infra", "Version Control", "Identity & Access", "Alerts & Tasks", "Datastores"];

  const filteredIntegrations = allIntegrations.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="bg-mist/40 py-12 md:py-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand-deeper">
              <Security className="h-3.5 w-3.5" /> Platform Architecture & Stack Scanning
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto">
              Deep Stack Scanning with Zero Friction
            </h1>
            <p className="mt-4 text-lg font-medium text-body max-w-2xl mx-auto">
              Connect your cloud, code, identity, and tools in under 5 minutes via read-only APIs.
              TGS continuously monitors 140+ security controls without storing customer data.
            </p>
          </div>
        </section>

        {/* Live Workspace Preview */}
        <section className="py-16 bg-white border-b border-line">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-ink">
                Live Command Center Workspace
              </h2>
              <p className="mt-2 text-sm font-medium text-body">
                Click sidebar tabs below to inspect real-time control checks, findings, and attestation status.
              </p>
            </div>
            <div className="rounded-3xl border border-line p-4 bg-mist/50 shadow-panel max-w-5xl mx-auto">
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* Deep Dive Architecture Principles */}
        <section className="py-16 md:py-24 bg-mist/40">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-ink">Engineered for Technical Security Rigor</h2>
              <p className="mt-3 text-base font-medium text-body">
                How TGS evaluates your infrastructure without impacting production performance or security posture.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                  <Locked className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-ink">100% Read-Only Connections</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  TGS connects strictly via scoped read-only IAM roles, OAuth tokens, and API keys. We never request write permissions to your production infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                  <Security className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-ink">Zero Customer PII Retention</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Scans extract only metadata and configuration states (e.g. S3 encryption flags, MFA policies). Customer application data never touches TGS servers.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                  <Notification className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-ink">24/7 Automated Drift Detection</h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  If an engineer temporarily disables S3 bucket encryption or PR reviews, TGS detects the drift in minutes and notifies your assigned owner via Slack or Jira.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Searchable Integration Directory */}
        <section id="integrations" className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
                <Plug className="h-3.5 w-3.5" /> 100+ Pre-Built Connectors
              </span>
              <h2 className="mt-3 text-3xl font-black text-ink">
                Search & Filter Supported Stack Connectors
              </h2>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line pb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? "border-brand-deep bg-brand-soft text-brand-deeper shadow-sm"
                        : "border-line bg-mist text-body hover:bg-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search integrations (e.g. AWS, Okta, Slack)..."
                className="w-full sm:w-64 rounded-xl border border-line bg-mist px-3.5 py-2 text-xs font-medium text-ink focus:border-brand-deep focus:bg-white focus:outline-none"
              />
            </div>

            {/* Integration Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredIntegrations.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-line bg-white p-4 space-y-2 hover:border-brand-deep/50 hover:shadow-card transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-brand-deep">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-extrabold text-brand-deeper">
                        {item.controls}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-ink">{item.name}</h3>
                      <span className="text-[10px] font-bold text-faint block mb-1">{item.category}</span>
                      <p className="text-[11px] font-medium text-body leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <IntegrationsMarquee />

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
