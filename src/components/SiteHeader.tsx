"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { profile } from "@/data/profile";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Parcours", href: "/parcours" },
  { label: "Projets", href: "/projets" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    pathname === href
      ? "bg-white text-slate-950 shadow-[0_6px_16px_rgba(15,23,42,0.06)]"
      : "text-slate-500 hover:bg-white hover:text-slate-950";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-5 sm:pt-5">
      <div className="header-enter mx-auto max-w-[1420px] rounded-[1.8rem] border border-black/6 bg-white/82 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[#f3f2ee] px-4 py-2 font-display text-base font-semibold tracking-[-0.03em] text-slate-950 ring-1 ring-black/5 sm:text-lg"
          >
            AMY
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-[#f6f5f1] p-1 ring-1 ring-black/5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${linkClass(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande de CV PDF")}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              CV PDF
              <Download className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f2ee] text-slate-950 ring-1 ring-black/5 lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1420px] rounded-[1.8rem] border border-black/6 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[1rem] px-4 py-3 text-base font-medium transition ${linkClass(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande de CV PDF")}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            CV PDF
            <Download className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
