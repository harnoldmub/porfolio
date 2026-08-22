"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const loading = (
  <p className="meta animate-pulse text-center">Chargement…</p>
);

// The games are only fetched once one is actually opened.
const Snake = dynamic(() => import("./Snake"), { ssr: false, loading: () => loading });
const Breakout = dynamic(() => import("./Breakout"), { ssr: false, loading: () => loading });

export type GameId = "snake" | "breakout";

/**
 * Full-bleed ink overlay. It locks the page behind it, traps focus, closes on
 * Escape, and restores the scroll position it found — a game must never leave
 * the page it interrupted in a worse state.
 *
 * Rendered through a portal on purpose: any ancestor carrying a transform —
 * an entrance animation is enough, even one that resolves to the identity
 * matrix — becomes the containing block for `position: fixed` and would trap
 * the overlay inside a column instead of the viewport.
 */
export default function GameOverlay({
  game,
  onClose,
}: {
  game: GameId | null;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!game) return;
    const previous = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    panel.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("button, a[href]");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      window.scrollTo(0, scrollY);
      previous?.focus?.();
    };
  }, [game, onClose]);

  if (!game || !mounted) return null;

  return createPortal(
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={game === "snake" ? "AMY Snake" : "AMY Breakout"}
      className="fixed inset-0 z-[130] flex flex-col bg-ink text-paper"
    >
      <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <p className="meta">Easter egg</p>
        <button
          type="button"
          onClick={onClose}
          className="meta inline-flex min-h-11 items-center gap-2 transition-colors hover:text-paper"
        >
          <span aria-hidden>×</span> Close
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto px-gutter pb-10">
        <div className="w-full max-w-3xl">{game === "snake" ? <Snake /> : <Breakout />}</div>
      </div>
    </div>,
    document.body,
  );
}
