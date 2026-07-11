import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/Animate";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TechStack from "@/components/TechStack";
import { projects, services, cvMetrics } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

const spotlightSlugs = [
  "bloc-leopards",
  "mami-samarylin-2026",
  "kecha-2026",
  "daylora",
  "mboka-hub",
  "e-visa",
];
const featuredProjects = spotlightSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));
const weddingProjects = projects.filter((project) => project.category === "Mariage");

export const metadata: Metadata = buildPageMetadata({
  title: "AMY | Software Engineer & Digital Product Builder",
  description: "Le portfolio d'Arnold Mubuanga Yate, entre développement, pilotage et produits digitaux.",
  path: "/",
});

export default function Home() {
  return (
    <main className="site-canvas min-h-screen overflow-hidden text-[#111111]">
      <SiteHeader />

      <section className="border-b border-black/10 bg-[#e8edff]">
        <div className="mx-auto grid min-h-[min(760px,calc(100vh-72px))] max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 lg:px-12 lg:py-10">
          <Reveal>
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow text-[#356dff]">Software Engineer &amp; Digital Product Builder</p>
              <h1 className="mt-6 max-w-xl font-display text-[clamp(3.4rem,8vw,7.4rem)] font-medium leading-[0.88] tracking-[-0.07em]">
                Je transforme les idées en produits qui vivent.
              </h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-black/62 sm:text-lg">
                Je conçois et construis des plateformes web, des expériences digitales et des outils métier utiles, de l&apos;idée à la mise en ligne.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative flex min-h-[360px] items-end justify-center self-stretch lg:min-h-0">
            <div className="absolute bottom-0 right-0 h-[78%] w-[84%] border border-[#356dff]/25 bg-[#d8e1ff] sm:h-[86%] sm:w-[78%]" />
            <Image
              src="/arnold-website.png"
              alt="Arnold Mubuanga, software engineer et product builder"
              width={1080}
              height={1080}
              priority
              className="relative z-10 h-auto max-h-[620px] w-full max-w-[620px] object-contain object-bottom drop-shadow-[0_24px_35px_rgba(53,109,255,0.16)]"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f0f3ef]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.55fr_1fr] lg:px-12">
          <Reveal><p className="eyebrow">À propos</p></Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-6xl">Un profil à la croisée du développement, du pilotage et de l&apos;entrepreneuriat digital.</h2>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-black/10 pt-6 text-sm text-black/58">
                {cvMetrics.slice(0, 3).map((metric) => <div key={metric.label}><strong className="block font-display text-3xl font-medium text-black">{metric.value}</strong><span className="mt-1 block max-w-[11rem] leading-6">{metric.label}</span></div>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12" id="projets">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">Ce que j&apos;ai réalisé</p><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Des projets réels.<br />Des usages concrets.</h2></div>
            <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-semibold text-[#356dff]">Tout voir <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
        <ProjectsShowcase projects={featuredProjects} compact />
      </section>

      <section className="border-y border-black/10 bg-[#f0f3ef]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <Reveal>
            <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Mariages &amp; événements</p><h2 className="mt-5 max-w-3xl font-display text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Des expériences à partager.</h2></div>
              <p className="max-w-sm text-sm leading-7 text-black/58">Des sites privés et publics conçus pour informer, rassembler et donner le ton avant le grand jour.</p>
            </div>
          </Reveal>
          <ProjectsShowcase projects={weddingProjects} compact />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
          <Reveal><p className="eyebrow">Technologies</p></Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-6xl">Les bons outils pour construire sans friction.</h2>
              <TechStack />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#111111] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.55fr_1fr] lg:px-12">
          <Reveal><p className="eyebrow text-white/55">Ce que j&apos;apporte</p></Reveal>
          <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {services.map((service, index) => <StaggerItem key={service.title}><article className="border-t border-white/20 pt-5"><span className="text-sm text-white/40">0{index + 1}</span><h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.03em]">{service.title}</h3><p className="mt-4 max-w-sm text-sm leading-7 text-white/58">{service.description}</p></article></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow">On échange ?</p><h2 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1] tracking-[-0.06em] sm:text-7xl">Une idée à clarifier ?<br /><span className="text-[#356dff]">Parlons-en.</span></h2></div><Link href="/contact" className="magnetic-button inline-flex items-center gap-3 bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#356dff]">Me contacter <ArrowUpRight className="h-4 w-4" /></Link></div>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
