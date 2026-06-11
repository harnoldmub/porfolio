"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, X } from "lucide-react";

import ProjectPosterArtwork from "@/components/ProjectPosterArtwork";
import type { Project } from "@/data/profile";

type ProjectsShowcaseProps = {
  projects: readonly Project[];
  showFilters?: boolean;
  compact?: boolean;
};

export default function ProjectsShowcase({
  projects,
  showFilters = false,
  compact = false,
}: ProjectsShowcaseProps) {
  const [active, setActive] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filteredProjects =
    showFilters && active !== "Tous"
      ? projects.filter((project) => project.category === active)
      : projects;

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      {showFilters ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === category
                  ? "bg-[#c7a56a] text-[#0d1117] shadow-[0_4px_16px_rgba(199,165,106,0.3)]"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-[#c7a56a] hover:text-[#9f7a3f]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className={`grid gap-6 ${
          showFilters ? "mt-8 sm:grid-cols-2 lg:grid-cols-3" : compact ? "mt-14 lg:grid-cols-3" : "mt-8 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filteredProjects.map((project, index) => (
          <motion.button
            key={project.slug}
            type="button"
            onClick={() => setSelectedProject(project)}
            initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: 0.65,
              delay: (index % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="project-card group overflow-hidden rounded-[2rem] bg-[#fffdf9] text-left shadow-lg shadow-slate-950/5 ring-1 ring-[#e7dbc8] transition hover:shadow-2xl"
          >
            <div className={`${compact ? "h-64" : "h-52"} relative overflow-hidden bg-slate-100`}>
              <Image
                src={project.screenshot}
                alt={`${project.name} — vue desktop`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="absolute bottom-3 right-4 w-[62px] overflow-hidden rounded-[10px] border-[3px] border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
                <div className="relative bg-black px-2 py-[3px] text-center">
                  <div className="mx-auto h-[3px] w-8 rounded-full bg-slate-700" />
                </div>
                <Image
                  src={project.screenshotMobile}
                  alt={`${project.name} — vue mobile`}
                  width={240}
                  height={500}
                  className="block h-auto w-full object-cover object-top"
                />
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                {project.category}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl text-slate-950">{project.name}</h3>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-accent" />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#9f7a3f]">
                Ouvrir l&apos;affiche
                <ArrowRight className="icon-nudge h-4 w-4" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
      {selectedProject ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#06070b]/82 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-popup-title"
            className="relative max-h-[92vh] w-full max-w-7xl overflow-auto rounded-[2.4rem] bg-[#f8f1e7] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-slate-700 transition hover:bg-white"
              aria-label="Fermer la popup projet"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
              <ProjectPosterArtwork project={selectedProject} priority />

              <div className="rounded-[2rem] bg-white p-7 shadow-lg shadow-slate-950/5 ring-1 ring-[#eadfce]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f7a3f]">
                  Popup projet
                </p>
                <h3
                  id="project-popup-title"
                  className="mt-4 font-display text-5xl leading-none text-slate-950"
                >
                  {selectedProject.name}
                </h3>
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-500">
                  {selectedProject.category}
                </p>
                <p className="mt-6 text-base leading-8 text-slate-600">
                  {selectedProject.description}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-[#c7a56a] px-5 py-3 text-sm font-semibold text-[#0d1117] transition hover:bg-[#d3b47f]"
                  >
                    Visiter le site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dcc6a4] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#c7a56a]"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </>
  );
}
