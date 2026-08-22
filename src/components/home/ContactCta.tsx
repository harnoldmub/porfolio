import Link from "next/link";

import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { contactLines, profile } from "@/data/profile";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "arnold-mubuanga-yate", href: profile.linkedin },
  { label: "Instagram", value: `@${profile.instagram}`, href: profile.instagramUrl },
] as const;

/**
 * The hard contrast flip that ends every page: ink → paper, and the largest
 * type on the site.
 */
export default function ContactCta() {
  return (
    <section className="on-paper relative bg-paper py-section text-ink" aria-labelledby="contact-cta-title">
      <div className="column-rules" aria-hidden />
      <div className="shell relative">
        <h2 id="contact-cta-title" className="font-display text-mega font-semibold text-ink">
          <RevealLines lines={contactLines} fit />
        </h2>

        <div className="grid-12 mt-14 items-end lg:mt-20">
          <Reveal className="col-span-6 lg:col-span-5">
            <p className="measure text-lead text-ink/70">
              Dites-moi ce que vous cherchez à construire, dans quel contexte et pour quand.
              Je réponds avec un premier avis honnête — y compris quand ce n&apos;est pas moi qu&apos;il
              vous faut.
            </p>
            <Magnetic>
              <Link href="/contact" className="btn btn-primary mt-8" data-cursor="hover">
                Démarrer la conversation
                <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </Magnetic>
          </Reveal>

          <ul className="col-span-6 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {LINKS.map((link, i) => (
              <Reveal as="li" key={link.label} delay={i * 0.07} className="border-t border-paper-line last:border-b">
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  data-cursor="OPEN"
                  className="flex items-center justify-between gap-6 py-5 text-ink transition-colors duration-300 hover:text-blue-text"
                >
                  <span className="meta">{link.label}</span>
                  <span className="flex items-center gap-3 font-display text-lg font-medium tracking-[-0.02em]">
                    {link.value}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
