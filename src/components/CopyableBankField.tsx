"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyableBankFieldProps = {
  label: string;
  value: string;
};

export default function CopyableBankField({ label, value }: CopyableBankFieldProps) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="border-b border-black/10 py-5 last:border-b-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/48">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="min-w-0 break-words font-mono text-[clamp(1rem,4.6vw,1.35rem)] font-medium tracking-[0.02em] text-[#111111]">
          {value}
        </p>
        <button
          type="button"
          onClick={copyValue}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white text-[#356dff] transition hover:border-[#356dff] hover:bg-[#eef2ff]"
          aria-label={`Copier ${label.toLowerCase()}`}
          title={`Copier ${label.toLowerCase()}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
