"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { NAV } from "./SiteHeader";
import { profile } from "@/data/profile";
import { ArrowUpRight } from "@/components/ui/Icons";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-bleed typographic menu — numbered entries at display scale, contact
 * block pinned to the bottom. Focus is trapped while it is open and the
 * underlying page cannot scroll.
 */
export default function MobileMenu({
  open,
  onClose,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  activeHref: string;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button");
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
      document.documentElement.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-[105] flex flex-col bg-ink md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <span className="meta">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper"
            >
              Fermer
            </button>
          </div>

          <nav className="shell flex flex-1 flex-col justify-center" aria-label="Navigation principale">
            <ul>
              {[{ href: "/", label: "Accueil", index: "00" }, ...NAV].map((item, i) => {
                const active = item.href === "/" ? activeHref === "/" : activeHref.startsWith(item.href);
                return (
                  <motion.li
                    key={item.href}
                    className="border-b border-ink-line"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.22 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="meta w-8 shrink-0">{item.index}</span>
                      <span className="font-display text-title font-semibold text-paper">
                        {item.label}
                      </span>
                      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue" />}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="shell shrink-0 pb-10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <p className="meta">Écrire</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-flex items-center gap-2 font-display text-heading text-paper"
            >
              {profile.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
