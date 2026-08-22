"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shown once per session only. Counts 00 → 100 in a fixed ~1.1s, then lifts.
 * It never waits on the network: a slow asset must not hold the page hostage.
 */
export default function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("amy:seen") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("amy:seen", "1");
      return;
    }
    setDone(false);
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1100;
    // requestAnimationFrame is suspended in a background tab. A timer is not,
    // so it guarantees the overlay lifts even if the page opened unfocused.
    const failsafe = window.setTimeout(() => {
      sessionStorage.setItem("amy:seen", "1");
      setCount(100);
      setDone(true);
    }, DURATION + 1200);

    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out so the counter decelerates into 100 rather than snapping
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("amy:seen", "1");
        setTimeout(() => setDone(true), 180);
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-ink px-gutter py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden
        >
          <span className="font-display text-[13vw] font-semibold leading-none tracking-[-0.05em] text-paper sm:text-[8vw]">
            AMY
          </span>
          <div className="flex items-end justify-between">
            <span className="meta">Chargement</span>
            <span className="font-mono text-[13vw] leading-none text-paper sm:text-[7vw]">
              {String(count).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
