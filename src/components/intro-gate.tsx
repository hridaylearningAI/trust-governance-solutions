"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export const INTRO_SEEN_KEY = "tgs-intro-seen";

// The intro decision is made once, before paint, by the inline script in
// layout.tsx (html[data-intro]). Cache it so removing the attribute later
// (when the intro finishes) doesn't change the snapshot mid-lifecycle.
let introDecision: boolean | null = null;
const subscribeNever = () => () => {};
const getIntroDecision = () => {
  if (introDecision === null) {
    introDecision = document.documentElement.hasAttribute("data-intro");
  }
  return introDecision;
};
const getServerIntroDecision = () => false;

/**
 * First-visit intro: plays /intro-animation.mp4 fullscreen, then the intro
 * curtain slides up while the page (hero first) rises from the bottom.
 *
 * - Runs once per session (sessionStorage), skipped for reduced motion —
 *   both decided before paint by the inline script in layout.tsx.
 * - The video can be skipped, and any playback failure (autoplay blocked,
 *   missing file, stalled network) fails open straight to the content.
 * - On reveal the children remount, so the hero's own entrance animations
 *   (text blur-in, dashboard rise) replay in sync with the slide-up.
 */
export function IntroGate({ children }: { children: React.ReactNode }) {
  const wantsIntro = useSyncExternalStore(
    subscribeNever,
    getIntroDecision,
    getServerIntroDecision
  );
  const [finished, setFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playingVideo = wantsIntro && !finished;
  const revealing = wantsIntro && finished;

  const finishIntro = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    setFinished(true);
  }, []);

  useEffect(() => {
    if (!playingVideo) return;

    try {
      // Mark as seen when the intro starts, so a mid-video refresh
      // doesn't force the visitor to sit through it again.
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // sessionStorage unavailable (private mode) — intro still plays once.
    }

    const video = videoRef.current;
    video?.play().catch(finishIntro);

    // Fail open if the video hasn't actually started within 5s.
    const watchdog = setTimeout(() => {
      const v = videoRef.current;
      if (!v || v.paused || v.readyState < 2) finishIntro();
    }, 5000);

    return () => clearTimeout(watchdog);
  }, [playingVideo, finishIntro]);

  return (
    <>
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            key="intro-curtain"
            // The backdrop mirrors the video's own light-gray vignette
            // (#d3 center → #ce corners), and the video's edges are feathered
            // below, so the 720p video renders at native size (sharp, never
            // upscaled) while blending seamlessly into the fullscreen curtain.
            className="fixed inset-0 z-100 flex items-center justify-center bg-[radial-gradient(120%_120%_at_50%_50%,#d3d3d3_0%,#d0d0d0_60%,#cccccc_100%)]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Intro animation"
          >
            <video
              ref={videoRef}
              src="/intro-animation.mp4"
              className="aspect-video max-h-full w-full max-w-7xl object-contain mask-x-from-88% mask-y-from-82%"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finishIntro}
              onError={finishIntro}
            />
            <button
              type="button"
              onClick={finishIntro}
              className="absolute bottom-6 right-6 rounded-full border border-ink/15 bg-white/50 px-4 py-2 text-[13px] font-bold text-ink/70 backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
            >
              Skip intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {revealing ? (
        <motion.div
          key="page-revealed"
          initial={{ y: "14vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {children}
        </motion.div>
      ) : (
        // Server-rendered markup: hidden pre-paint by html[data-intro] CSS
        // only when the intro is going to run, otherwise fully visible.
        <div data-intro-content>{children}</div>
      )}
    </>
  );
}
