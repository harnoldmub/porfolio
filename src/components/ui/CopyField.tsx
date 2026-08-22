"use client";

import { useState } from "react";

/**
 * Bank details are read on a phone and typed into a banking app — so the whole
 * row is the copy target, and the confirmation is announced to screen readers.
 */
export default function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center justify-between gap-4 border-t border-ink-line py-5 text-left last:border-b"
    >
      <span>
        <span className="meta block">{label}</span>
        <span className="mt-2 block break-all font-mono text-sm text-paper">{value}</span>
      </span>
      <span className="meta shrink-0 transition-colors duration-300 group-hover:text-paper">
        {copied ? "Copié" : "Copier"}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copié` : ""}
      </span>
    </button>
  );
}
