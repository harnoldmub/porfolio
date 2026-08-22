import Image from "next/image";
import Link from "next/link";

import { profile } from "@/data/profile";

const ELSEWHERE = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Instagram", href: profile.instagramUrl },
  { label: "Email", href: `mailto:${profile.email}` },
] as const;

const YEAR = new Date().getFullYear();

/**
 * A signature, not a sitemap. The monogram carries the brand, the three
 * disciplines carry the positioning, and four links carry everything else —
 * the navigation already lives in the header.
 */
export default function SiteFooter() {
  return (
    <footer className="relative border-t border-ink-line bg-ink">
      <div className="shell py-14 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" aria-label="AMY — accueil" className="inline-flex items-end gap-1.5">
              <Image
                src="/assets/brand/amy-monogram.webp"
                alt=""
                width={190}
                height={73}
                loading="lazy"
                className="h-9 w-auto lg:h-11"
              />
              <span aria-hidden className="mb-1 font-mono text-xs text-paper/50">
                ®
              </span>
            </Link>
            <p className="mt-5 font-display text-lg font-medium tracking-[-0.02em] text-paper">
              {profile.name}
            </p>
            <p className="meta mt-4">
              ENGINEERING <span className="text-blue-text">×</span> PRODUCT{" "}
              <span className="text-blue-text">×</span> BUSINESS
            </p>
            <p className="meta mt-2">{profile.territory}</p>
          </div>

          <nav aria-label="Liens externes" className="lg:text-right">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:flex-col lg:gap-y-2">
              {ELSEWHERE.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    data-cursor="OPEN"
                    className="link-underline font-display text-lg font-medium tracking-[-0.02em] text-paper/70 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rule mt-14 flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="meta">© {YEAR} AMY</p>
          <p className="meta">{profile.availability}</p>
        </div>
      </div>
    </footer>
  );
}
