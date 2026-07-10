"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Parcours", href: "/parcours" },
  { label: "Projets", href: "/projets" },
  { label: "Carte", href: "/carte" },
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
      ? "text-[#111111]"
      : "text-black/50 hover:text-[#356dff]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12">
      <div className="header-enter mx-auto flex max-w-[1440px] items-center justify-between border-b border-black/10 bg-[#f7f8f5]/85 px-0 pb-4 backdrop-blur sm:pb-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.05em] text-[#111111] sm:text-xl"
          >
            <span className="h-2 w-2 rounded-full bg-[#356dff]" /> AMY
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${linkClass(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition hover:text-[#356dff]"
            >
              Me contacter <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-black/10 text-[#111111] lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1440px] border border-black/10 bg-[#f7f8f5] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-3 text-base font-medium transition ${linkClass(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#111111] px-5 py-3 text-sm font-semibold text-white">
            Me contacter <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
