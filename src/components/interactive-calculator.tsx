"use client";

import React, { useState } from "react";
import {
  Checkmark,
  CheckmarkFilled,
  Cloud,
  Code,
  Development,
  Time,
  UserFollow,
} from "@carbon/icons-react";

const cloudOptions = [
  { id: "aws", label: "AWS", controls: 68 },
  { id: "gcp", label: "Google Cloud", controls: 62 },
  { id: "azure", label: "Azure", controls: 58 },
];

const codeOptions = [
  { id: "github", label: "GitHub", controls: 24 },
  { id: "gitlab", label: "GitLab", controls: 22 },
];

const identityOptions = [
  { id: "okta", label: "Okta", controls: 28 },
  { id: "google", label: "Google Workspace", controls: 24 },
];

const frameworkOptions = [
  { id: "soc2", label: "SOC 2 Type II", baseDays: 18, manualDays: 90 },
  { id: "iso", label: "ISO 27001", baseDays: 21, manualDays: 105 },
  { id: "gdpr", label: "GDPR / Privacy", baseDays: 14, manualDays: 60 },
  { id: "hipaa", label: "HIPAA", baseDays: 16, manualDays: 75 },
];

export function InteractiveCalculator() {
  const [cloud, setCloud] = useState("aws");
  const [code, setCode] = useState("github");
  const [identity, setIdentity] = useState("okta");
  const [framework, setFramework] = useState("soc2");
  const [teamSize, setTeamSize] = useState<number>(25);

  const selectedCloud = cloudOptions.find((c) => c.id === cloud) || cloudOptions[0];
  const selectedCode = codeOptions.find((c) => c.id === code) || codeOptions[0];
  const selectedIdentity =
    identityOptions.find((i) => i.id === identity) || identityOptions[0];
  const selectedFw =
    frameworkOptions.find((f) => f.id === framework) || frameworkOptions[0];

  const totalAutomatedControls =
    selectedCloud.controls + selectedCode.controls + selectedIdentity.controls;
  const engineeringHoursSaved = Math.round(totalAutomatedControls * 1.1 + teamSize * 0.8);
  const tgsTimelineDays = Math.max(14, selectedFw.baseDays);

  return (
    <section id="calculator" className="scroll-mt-24 bg-mist py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
            <Development className="h-3.5 w-3.5" /> Interactive ROI & Timeline Calculator
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black tracking-tight text-ink">
            Estimate your compliance timeline in 30 seconds
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-body">
            Select your stack and target framework to calculate automated controls,
            engineering hours saved, and your buyer report delivery date.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
          {/* Controls & Stack Inputs */}
          <div className="lg:col-span-7 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card space-y-6">
            {/* 1. Target Framework */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wide text-faint mb-2">
                1. Select Target Framework
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {frameworkOptions.map((fw) => (
                  <button
                    key={fw.id}
                    type="button"
                    onClick={() => setFramework(fw.id)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      framework === fw.id
                        ? "border-brand-deep bg-brand-soft/70 ring-2 ring-brand-deep/30"
                        : "border-line bg-white hover:border-body"
                    }`}
                  >
                    <span className="block text-xs font-black text-ink">
                      {fw.label}
                    </span>
                    <span className="mt-1 block text-[10px] font-extrabold text-brand-deep">
                      ~{fw.baseDays} Days
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Cloud Stack */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wide text-faint mb-2">
                2. Infrastructure Provider
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {cloudOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCloud(c.id)}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
                      cloud === c.id
                        ? "border-brand-deep bg-brand-soft/70 ring-2 ring-brand-deep/30"
                        : "border-line bg-white hover:border-body"
                    }`}
                  >
                    <Cloud className="h-4 w-4 text-brand-deep shrink-0" />
                    <span className="text-xs font-bold text-ink">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Code & Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-faint mb-2">
                  Code Repository
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {codeOptions.map((co) => (
                    <button
                      key={co.id}
                      type="button"
                      onClick={() => setCode(co.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-bold transition-all ${
                        code === co.id
                          ? "border-brand-deep bg-brand-soft text-brand-deeper"
                          : "border-line bg-white text-body hover:border-body"
                      }`}
                    >
                      <Code className="h-3.5 w-3.5 text-brand-deep" />
                      {co.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-faint mb-2">
                  Identity Provider
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {identityOptions.map((io) => (
                    <button
                      key={io.id}
                      type="button"
                      onClick={() => setIdentity(io.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-bold transition-all ${
                        identity === io.id
                          ? "border-brand-deep bg-brand-soft text-brand-deeper"
                          : "border-line bg-white text-body hover:border-body"
                      }`}
                    >
                      <UserFollow className="h-3.5 w-3.5 text-brand-deep" />
                      {io.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Team Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold text-faint mb-2">
                <span className="uppercase tracking-wide">Engineering Team Size</span>
                <span className="text-ink font-black text-sm">{teamSize} Engineers</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-brand-deep cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className="lg:col-span-5 rounded-3xl border border-line bg-navy p-6 sm:p-8 text-white shadow-panel relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Development className="h-48 w-48 text-white" />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-extrabold text-brand-soft">
              <CheckmarkFilled className="h-3.5 w-3.5 text-brand" /> Estimated TGS Impact
            </span>

            <div className="mt-6 space-y-6">
              <div>
                <span className="block text-xs font-extrabold uppercase tracking-widest text-white/60">
                  Automated Stack Controls
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-brand-soft">
                    {totalAutomatedControls}
                  </span>
                  <span className="text-sm font-bold text-white/70">
                    / 142 total controls
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                    TGS Timeline
                  </span>
                  <span className="mt-1 block text-2xl sm:text-3xl font-black text-white">
                    ~{tgsTimelineDays} Days
                  </span>
                  <span className="text-[11px] font-bold text-white/50 line-through">
                    {selectedFw.manualDays} Days Manual
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                    Eng Hours Saved
                  </span>
                  <span className="mt-1 block text-2xl sm:text-3xl font-black text-brand-soft">
                    ~{engineeringHoursSaved} hrs
                  </span>
                  <span className="text-[11px] font-bold text-brand">
                    85% time reduction
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm space-y-2 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Checkmark className="h-4 w-4 text-brand" />
                  <span>One report reused for every future buyer</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Checkmark className="h-4 w-4 text-brand" />
                  <span>Continuous 24/7 monitoring included</span>
                </div>
              </div>

              <a
                href="#get-started"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-5 text-sm font-extrabold text-navy-deep transition-all hover:bg-brand-soft hover:shadow-lg"
              >
                <Time className="h-4 w-4" /> Book 15-Min Gap Check for this Stack
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
