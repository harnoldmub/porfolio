"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lenis, deliberately restrained: a short lerp so the page still stops when the
 * visitor stops. No scroll hijacking, no section snapping. Disabled outright
 * for touch input and for anyone who asked for reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let lenis: import("lenis").default | undefined;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.6 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      window.__lenis = lenis;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Route changes must land at the top, whichever scroller is active.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
