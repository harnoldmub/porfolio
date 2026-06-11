import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  MapPin,
  Sparkles,
} from "lucide-react";

import { CountUp, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Animate";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cvMetrics, experiences, profile, projects, services, trustedCompanies } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export const metadata: Metadata = buildPageMetadata({
  title: "AMY | CV et portfolio personnel",
  description:
    "Découvrez le CV et le portfolio d'Arnold Mubuanga Yate (AMY), ingénieur développement, chef de projet informatique et entrepreneur digital.",
  path: "/",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f1ed] text-slate-950">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: profile.name,
            description: profile.summary,
            areaServed: "France",
            email: profile.email,
            sameAs: [profile.linkedin],
          }),
        }}
      />

      <section className="px-3 pb-3 pt-28 sm:px-5 sm:pt-32">
        <div className="mx-auto max-w-[1420px] rounded-[2.4rem] border border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f6f5f1_100%)] shadow-[0_30px_120px_rgba(15,23,42,0.06)] sm:rounded-[3rem]">
          <div className="px-4 pb-10 pt-12 sm:px-7 sm:pb-14 sm:pt-16">
            <section className="px-3 pb-10 sm:px-6">
              <div className="mx-auto max-w-4xl text-center">
                <Reveal>
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 ring-1 ring-black/5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Portfolio personnel · CV
                  </p>
                </Reveal>
                <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-7xl">
                  <WordReveal text="Arnold Mubuanga Yate" delay={0.15} />
                </h1>
                <Reveal delay={0.3}>
                  <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-500 sm:text-xl">
                    {profile.title}
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
                    {profile.summary}
                  </p>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/parcours"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Voir mon CV
                      <ArrowRight className="icon-nudge h-4 w-4" />
                    </Link>
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande de CV PDF")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-black/8 transition hover:bg-slate-50"
                    >
                      Télécharger le CV
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <Stagger className="mt-12 grid gap-4 xl:grid-cols-12">
                <StaggerItem className="xl:col-span-4">
                <article className="card-lift h-full rounded-[2rem] bg-[#f7f6f2] p-7 ring-1 ring-black/6">
                  <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                    À propos
                  </p>
                  <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950">
                    Un profil entre développement, pilotage et entrepreneuriat digital.
                  </h2>
                  <p className="mt-6 text-base leading-8 text-slate-600">{profile.homeIntro}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-black/6">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-black/6">
                      Entrepreneur digital
                    </span>
                  </div>
                </article>
                </StaggerItem>

                <StaggerItem className="xl:col-span-5">
                <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                  <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Aujourd&apos;hui
                  </p>
                  <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950">
                    {experiences[0].company}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">{experiences[0].role}</p>
                  <p className="mt-6 text-base leading-8 text-slate-600">{experiences[0].summary}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {experiences[0].details.map((detail) => (
                      <div
                        key={detail}
                        className="rounded-[1.4rem] bg-[#f7f6f2] px-5 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </article>
                </StaggerItem>

                <StaggerItem className="xl:col-span-3">
                <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                  <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Repères
                  </p>
                  <div className="mt-6 space-y-4">
                    {cvMetrics.slice(0, 4).map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[1.4rem] bg-[#f7f6f2] px-5 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                      >
                        <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                          <CountUp value={item.value} />
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
                </StaggerItem>
              </Stagger>
            </section>

            <section className="px-3 py-12 text-center sm:px-6">
              <Reveal>
                <p className="inline-flex rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 ring-1 ring-black/5">
                  Expertise
                </p>
                <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-5xl">
                  Une offre claire pour structurer, piloter et livrer.
                </h2>
              </Reveal>
              <Stagger className="mt-12 grid gap-4 xl:grid-cols-4">
                {services.map((service) => (
                  <StaggerItem key={service.title}>
                    <article className="card-lift h-full rounded-[2rem] bg-white p-7 text-left ring-1 ring-black/6">
                      <div className="inline-flex rounded-full bg-[#f3f2ee] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                        {service.title}
                      </div>
                      <p className="mt-6 text-base leading-8 text-slate-600">{service.description}</p>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>

            <section className="px-3 py-12 sm:px-6" id="projets">
              <Reveal>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="inline-flex rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 ring-1 ring-black/5">
                      Projets sélectionnés
                    </p>
                    <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-5xl">
                      Quelques réalisations qui prolongent mon parcours.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
                      Sites vitrines, plateformes et applications conçus pour des usages réels et des
                      environnements exigeants.
                    </p>
                  </div>

                  <Link
                    href="/projets"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-black/8 transition hover:bg-slate-50"
                  >
                    Voir tous les projets
                    <ArrowRight className="icon-nudge h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <div className="mt-10">
                <ProjectsShowcase projects={featuredProjects} compact />
              </div>
            </section>

            <section className="px-3 pb-4 pt-12 sm:px-6">
              <Stagger className="grid gap-4 xl:grid-cols-12">
                <StaggerItem className="xl:col-span-5">
                  <article className="card-lift h-full rounded-[2rem] bg-[#f7f6f2] p-7 ring-1 ring-black/6">
                    <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                      Références
                    </p>
                    <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950">
                      Secteur public, grands groupes et projets à forte visibilité.
                    </h2>
                    <p className="mt-6 text-base leading-8 text-slate-600">
                      Un parcours construit dans des contextes où la structure, la fiabilité et la
                      clarté d&apos;exécution comptent réellement.
                    </p>
                  </article>
                </StaggerItem>

                {trustedCompanies.slice(0, 3).map((item) => (
                  <StaggerItem key={item} className="xl:col-span-7">
                    <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                      <div className="flex items-start gap-4">
                        <BriefcaseBusiness className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                        <p className="text-base leading-8 text-slate-600">{item}</p>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
