"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Checkmark,
  CheckmarkFilled,
  Close,
  Email,
  Enterprise,
  Security,
  Time,
} from "@carbon/icons-react";
import { Button } from "@/components/ui/button";

interface GapCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const frameworksList = [
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR / Privacy",
  "HIPAA",
  "Custom Buyer Checklist",
];

const cloudProviders = ["AWS", "Google Cloud", "Azure", "Multi-Cloud"];

export function GapCheckModal({ isOpen, onClose }: GapCheckModalProps) {
  const [selectedFramework, setSelectedFramework] = useState("SOC 2 Type II");
  const [selectedCloud, setSelectedCloud] = useState("AWS");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-navy-deep/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal window */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-white shadow-2xl transition-all">
        {/* header rail */}
        <div className="flex items-center justify-between border-b border-line bg-mist px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft">
              <Security className="h-4.5 w-4.5 text-brand-deep" />
            </span>
            <span className="text-sm font-extrabold text-ink">
              Trust Governance Solutions
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-faint transition-colors hover:bg-line/60 hover:text-ink"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
              <CheckmarkFilled className="h-8 w-8 text-brand-deep" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-ink">
              Gap Check Requested!
            </h3>
            <p className="mt-2 text-base font-medium text-body">
              We&apos;ve reserved your 15-minute gap assessment for{" "}
              <strong className="text-ink">{email}</strong>. Our compliance team
              will send you your personalized scan blueprint shortly.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-mist p-4 text-left text-xs font-bold text-body">
              <div className="flex items-center gap-2 text-brand-deep">
                <Checkmark className="h-4 w-4" /> Selected Framework:{" "}
                <span className="text-ink">{selectedFramework}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-brand-deep">
                <Checkmark className="h-4 w-4" /> Cloud Stack:{" "}
                <span className="text-ink">{selectedCloud}</span>
              </div>
            </div>
            <Button
              onClick={handleReset}
              className="mt-6 w-full h-11 rounded-xl font-bold"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deeper">
                <Time className="h-3.5 w-3.5" /> 15 Minutes · No Obligation
              </span>
              <h2
                id="modal-title"
                className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl"
              >
                Book a Free Compliance Gap Check
              </h2>
              <p className="mt-2 text-sm font-medium text-body">
                See exactly what enterprise buyers will flag in your stack
                before your security review starts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Target Framework */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-faint">
                  Target Compliance Framework
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {frameworksList.map((fw) => (
                    <button
                      key={fw}
                      type="button"
                      onClick={() => setSelectedFramework(fw)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedFramework === fw
                          ? "border-brand-deep bg-brand-soft text-brand-deeper shadow-sm"
                          : "border-line bg-white text-body hover:border-body"
                      }`}
                    >
                      {fw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cloud Provider */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-faint">
                  Primary Infrastructure
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {cloudProviders.map((cp) => (
                    <button
                      key={cp}
                      type="button"
                      onClick={() => setSelectedCloud(cp)}
                      className={`rounded-lg border p-2 text-center text-xs font-bold transition-all ${
                        selectedCloud === cp
                          ? "border-brand-deep bg-brand-soft text-brand-deeper shadow-sm"
                          : "border-line bg-white text-body hover:border-body"
                      }`}
                    >
                      {cp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="gap-check-email"
                  className="block text-xs font-extrabold uppercase tracking-wide text-faint"
                >
                  Work Email
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Email className="h-4 w-4 text-faint" />
                  </div>
                  <input
                    id="gap-check-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-line bg-mist py-3 pl-10 pr-4 text-sm font-medium text-ink placeholder:text-faint focus:border-brand-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-deep/20"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl text-base font-bold shadow-md"
              >
                <span>Get Free Gap Check Blueprint</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center justify-between text-[11px] font-bold text-faint pt-1">
                <span className="flex items-center gap-1">
                  <Checkmark className="h-3.5 w-3.5 text-brand-deep" /> No credit
                  card required
                </span>
                <span className="flex items-center gap-1">
                  <Enterprise className="h-3.5 w-3.5 text-brand-deep" /> Reusable for all buyers
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
