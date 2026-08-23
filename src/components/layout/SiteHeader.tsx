"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/work", label: "Projets", index: "01" },
  { href: "/about", label: "À propos", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
  { href: "/#games", label: "Jeux", index: "04" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Hide on the way down, reveal on the way up — the nav should never sit
  // between the visitor and a full-bleed project image.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/#games") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-transform duration-500 ease-expo",
        hidden && "-translate-y-full",
      )}
    >
        <div className="shell flex h-[var(--header-h)] items-center gap-5 mix-blend-difference">
          <Link
            href="/"
            aria-label="AMY — accueil"
            data-cursor="hover"
            className="block"
          >
            <Image
              src="/assets/brand/amy-monogram.webp"
              alt=""
              width={190}
              height={73}
              priority
              className="h-6 w-auto lg:h-7"
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="ml-auto flex max-w-[calc(100vw-7rem)] items-center gap-4 overflow-x-auto py-2 sm:gap-7 lg:gap-10"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper"
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-paper transition-[width] duration-300 ease-expo",
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
