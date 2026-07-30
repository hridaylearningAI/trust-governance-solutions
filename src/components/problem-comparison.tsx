"use client";

import React from "react";
import {
  CheckmarkFilled,
  CloseFilled,
  Idea,
  Security,
} from "@carbon/icons-react";

export function ProblemComparison() {
  return (
    <section id="why-tgs" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
            <Idea className="h-3.5 w-3.5" /> The Vendor Compliance Dilemma
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black tracking-tight text-ink">
            Stop letting security reviews stall your enterprise deals
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-body">
            Every new enterprise buyer hands you another 300-question spreadsheet.
            Here is how traditional compliance compares to the TGS reusable approach.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Old Way Card */}
          <div className="rounded-3xl border border-red-200 bg-red-50/30 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-red-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <CloseFilled className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-ink">The Old Way</h3>
                  <span className="text-xs font-bold text-red-600">
                    Manual, repetitive & expensive
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-extrabold text-red-700">
                3–6 Months Stalled
              </span>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CloseFilled className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Endless 300-row Security Spreadsheets
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Engineers spend hundreds of hours answering the exact same security questions for every single deal.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CloseFilled className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Dev Roadmap Interrupted
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Senior engineering leads pulled off product features to manually gather screenshots and AWS console logs.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CloseFilled className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Single-Buyer Disposal
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Custom audit responses built for Buyer A are rejected by Buyer B, forcing you to repeat the cycle again.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CloseFilled className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Stale Point-in-Time Audits
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Audits go out of date immediately after issuance, creating continuous compliance drift risk.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* TGS Way Card */}
          <div className="rounded-3xl border border-brand-deep/30 bg-brand-soft/30 p-6 sm:p-8 space-y-6 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="rounded-full bg-brand-deep px-3 py-1 text-[11px] font-extrabold text-white">
                ~3 Weeks Ready
              </span>
            </div>

            <div className="flex items-center gap-2.5 border-b border-brand-deep/15 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-deep text-white">
                <CheckmarkFilled className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ink">The TGS Solution</h3>
                <span className="text-xs font-bold text-brand-deep">
                  Automated, reusable & enterprise-accepted
                </span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckmarkFilled className="h-4.5 w-4.5 text-brand-deep shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    One Reusable Attestation Report
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Single continuously-monitored compliance report mapped to SOC 2, ISO 27001, and GDPR that buyers accept as-is.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckmarkFilled className="h-4.5 w-4.5 text-brand-deep shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    85% Less Engineering Burden
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Automated stack scans evaluate 140+ controls in minutes, leaving your engineering team focused on product.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckmarkFilled className="h-4.5 w-4.5 text-brand-deep shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Managed Gap Remediation
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Gaps arrive prioritized with assigned owners and step-by-step fix guides so nothing gets stuck in backlog.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckmarkFilled className="h-4.5 w-4.5 text-brand-deep shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-extrabold text-ink">
                    Always-On 24/7 Monitoring
                  </strong>
                  <span className="text-xs font-medium text-body">
                    Real-time monitoring keeps your report live, valid, and instant for every future buyer deal.
                  </span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#get-started"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-deep py-3 px-4 text-xs font-extrabold text-white transition-colors hover:bg-brand-deeper"
              >
                <Security className="h-4 w-4" /> Pass Reviews Before They Start — Book Free Check
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
