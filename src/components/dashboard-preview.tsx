"use client";

import React, { useState } from "react";
import {
  Activity,
  Checkmark,
  CheckmarkFilled,
  ChevronDown,
  Cloud,
  Code,
  Dashboard,
  DocumentView,
  FolderDetails,
  Growth,
  Layers,
  Locked,
  Notification,
  Report,
  Security,
} from "@carbon/icons-react";

const sideNav = [
  { id: "overview", icon: Dashboard, label: "Overview" },
  { id: "frameworks", icon: Layers, label: "Frameworks" },
  { id: "findings", icon: DocumentView, label: "Findings" },
  { id: "evidence", icon: FolderDetails, label: "Evidence" },
  { id: "reports", icon: Report, label: "Reports" },
  { id: "monitoring", icon: Activity, label: "Monitoring" },
];

const frameworkScores = [
  { label: "SOC 2 Type II", score: "100%", status: "Passing" },
  { label: "ISO 27001", score: "98%", status: "Passing" },
  { label: "GDPR / Privacy", score: "100%", status: "Passing" },
  { label: "HIPAA Security", score: "98%", status: "Passing" },
];

const stats = [
  { label: "Controls Checked", value: "142", note: "12 this month", up: true },
  { label: "Gaps Fixed", value: "6", note: "4 this month", up: true },
  { label: "Open Criticals", value: "0", note: "Zero criticals", up: false },
  { label: "Last Scan", value: "2m ago", note: "Continuous", up: true },
];

const liveFindings = [
  {
    title: "Enforce SSO for all production AWS IAM roles",
    owner: "Alex Rivera (DevOps)",
    status: "Fixed & Verified",
    severity: "High",
    icon: Cloud,
  },
  {
    title: "Enable S3 bucket default AES-256 encryption",
    owner: "Jordan Kim (Backend)",
    status: "Fixed & Verified",
    severity: "Medium",
    icon: Locked,
  },
  {
    title: "Require 2 reviewer approvals on main branch",
    owner: "Maya Patel (Engineering)",
    status: "Fixed & Verified",
    severity: "Low",
    icon: Code,
  },
];

function Donut() {
  return (
    <div
      className="relative h-40 w-40 shrink-0"
      role="img"
      aria-label="99% review-ready"
    >
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <defs>
          <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0fa183" />
            <stop offset="100%" stopColor="#0b8069" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#e7eef4"
          strokeWidth="15"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#donut-grad)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="439.8"
          strokeDashoffset="4.4"
          transform="rotate(-90 80 80)"
          className="animate-donut"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-ink">99%</span>
        <span className="text-[11px] font-bold text-faint">Review-Ready</span>
      </div>
    </div>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 220 56"
      className="h-14 w-full max-w-[220px]"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0fa183" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0fa183" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 44 L20 38 L40 42 L60 30 L80 35 L100 24 L120 30 L140 18 L160 25 L180 12 L200 18 L220 8 V56 H0 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 44 L20 38 L40 42 L60 30 L80 35 L100 24 L120 30 L140 18 L160 25 L180 12 L200 18 L220 8"
        fill="none"
        stroke="#0fa183"
        strokeWidth="2"
        strokeLinejoin="round"
        className="animate-spark"
      />
    </svg>
  );
}

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div
      className="grid overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-[160px_1fr]"
      aria-label="Preview of the TGS compliance dashboard"
    >
      {/* sidebar */}
      <div className="hidden border-r border-line bg-mist/70 px-3 py-5 sm:block">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-brand-soft">
            <Security className="h-4 w-4" />
          </div>
          <span className="text-sm font-black tracking-tight text-ink">
            TGS Ops
          </span>
        </div>

        <ul className="mt-5 space-y-1">
          {sideNav.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-bold transition-colors ${
                    isActive
                      ? "bg-white text-brand-deep shadow-sm ring-1 ring-line"
                      : "text-faint hover:bg-white/60 hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* main panel */}
      <div className="p-5">
        {/* Top App Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-extrabold text-ink">
              Compliance Command Center
            </span>
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-extrabold text-brand-deeper">
              Live Monitor
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-lg border border-line bg-mist px-2.5 py-1 text-[12px] font-bold text-body">
              Acme Tools (Vendor Stack)
              <ChevronDown className="h-3.5 w-3.5 text-faint" />
            </span>
            <Notification className="h-4 w-4 text-faint cursor-pointer hover:text-ink" />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="mt-5 space-y-5">
            <div className="flex flex-col items-center gap-6 min-[420px]:flex-row">
              <Donut />
              <ul className="w-full space-y-2.5">
                {frameworkScores.map(({ label, score }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-[13px] font-bold text-ink"
                  >
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-soft">
                      <Checkmark className="h-3 w-3 text-brand-deep" />
                    </span>
                    {label}
                    <span className="ml-auto font-extrabold text-brand-deep">
                      {score}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {stats.map(({ label, value, note, up }) => (
                <div
                  key={label}
                  className="rounded-xl border border-line bg-mist/30 px-3 py-2.5"
                >
                  <span className="block text-[10px] font-extrabold tracking-wide text-faint uppercase">
                    {label}
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap text-lg font-black text-ink">
                    {value}
                  </span>
                  <span
                    className={`mt-0.5 flex items-center gap-1 text-[10px] font-bold ${
                      up ? "text-brand-deep" : "text-faint"
                    }`}
                  >
                    {up && <Growth className="h-3 w-3" />}
                    {note}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-mist/40 px-4 py-3">
              <div className="min-w-0">
                <span className="flex items-center gap-2 text-[12px] font-extrabold text-ink">
                  Continuous Scan Status
                  <span className="flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-extrabold text-brand-deep">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    24/7 Active
                  </span>
                </span>
                <span className="mt-1 block text-[11px] font-semibold leading-snug text-faint">
                  142 controls continuously verified across AWS, GitHub & Okta
                </span>
              </div>
              <div className="hidden w-2/5 shrink-0 min-[420px]:block">
                <Sparkline />
              </div>
            </div>
          </div>
        )}

        {activeTab === "frameworks" && (
          <div className="mt-5 space-y-4">
            <h4 className="text-xs font-black uppercase text-faint">Active Framework Attestations</h4>
            <div className="grid gap-3">
              {frameworkScores.map((fw) => (
                <div
                  key={fw.label}
                  className="flex items-center justify-between rounded-xl border border-line bg-mist/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckmarkFilled className="h-4 w-4 text-brand-deep" />
                    <span className="text-sm font-extrabold text-ink">{fw.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-black text-brand-deep">
                      {fw.score} Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "findings" || activeTab === "evidence") && (
          <div className="mt-5 space-y-3">
            <h4 className="text-xs font-black uppercase text-faint">Auto-Remediated Gaps & Evidence</h4>
            {liveFindings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-line bg-white p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-soft text-brand-deep">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="block font-bold text-ink">{item.title}</span>
                      <span className="text-[10px] font-medium text-faint">Assigned to: {item.owner}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-extrabold text-brand-deeper">
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {(activeTab === "reports" || activeTab === "monitoring") && (
          <div className="mt-5 rounded-xl border border-brand-deep/20 bg-brand-soft/40 p-4 text-center">
            <CheckmarkFilled className="mx-auto h-8 w-8 text-brand-deep" />
            <h4 className="mt-2 text-sm font-black text-ink">Buyer-Ready Attestation Report Active</h4>
            <p className="mt-1 text-xs font-medium text-body">
              Report TGS-2026-0142 is digitally signed and continuously verified for enterprise buyers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
