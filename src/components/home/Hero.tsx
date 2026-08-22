"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowRight, ArrowDown } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

const ChromeRing = dynamic(() => import("./ChromeRing"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[var(--header-h)]">
      <div className="column-rules" aria-hidden />

      {/* The ring is allowed to bleed past the right edge, so the type and the
          object share one frame instead of stacking into two blocks. */}
      <div className="ring-mask pointer-events-none absolute inset-y-0 right-[-30%] z-0 w-[125%] opacity-40 sm:right-[-18%] sm:w-[95%] sm:opacity-55 lg:right-[-13%] lg:top-[11%] lg:h-[72%] lg:w-[46%] lg:opacity-90">
        <ChromeRing />
      </div>

      {/* Below lg the ring passes under the running text, and it is now moving.
          A veil anchored to the text column keeps the copy readable without
          flattening the object where it actually reads. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(100deg,#050505 0%,rgba(5,5,5,0.9) 42%,rgba(5,5,5,0.62) 66%,rgba(5,5,5,0.3) 86%,rgba(5,5,5,0.15) 100%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg,#050505 0%,rgba(5,5,5,0.85) 50%,rgba(5,5,5,0.42) 70%,rgba(5,5,5,0.1) 88%,transparent 97%)",
        }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-10">
        <Reveal as="p" immediate className="meta meta-blue" delay={0.15}>
          {profile.eyebrow}
        </Reveal>

        <h1 className="mt-6 font-display text-mega font-semibold text-paper lg:mt-8">
          <RevealLines lines={profile.heroLines} immediate delay={0.25} stagger={0.08} fit />
        </h1>

        <Reveal as="p" className="measure mt-8 text-lead text-paper/85 lg:mt-10 lg:max-w-[46ch] lg:text-paper/70" delay={0.62} immediate>
          {profile.heroSubtitle}
        </Reveal>

        <Reveal immediate className="mt-10 flex flex-wrap items-center gap-4 lg:mt-12" delay={0.72}>
          <Magnetic>
            <Link href="/work" className="btn btn-primary" data-cursor="hover">
              Explore my work
              <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn btn-ghost" data-cursor="hover">
              Let&apos;s talk
            </Link>
          </Magnetic>
        </Reveal>
      </div>

      <Reveal
        immediate
        className="shell relative z-10 flex items-end justify-between gap-6 border-t border-ink-line py-5"
        delay={0.85}
      >
        <p className="meta shrink-0">
          <span className="text-paper">{profile.shortName}</span>
          <span aria-hidden className="text-paper/40">®</span>
          <span className="hidden sm:inline"> · {profile.name}</span>
        </p>
        <span className="meta hidden shrink-0 items-center gap-2 sm:inline-flex">
          Scroll
          <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </Reveal>
    </section>
  );
}
