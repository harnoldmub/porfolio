"use client";

import { useState } from "react";

import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import { capabilities } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * A list, not a card grid. Hovering a row dims the others and slides the
 * title — the interaction carries the hierarchy so no boxes are needed.
 */
export default function Capabilities() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative py-section" aria-labelledby="capabilities-title">
      <div className="shell">
        <h2 id="capabilities-title" className="font-display text-display font-semibold text-paper">
          <RevealLines lines={["WHAT I DO."]} />
        </h2>

        <ul className="mt-14 lg:mt-20" onMouseLeave={() => setActive(null)}>
          {capabilities.map((item, i) => (
            <Reveal
              as="li"
              key={item.number}
              delay={i * 0.05}
              className="border-t border-ink-line last:border-b"
            >
              <div
                onMouseEnter={() => setActive(item.number)}
                className={cn(
                  "grid-12 items-baseline py-7 transition-opacity duration-300 ease-expo lg:py-9",
                  active && active !== item.number ? "opacity-35" : "opacity-100",
                )}
              >
                <span className="col-span-1 font-mono text-sm text-blue-text">{item.number}</span>
                <h3
                  className={cn(
                    "col-span-5 font-display text-heading font-semibold text-paper transition-transform duration-500 ease-expo md:col-span-11 lg:col-span-5",
                    active === item.number && "lg:translate-x-3",
                  )}
                >
                  {item.title}
                </h3>
                <p className="col-span-6 mt-3 text-paper/55 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:mt-0">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
