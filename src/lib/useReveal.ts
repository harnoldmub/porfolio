"use client";

import { useEffect, useRef } from "react";

/**
 * Flips `data-revealed` on the element (and on any `[data-reveal-child]`
 * descendants) the first time it enters the viewport. The visual change is a
 * CSS transition, so this hook does no per-frame work.
 *
 * Anything already above the fold on load is revealed immediately, which keeps
 * the hero out of the observer's hands entirely.
 */
export function useReveal<T extends HTMLElement>(options?: { immediate?: boolean; amount?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.revealed = "true";
      node.querySelectorAll<HTMLElement>("[data-reveal-child]").forEach((child) => {
        child.dataset.revealed = "true";
      });
    };

    if (options?.immediate) {
      // Next frame, so the transition has a start state to run from.
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold: options?.amount ?? 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.immediate, options?.amount]);

  return ref;
}
