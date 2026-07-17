"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Page-wide micro-animations, driven by data attributes so sections stay
 * server components:
 *
 * - data-reveal          fade-up of a single element on scroll into view
 * - data-reveal-group    staggered fade-up of an element's direct children
 * - data-reveal-grid     staggered scale/fade of grid children (bento cards)
 * - data-counter         count-up of a number (data-counter-value, optional
 *                        data-counter-suffix, e.g. "%")
 * - data-hover-lift      subtle -3px lift on hover (pointer devices)
 *
 * Everything is gated behind prefers-reduced-motion: no-preference; with
 * reduced motion the page renders fully static.
 */
export function MotionProvider() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 18,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-reveal-grid]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 16,
          scale: 0.97,
          duration: 0.45,
          ease: "back.out(1.2)",
          stagger: { each: 0.06, grid: "auto", from: "start" },
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(
          el.dataset.counterValue ?? el.textContent ?? ""
        );
        if (!Number.isFinite(target)) return;
        const suffix = el.dataset.counterSuffix ?? "";
        const state = { value: target };
        gsap.fromTo(
          state,
          { value: 0 },
          {
            value: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.value)}${suffix}`;
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      const unbind: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>("[data-hover-lift]").forEach((el) => {
        const yTo = gsap.quickTo(el, "y", {
          duration: 0.18,
          ease: "power1.out",
        });
        const enter = () => yTo(-3);
        const leave = () => yTo(0);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        unbind.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });

      return () => unbind.forEach((off) => off());
    });
  });

  return null;
}
