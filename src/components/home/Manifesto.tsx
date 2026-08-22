import RevealLines from "@/components/ui/RevealLines";
import Reveal from "@/components/ui/Reveal";
import { profile, stats } from "@/data/profile";

// The multiplication signs carry the whole idea of the section, so they get
// the accent colour and the words stay off-white.
const [engineering, product, business] = profile.manifestoWords;
const manifestoLines = [
  engineering,
  <>
    <span className="text-blue-text">×</span> {product}
  </>,
  <>
    <span className="text-blue-text">×</span> {business}
  </>,
];

/**
 * The typographic hinge between the hero and the work: three words at display
 * scale, then the sentence that explains why they belong together.
 */
export default function Manifesto() {
  return (
    <section className="relative border-t border-ink-line py-section" aria-labelledby="manifesto-title">
      <div className="shell">
        <h2 id="manifesto-title" className="font-display text-display font-semibold text-paper">
          <RevealLines lines={manifestoLines} stagger={0.1} />
        </h2>

        <div className="grid-12 mt-14 lg:mt-20">
          <Reveal className="col-span-6 col-start-1 lg:col-span-5 lg:col-start-7">
            <p className="text-lead text-paper/80">{profile.manifesto}</p>
            <p className="mt-6 text-paper/55">{profile.manifestoSecondary}</p>
          </Reveal>
        </div>

        <ul className="rule mt-16 grid grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={i * 0.08}
              className="border-b border-ink-line py-7 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:px-8 sm:first:pl-0"
            >
              <p className="font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] text-paper">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-paper/60">{stat.label}</p>
              <p className="meta mt-1">{stat.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
