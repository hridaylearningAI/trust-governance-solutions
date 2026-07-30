"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckmarkOutline,
  Development,
  Security,
  Time,
} from "@carbon/icons-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { DashboardPreview } from "./dashboard-preview";
import { GapCheckModal } from "./gap-check-modal";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const trustItems = [
  { icon: Time, label: "85% less engineering time on reviews" },
  { icon: Security, label: "Built for software vendors" },
  { icon: CheckmarkOutline, label: "Reports accepted as-is by enterprise buyers" },
];

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="top" className="overflow-hidden">
      <div>
        <div className="relative pt-24 md:pt-36">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-mist)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="hover:bg-white bg-mist group mx-auto flex w-fit items-center gap-4 rounded-full border border-line p-1 pl-4 shadow-md shadow-navy/5 transition-colors duration-300 cursor-pointer"
                >
                  <span className="text-sm font-bold text-ink">
                    Free gap check — 15 minutes, no obligation
                  </span>
                  <span className="block h-4 w-0.5 border-l border-line bg-white"></span>

                  <div className="bg-white group-hover:bg-mist size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </button>
              </AnimatedGroup>

              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-black tracking-[-0.02em] text-ink md:text-6xl lg:mt-16 xl:text-7xl"
              >
                Vendor compliance, handled.
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg font-medium text-body"
              >
                Pass enterprise security reviews before they even start. One continuously-monitored
                compliance report that enterprise buyers accept as-is.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row"
              >
                <div className="bg-navy/10 rounded-[calc(var(--radius-xl)+0.125rem)] border border-line p-0.5">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    size="lg"
                    className="h-11 rounded-xl px-5 text-base font-bold shadow-md cursor-pointer"
                  >
                    <span className="text-nowrap">Book a Free Gap Check</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>

                <Button
                  nativeButton={false}
                  render={<Link href="#calculator" />}
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-5 text-base font-bold text-ink"
                >
                  <Development className="size-4 text-brand-deep" />
                  <span className="text-nowrap">Calculate Your Timeline</span>
                </Button>
              </AnimatedGroup>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.9,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-10 flex flex-wrap items-center justify-center gap-x-9 gap-y-4"
              >
                {trustItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white">
                      <Icon className="h-4.5 w-4.5 text-brand-deep" />
                    </span>
                    <span className="max-w-[18ch] text-left text-[13px] font-bold leading-snug text-body">
                      {label}
                    </span>
                  </div>
                ))}
              </AnimatedGroup>
            </div>
          </div>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="mask-b-from-55% relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20">
              <div className="inset-shadow-2xs ring-white bg-white relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line p-4 shadow-lg shadow-navy/15 ring-1">
                <DashboardPreview />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </div>

      {/* Gap Check Booking Modal */}
      <GapCheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
