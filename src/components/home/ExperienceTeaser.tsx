import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { ArrowRight } from "@/components/ui/Icons";
import { experiences, stack } from "@/data/profile";

/**
 * Experience as an editorial timeline: a year rail on the left, the role at
 * heading scale on the right, and a single hairline running down the section.
 */
export default function ExperienceTeaser() {
  return (
    <section className="relative py-section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="experience-title" className="font-display text-title font-semibold text-paper">
            2017 — AUJOURD&apos;HUI
          </h2>
          <Reveal>
            <Link
              href="/about#experience"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper"
              data-cursor="hover"
            >
              <span className="link-underline">Parcours complet</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <ol className="mt-14 lg:mt-20">
          {experiences.map((item, i) => (
            <Reveal as="li" key={item.company + item.period} delay={i * 0.06} className="border-t border-ink-line">
              <div className="grid-12 py-8 lg:py-10">
                <p className="col-span-6 font-mono text-sm text-blue-text md:col-span-2">{item.period}</p>
                <div className="col-span-6 mt-3 md:col-span-10 md:mt-0 lg:col-span-6">
                  <h3 className="font-display text-heading font-semibold text-paper">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-paper/60">{item.role}</p>
                </div>
                <p className="col-span-6 mt-4 hidden text-sm leading-6 text-paper/55 md:col-span-12 lg:col-span-4 lg:mt-0 lg:block">
                  {item.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-16 border-y border-ink-line py-6">
        <Marquee
          items={stack}
          duration={64}
          itemClassName="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.03em] text-paper/55"
        />
      </div>
    </section>
  );
}
