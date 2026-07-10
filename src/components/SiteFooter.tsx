import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { profile } from "@/data/profile";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Parcours", href: "/parcours" },
  { label: "Projets", href: "/projets" },
  { label: "Carte", href: "/carte" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-[#f3f2ee] px-4 py-2 font-display text-lg font-semibold uppercase tracking-[0.14em] text-slate-950 ring-1 ring-black/5"
            >
              {profile.shortName}
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">{profile.headline}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">{profile.summary}</p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Navigation
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 transition hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Contact
            </h3>
            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-slate-950"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-slate-950"><Phone className="h-4 w-4" /> {profile.phone}</a>
              <p className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </p>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-slate-500 transition hover:text-slate-950"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a href={`https://www.instagram.com/${profile.instagram}/`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-slate-500 transition hover:text-slate-950"><Instagram className="h-4 w-4" /> @{profile.instagram} <ArrowUpRight className="h-3 w-3" /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/6 pt-5">
          <div className="flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Arnold Mubuanga Yate · Tous droits réservés</p>
            <p>{profile.title}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
