import type { Metadata } from "next";

import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import WorkIndex from "@/components/work/WorkIndex";
import { projects } from "@/data/projects";
import { buildMetadata, JsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projets",
  description:
    "Applications publiques, plateformes SaaS, produits événementiels et expériences web — les projets conçus et développés par Arnold Mubuanga Yate.",
  path: "/work",
});

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projets",
  url: `${siteUrl}/work`,
  hasPart: projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    url: `${siteUrl}/work/${project.slug}`,
    dateCreated: project.year,
    genre: project.category,
  })),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={listJsonLd} />

      <section className="relative pb-16 pt-[calc(var(--header-h)+clamp(4rem,10vw,8rem))]">
        <div className="column-rules" aria-hidden />
        <div className="shell relative">
          <p className="meta meta-blue">
            {String(projects.length).padStart(2, "0")} projets · 2018 — 2026
          </p>
          <h1 className="mt-6 font-display text-mega font-semibold text-paper">
            <RevealLines lines={["PROJETS", "SÉLECTIONNÉS."]} immediate delay={0.1} fit />
          </h1>
          <Reveal delay={0.3}>
            <p className="measure mt-8 text-lead text-paper/70">
              Des applications utilisées par des administrations, des plateformes que j&apos;ai
              lancées moi-même, des expériences web sur mesure. Chaque projet est présenté avec son
              contexte, sa contrainte réelle et ce que j&apos;y ai fait.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell relative pb-section" aria-label="Liste des projets">
        <WorkIndex projects={projects} />
      </section>
    </>
  );
}
