import Link from "next/link";

import { profile } from "@/data/profile";
import { ArrowUpRight } from "@/components/ui/Icons";

const SOCIALS = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Instagram", href: profile.instagramUrl },
] as const;

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-ink-line bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid-12">
          <div className="col-span-6 lg:col-span-5">
            <p className="meta">Écrire</p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="OPEN"
              className="link-underline mt-3 inline-block font-display text-heading font-medium text-paper"
            >
              {profile.email}
            </a>
            <p className="meta mt-8">Appeler</p>
            <a
              href={`tel:${profile.phone}`}
              className="link-underline mt-2 inline-block text-paper/80"
            >
              {profile.phoneDisplay}
            </a>
          </div>

          <nav className="col-span-3 lg:col-span-2" aria-label="Pages">
            <p className="meta">Pages</p>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/", label: "Index" },
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-3 lg:col-span-2" aria-label="Réseaux">
            <p className="meta">Ailleurs</p>
            <ul className="mt-3 space-y-2">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="OPEN"
                    className="link-underline inline-flex items-center gap-1.5 text-paper/80 hover:text-paper"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 lg:col-span-3 lg:text-right">
            <p className="meta">Basé entre</p>
            <p className="mt-3 font-display text-lg font-medium leading-tight text-paper">
              {profile.territory}
            </p>
            <p className="meta mt-6 meta-blue">{profile.availability}</p>
          </div>
        </div>

        <div className="rule mt-14 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © {YEAR} {profile.name}
          </p>
          <p className="meta">Conçu et développé par AMY</p>
        </div>
      </div>
    </footer>
  );
}
