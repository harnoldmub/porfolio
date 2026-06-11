import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { CountUp, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Animate";
import {
  aboutParagraphs,
  cvMetrics,
  education,
  entrepreneurialProjects,
  experiences,
  interests,
  languages,
  profile,
  skillGroups,
  visionParagraphs,
} from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Parcours | CV d'AMY",
  description:
    "Consultez le parcours d'Arnold Mubuanga Yate (AMY), de Dassault Systèmes à la Ville de Lille, entre développement, pilotage et produits digitaux.",
  path: "/parcours",
});

const cvNavItems = [
  { label: "À propos", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Expériences", href: "#experience" },
  { label: "Projets", href: "#ventures" },
  { label: "Contact", href: "#contact" },
];

export default function ParcoursPage() {
  return (
    <main className="min-h-screen bg-[#f2f1ed] px-3 py-3 text-slate-950 sm:px-5 sm:py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            sameAs: [profile.linkedin],
          }),
        }}
      />

      <div className="mx-auto max-w-[1420px] rounded-[2.4rem] border border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f6f5f1_100%)] shadow-[0_30px_120px_rgba(15,23,42,0.06)] sm:rounded-[3rem]">
        <div className="px-4 pb-8 pt-4 sm:px-7 sm:pb-14 sm:pt-6">
          <div className="rounded-[1.8rem] border border-black/6 bg-white/80 px-4 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-[#f3f2ee] px-4 py-2 font-display text-lg font-semibold uppercase tracking-[0.14em] text-slate-950 ring-1 ring-black/5"
              >
                {profile.shortName}
              </Link>

              <nav className="hidden items-center gap-1 rounded-full bg-[#f6f5f1] p-1 ring-1 ring-black/5 lg:flex">
                {cvNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-950"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Me contacter
              </a>
            </div>
          </div>

          <section className="px-3 pb-8 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 ring-1 ring-black/5">
                  <Sparkles className="h-3.5 w-3.5" />
                  CV · profil · parcours
                </p>
              </Reveal>
              <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-7xl">
                <WordReveal text="Arnold Mubuanga Yate" delay={0.15} />
              </h1>
              <Reveal delay={0.3}>
                <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-500 sm:text-xl">
                  {profile.title}
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
                  {profile.summary}
                </p>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande de CV PDF")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Télécharger le CV
                    <Download className="h-4 w-4" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-black/8 transition hover:bg-slate-50"
                  >
                    Discuter d&apos;un projet
                    <ArrowRight className="icon-nudge h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-black/6">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-black/6">
                  Entrepreneur digital
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-black/6">
                  Produits digitaux & solutions métier
                </span>
              </div>
            </Reveal>
          </section>

          <section id="about" className="px-3 py-4 sm:px-6">
            <Stagger className="grid gap-4 xl:grid-cols-12">
              <StaggerItem className="xl:col-span-4 xl:row-span-2">
              <article className="card-lift h-full rounded-[2rem] bg-[#f7f6f2] p-7 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 ring-1 ring-black/5">
                  À propos
                </p>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950">
                  Développement, pilotage et entrepreneuriat digital.
                </h2>
                <div className="mt-7 space-y-5">
                  {aboutParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={`text-base leading-8 ${index === 0 ? "text-slate-950" : "text-slate-600"}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Entrer en contact
                    <ArrowRight className="icon-nudge h-4 w-4" />
                  </a>
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-5">
              <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  Poste actuel
                </p>
                <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950">{experiences[0].company}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">{experiences[0].role}</p>
                <p className="mt-1 text-sm text-slate-400">{experiences[0].period}</p>
                <p className="mt-6 text-base leading-8 text-slate-600">{experiences[0].summary}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {experiences[0].details.map((detail) => (
                    <div
                      key={detail}
                      className="rounded-[1.4rem] bg-[#f7f6f2] px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-black/5"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-3">
              <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  En chiffres
                </p>
                <div className="mt-6 space-y-5">
                  {cvMetrics.slice(0, 3).map((item) => (
                    <div key={item.label} className="rounded-[1.5rem] bg-[#f7f6f2] px-5 py-5 ring-1 ring-black/5">
                      <p className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950">
                        <CountUp value={item.value} />
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-5">
              <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  Référence phare
                </p>
                <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950">{experiences[1].company}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">{experiences[1].role}</p>
                <p className="mt-1 text-sm text-slate-400">{experiences[1].period}</p>
                <p className="mt-6 text-base leading-8 text-slate-600">{experiences[1].summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {experiences[1].stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f7f6f2] px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-3">
              <article className="card-lift h-full rounded-[2rem] bg-[#f7f6f2] p-7 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 ring-1 ring-black/5">
                  Positionnement
                </p>
                <p className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950">
                  Solutions numériques performantes, simples, durables et utiles.
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Applications web, plateformes métiers, systèmes d&apos;information, événements digitaux
                  et outils SaaS conçus pour répondre à des besoins concrets.
                </p>
              </article>
              </StaggerItem>
            </Stagger>
          </section>

          <section id="expertise" className="px-3 py-16 text-center sm:px-6">
            <Reveal>
              <p className="inline-flex rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                Expertise
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-5xl">
                Des compétences structurées pour concevoir, piloter et livrer.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500">
                Une base technique solide, complétée par une vraie capacité d&apos;analyse, de coordination
                et d&apos;accompagnement des usages.
              </p>
            </Reveal>

            <Stagger className="mt-12 grid gap-4 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <StaggerItem key={group.name}>
                <article
                  className="card-lift h-full rounded-[2rem] bg-white p-7 text-left ring-1 ring-black/6"
                >
                  <h3 className="font-display text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950">{group.name}</h3>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#f4f3ef] px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section id="experience" className="px-3 py-8 sm:px-6">
            <Reveal>
              <div className="text-center">
                <p className="inline-flex rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                  Expériences
                </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-5xl">
                Un parcours entre secteur public, R&D produit et interfaces métier.
              </h2>
              </div>
            </Reveal>

            <Stagger className="mt-12 grid gap-4 xl:grid-cols-12">
              {experiences.map((experience, index) => (
                <StaggerItem
                  key={experience.company + experience.period}
                  className={
                    index === 0 ? "xl:col-span-5" : index === 1 ? "xl:col-span-4" : "xl:col-span-3"
                  }
                >
                <article className="card-lift h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                    {experience.period}
                  </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950">
                      {experience.company}
                    </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{experience.role}</p>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{experience.summary}</p>

                  <div className="mt-6 space-y-3">
                    {experience.details.map((detail) => (
                      <div
                        key={detail}
                        className="rounded-[1.25rem] bg-[#f7f6f2] px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-black/5"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </article>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section id="ventures" className="px-3 py-16 text-center sm:px-6">
            <Reveal>
              <p className="inline-flex rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                Projets entrepreneuriaux
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-5xl">
                Des initiatives construites autour du digital, de la culture et des communautés.
              </h2>
            </Reveal>

            <Stagger className="mt-12 grid gap-4 xl:grid-cols-12">
              {entrepreneurialProjects.map((project, index) => (
                <StaggerItem
                  key={project.name}
                  className={
                    index === 0 ? "xl:col-span-4 xl:row-span-2" : "xl:col-span-4"
                  }
                >
                <article className="card-lift h-full rounded-[2rem] bg-white p-7 text-left ring-1 ring-black/6">
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950">{project.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{project.summary}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
                  >
                    {project.url.replace(/^https?:\/\//, "")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#f4f3ef] px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section id="contact" className="px-3 pb-10 pt-8 sm:px-6 sm:pb-14">
            <Stagger className="grid gap-4 xl:grid-cols-12">
              <StaggerItem className="xl:col-span-6">
              <article className="card-lift h-full rounded-[2rem] bg-[#f7f6f2] p-8 ring-1 ring-black/6">
                <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 ring-1 ring-black/5">
                  Ma vision
                </p>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950">
                  Concevoir des solutions simples, durables et évolutives.
                </h2>
                <div className="mt-7 space-y-5">
                  {visionParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-3">
              <article className="card-lift h-full rounded-[2rem] bg-white p-8 ring-1 ring-black/6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Formation & langues
                </p>
                {education.map((entry) => (
                  <div key={entry.school} className="mt-5 rounded-[1.3rem] bg-[#f7f6f2] p-4 ring-1 ring-black/5">
                    <h3 className="text-base font-semibold text-slate-950">{entry.school}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{entry.degree}</p>
                    <p className="mt-3 text-sm text-slate-400">{entry.period}</p>
                  </div>
                ))}
                <div className="mt-5 space-y-3">
                  {languages.map((language) => (
                    <div
                      key={language.name}
                      className="flex items-center justify-between rounded-[1rem] bg-[#f7f6f2] px-4 py-3 ring-1 ring-black/5"
                    >
                      <span className="text-sm font-medium text-slate-700">{language.name}</span>
                      <span className="text-sm text-slate-500">{language.level}</span>
                    </div>
                  ))}
                </div>
              </article>
              </StaggerItem>

              <StaggerItem className="xl:col-span-3">
              <article className="card-lift h-full rounded-[2rem] bg-white p-8 ring-1 ring-black/6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Contact
                </p>
                <div className="mt-5 space-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 rounded-[1.2rem] bg-[#f7f6f2] px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                  >
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </a>
                  <div className="flex items-center gap-3 rounded-[1.2rem] bg-[#f7f6f2] px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[1.2rem] bg-[#f7f6f2] px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                  >
                    <BriefcaseBusiness className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-[#f4f3ef] px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-black/5"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </article>
              </StaggerItem>
            </Stagger>
          </section>
        </div>
      </div>
    </main>
  );
}
