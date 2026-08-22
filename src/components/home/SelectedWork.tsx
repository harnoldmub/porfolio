import Link from "next/link";

import ProjectFeature from "@/components/work/ProjectFeature";
import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { featuredProjects, projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="relative py-section" aria-labelledby="work-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-title" className="font-display text-display font-semibold text-paper">
            <RevealLines lines={["SELECTED", "WORK."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="meta">
              {String(featuredProjects.length).padStart(2, "0")} / {projects.length} projets
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell mt-14 lg:mt-20">
        {featuredProjects.map((project, i) => (
          <ProjectFeature key={project.slug} project={project} index={i} priority={i === 0} />
        ))}
      </div>

      <div className="shell">
        <Reveal className="rule flex justify-center pt-12">
          <Link href="/work" className="btn btn-ghost" data-cursor="hover">
            Tous les projets
            <ArrowRight className="arrow h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
