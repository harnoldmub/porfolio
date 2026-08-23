"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { useReveal } from "@/lib/useReveal";
import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { aboutParagraphs, approach } from "@/data/profile";

/**
 * Contrast break: the only light section of the homepage. The portrait is
 * revealed by a clip-path rather than a fade, and drifts slightly against the
 * scroll so it sits in the composition instead of on top of it.
 */
export default function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  const portrait = useReveal<HTMLDivElement>({ amount: 0.25 });

  return (
    <section
      ref={ref}
      className="on-paper relative bg-paper py-section text-ink"
      aria-labelledby="about-teaser-title"
    >
      <div className="column-rules" aria-hidden />
      <div className="shell relative">
        <div className="grid-12 items-start">
          <div className="col-span-6 md:col-span-5 lg:col-span-4 lg:-mt-24">
            <motion.div style={{ y }} className="relative">
              <div
                ref={portrait}
                className="reveal-clip relative aspect-[3/4] w-full overflow-hidden bg-ink lg:aspect-[3/4.4]"
              >
                <Image
                  src="/assets/portraits/arnold-portrait.webp"
                  alt="Portrait d'Arnold Mubuanga Yate"
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 80vw, 30vw"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          </div>

          <div className="col-span-6 mt-10 md:col-span-7 md:mt-0 lg:col-span-7 lg:col-start-6">
            <p className="meta">À propos</p>
            <h2
              id="about-teaser-title"
              className="mt-6 font-display text-title font-semibold text-ink"
            >
              <RevealLines lines={["JE CONSTRUIS", "CE QUI SERT."]} />
            </h2>
            <Reveal delay={0.12}>
              <p className="measure mt-8 text-lead text-ink/75">{aboutParagraphs[0]}</p>
              <p className="measure mt-5 text-ink/60">{aboutParagraphs[2]}</p>
            </Reveal>

            <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {approach.map((item, i) => (
                <Reveal as="li" key={item.step} delay={0.1 + i * 0.07}>
                  <p className="meta text-blue-text">{item.step}</p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{item.body}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-primary mt-12" data-cursor="hover">
                Mon parcours
                <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
