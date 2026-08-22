"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { projectImage, type Project } from "@/data/projects";

/**
 * Desktop capture and phone capture composed together rather than stacked:
 * the phone overlaps the desktop frame and drifts against the scroll, so the
 * gallery reads as one object instead of two screenshots.
 */
export default function CaseGallery({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["9%", "-9%"]);

  return (
    <section ref={ref} className="shell relative py-section" aria-label={`Captures de ${project.name}`}>
      <p className="meta">Captures</p>

      <div className="grid-12 mt-8 items-center">
        <div className="col-span-6 md:col-span-12 lg:col-span-9">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-raised">
            <Image
              src={projectImage(project.slug)}
              alt={`${project.name} — vue desktop`}
              fill
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, 72vw"
              className="object-cover object-top"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-line" />
          </div>
        </div>

        <motion.div
          style={{ y: phoneY }}
          className="col-span-4 col-start-2 -mt-16 md:col-span-4 md:col-start-8 lg:col-span-3 lg:col-start-9 lg:mt-0"
        >
          <div className="relative aspect-[390/799] w-full overflow-hidden bg-ink-raised shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src={projectImage(project.slug, "mobile")}
              alt={`${project.name} — vue mobile`}
              fill
              loading="lazy"
              sizes="(max-width: 1023px) 40vw, 24vw"
              className="object-cover object-top"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
