"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { projectImage, type Project } from "@/data/projects";

/**
 * One project, at full weight. The layout alternates side and width so the
 * section never settles into a repeating card rhythm, and the capture drifts
 * against the scroll to give the block depth.
 */
export default function ProjectFeature({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-4.5%", "4.5%"]);

  const flipped = index % 2 === 1;
  const wide = index % 3 === 0;

  return (
    <article ref={ref} className="group relative border-t border-ink-line py-12 lg:py-20">
      <div className="grid-12 items-start">
        {/* ---- metadata rail ---- */}
        <div
          className={cn(
            "col-span-6 flex items-baseline justify-between gap-4 md:col-span-12 lg:col-span-2 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:block",
            flipped && "lg:order-2 lg:col-start-11",
          )}
        >
          <span className="font-mono text-sm text-blue-text">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="text-right lg:mt-6 lg:text-left">
            <p className="meta">{project.category}</p>
            <p className="meta mt-1">{project.year}</p>
          </div>
        </div>

        {/* ---- capture ---- */}
        <Link
          href={`/work/${project.slug}`}
          data-cursor="VOIR"
          aria-label={`Voir l'étude de cas ${project.name}`}
          className={cn(
            "col-span-6 mt-6 block md:col-span-12 lg:mt-0",
            wide ? "lg:col-span-9" : "lg:col-span-7",
            flipped ? "lg:order-1 lg:col-start-2" : "lg:col-start-4",
          )}
        >
          <div className="relative overflow-hidden bg-ink-raised">
            <motion.div
              style={{ y }}
              className="relative aspect-[16/10] scale-[1.1] transition-transform duration-700 ease-expo group-hover:scale-[1.14]"
            >
              <Image
                src={projectImage(project.slug)}
                alt={`Aperçu du site ${project.name}`}
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                sizes="(max-width: 1023px) 100vw, 62vw"
                className="object-cover object-top"
              />
            </motion.div>
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-line" />
          </div>
        </Link>

        {/* ---- caption ---- */}
        <div
          className={cn(
            "col-span-6 mt-6 md:col-span-12 lg:mt-8",
            flipped ? "lg:order-3 lg:col-span-7 lg:col-start-2" : "lg:col-span-7 lg:col-start-4",
          )}
        >
          <h3 className="font-display text-title font-semibold text-paper">
            <Link href={`/work/${project.slug}`} className="link-underline" data-cursor="hover">
              {project.name}
            </Link>
          </h3>
          <p className="measure mt-4 text-lead text-paper/65">{project.tagline}</p>

          <Link
            href={`/work/${project.slug}`}
            className="mt-7 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper"
            data-cursor="hover"
          >
            <span className="link-underline">Voir le projet</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
