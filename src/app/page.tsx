import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/Animate";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { projects, services, cvMetrics } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

export const metadata: Metadata = buildPageMetadata({
  title: "AMY | Software Engineer & Digital Product Builder",
  description: "Le portfolio d'Arnold Mubuanga Yate, entre développement, pilotage et produits digitaux.",
  path: "/",
});

export default function Home() {
  return (
    <main className="site-canvas min-h-screen overflow-hidden text-[#111111]">
      <SiteHeader />

      <section className="relative mx-auto h-[min(48vh,520px)] max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-12" aria-hidden="true">
        <div className="absolute bottom-10 left-5 right-5 border-b border-black/10 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
          <span className="relative -bottom-[2px] block h-[3px] w-16 bg-[#356dff] motion-safe:animate-[line-breathe_4s_ease-in-out_infinite]" />
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
            <div><p className="eyebrow">Sélection de travaux</p><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Des projets réels.<br />Des usages concrets.</h2></div>
            <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-semibold text-[#356dff]">Tout voir <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
        <ProjectsShowcase projects={featuredProjects} compact />
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
