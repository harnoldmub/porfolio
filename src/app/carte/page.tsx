import type { Metadata } from "next";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import { ArrowUpRight } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Carte de visite",
  description: "Carte de visite numérique d'Arnold Mubuanga Yate.",
  path: "/carte",
  noIndex: true,
});

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Téléphone", value: profile.phoneDisplay, href: `tel:${profile.phone}` },
  { label: "LinkedIn", value: "arnold-mubuanga-yate", href: profile.linkedin },
  { label: "Instagram", value: `@${profile.instagram}`, href: profile.instagramUrl },
  { label: "Site", value: "mubuanga.com", href: siteUrl },
] as const;

export default function CartePage() {
  return (
    <section className="flex min-h-[100svh] flex-col pt-[var(--header-h)]">
      <div className="shell flex flex-1 flex-col justify-center py-12">
        <div className="grid-12 items-end">
          <div className="col-span-3 md:col-span-2 lg:col-span-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-raised">
              <Image
                src="/assets/portraits/arnold-portrait.webp"
                alt=""
                fill
                priority
                sizes="180px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="col-span-3 md:col-span-4 lg:col-span-6">
            <p className="meta meta-blue">{profile.shortName}</p>
            <h1 className="mt-3 font-display text-title font-semibold text-paper">
              {profile.name}
            </h1>
            <p className="mt-3 text-sm text-paper/60">{profile.role}</p>
          </div>

          <div className="col-span-6 mt-8 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:justify-self-end">
            <div className="bg-paper p-3">
              <QRCodeSVG value={`${siteUrl}/carte`} size={112} bgColor="#F2F0EA" fgColor="#050505" />
            </div>
            <p className="meta mt-3">Scanner pour partager</p>
          </div>
        </div>

        <ul className="mt-14">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="border-t border-ink-line last:border-b">
              <a
                href={channel.href}
                {...(channel.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 py-5"
                data-cursor="OPEN"
              >
                <span className="meta">{channel.label}</span>
                <span className="flex items-center gap-2 text-sm text-paper transition-colors duration-300 group-hover:text-blue-text">
                  {channel.value}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="meta mt-10">{profile.territory}</p>
      </div>
    </section>
  );
}
