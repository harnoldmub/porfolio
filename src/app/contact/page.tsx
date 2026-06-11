import type { Metadata } from "next";
import { ArrowUpRight, CalendarRange, Linkedin, Mail, MapPin, MessageSquare } from "lucide-react";

import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Animate";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact | AMY",
  description:
    "Contactez Arnold Mubuanga Yate (AMY) pour une mission, un échange autour d'un produit digital ou une collaboration technique.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f2f1ed] text-slate-950">
      <SiteHeader />

      <section className="px-3 pb-3 pt-28 sm:px-5 sm:pt-32">
        <div className="mx-auto max-w-[1420px] rounded-[2.4rem] border border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f6f5f1_100%)] shadow-[0_30px_120px_rgba(15,23,42,0.06)] sm:rounded-[3rem]">
          <div className="px-4 pb-12 pt-12 sm:px-7 sm:pb-16 sm:pt-16">
            <section className="px-3 pb-10 text-center sm:px-6">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 ring-1 ring-black/5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Contact
                </p>
              </Reveal>
              <h1 className="mx-auto mt-7 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-7xl">
                <WordReveal text="Une mission," delay={0.15} />
                <br />
                <WordReveal text="parlons-en." delay={0.3} />
              </h1>
              <Reveal delay={0.4}>
                <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-500 sm:text-xl">
                  Je privilégie les échanges clairs et contextualisés. Quelques éléments sur votre
                  projet suffisent pour démarrer une conversation utile.
                </p>
              </Reveal>
            </section>

            <section className="px-3 sm:px-6">
              <Stagger className="grid gap-4 xl:grid-cols-12">
                <StaggerItem className="xl:col-span-4">
                <aside className="grid h-full gap-4">
                  <div className="card-lift rounded-[2rem] bg-[#f7f6f2] p-7 ring-1 ring-black/6">
                    <p className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 ring-1 ring-black/5">
                      Coordonnées
                    </p>
                    <div className="mt-6 space-y-3">
                      {[
                        { icon: MapPin, label: "Localisation", value: profile.location },
                        { icon: Mail, label: "Email", value: profile.email },
                        { icon: CalendarRange, label: "Disponibilité", value: profile.availability },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="rounded-[1.4rem] bg-white px-4 py-4 ring-1 ring-black/5"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4 text-slate-500" />
                              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                {item.label}
                              </p>
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-700">{item.value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="card-lift rounded-[2rem] bg-white p-7 ring-1 ring-black/6">
                    <p className="inline-flex rounded-full bg-[#f3f2ee] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Liens
                    </p>
                    <div className="mt-6 space-y-3">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-[1.25rem] bg-[#f7f6f2] px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5 transition hover:text-slate-950"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande de CV PDF")}`}
                        className="flex items-center justify-between rounded-[1.25rem] bg-[#f7f6f2] px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-black/5 transition hover:text-slate-950"
                      >
                        <span>Demander le CV PDF</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </aside>
                </StaggerItem>

                <StaggerItem className="xl:col-span-8">
                  <ContactForm />
                </StaggerItem>
              </Stagger>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
