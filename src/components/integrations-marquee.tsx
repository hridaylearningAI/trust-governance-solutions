"use client";

import React from "react";
import {
  Cloud,
  Code,
  DataBackup,
  Development,
  Notification,
  Plug,
  Security,
  UserFollow,
} from "@carbon/icons-react";

interface Integration {
  name: string;
  category: string;
  icon: React.ElementType;
  status: string;
}

const row1Integrations: Integration[] = [
  { name: "AWS Amazon Web Services", category: "Cloud Infra", icon: Cloud, status: "68 Controls" },
  { name: "Google Cloud Platform", category: "Cloud Infra", icon: Cloud, status: "62 Controls" },
  { name: "Microsoft Azure", category: "Cloud Infra", icon: Cloud, status: "58 Controls" },
  { name: "GitHub Enterprise", category: "Version Control", icon: Code, status: "24 Controls" },
  { name: "GitLab", category: "Version Control", icon: Code, status: "22 Controls" },
  { name: "Okta Identity", category: "Identity & Access", icon: UserFollow, status: "28 Controls" },
];

const row2Integrations: Integration[] = [
  { name: "Google Workspace", category: "Identity & Access", icon: UserFollow, status: "24 Controls" },
  { name: "Slack", category: "Alerts & Tasks", icon: Notification, status: "Real-time" },
  { name: "Jira Software", category: "Remediation", icon: Development, status: "Auto-sync" },
  { name: "PostgreSQL Database", category: "Datastores", icon: DataBackup, status: "Encryption" },
  { name: "Cloudflare Security", category: "WAF & DNS", icon: Security, status: "Edge Defense" },
  { name: "Datadog Observability", category: "Logging", icon: Plug, status: "Log Audit" },
];

function CardItem({ item }: { item: Integration }) {
  const Icon = item.icon;
  return (
    <div className="group w-64 shrink-0 rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-brand-deep transition-colors group-hover:bg-brand-soft">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span className="rounded-full bg-brand-soft/70 px-2 py-0.5 text-[9px] font-extrabold text-brand-deeper">
          {item.status}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-xs font-black text-ink truncate">{item.name}</h3>
        <span className="text-[10px] font-bold text-faint">{item.category}</span>
      </div>
    </div>
  );
}

export function IntegrationsMarquee() {
  // Duplicate arrays to create continuous infinite loops
  const row1Duplicated = [...row1Integrations, ...row1Integrations, ...row1Integrations];
  const row2Duplicated = [...row2Integrations, ...row2Integrations, ...row2Integrations];

  return (
    <section id="integrations" className="scroll-mt-24 bg-mist/50 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
            <Plug className="h-3.5 w-3.5" /> 100+ Automated Integrations
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black tracking-tight text-ink">
            Connect your engineering stack in under 5 minutes
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-body">
            TGS automatically pulls evidence and evaluates controls directly from your cloud
            providers, code repositories, identity tools, and databases.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Rows */}
      <div className="relative mt-12 space-y-4">
        {/* Left/Right Fading Edge Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist/90 to-transparent" />

        {/* Top Marquee Row (Scrolls Left) */}
        <div className="flex overflow-hidden py-1">
          <div className="animate-marquee-left flex gap-4">
            {row1Duplicated.map((item, idx) => (
              <CardItem key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row (Scrolls Right) */}
        <div className="flex overflow-hidden py-1">
          <div className="animate-marquee-right flex gap-4">
            {row2Duplicated.map((item, idx) => (
              <CardItem key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-8 text-center">
        <p className="text-xs font-bold text-body">
          Need a custom integration? TGS supports custom REST API & GraphQL evidence connectors.{" "}
          <a href="#get-started" className="text-brand-deep underline hover:text-brand-deeper">
            Request Connector →
          </a>
        </p>
      </div>
    </section>
  );
}
