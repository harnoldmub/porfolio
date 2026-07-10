import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { profile } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

const phoneDisplay = "+33 6 98 82 71 93";
const instagramUrl = `https://www.instagram.com/${profile.instagram}/`;
const qrBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mubuanga.com";
const qrUrl = `${qrBaseUrl.replace(/\/$/, "")}/carte`;

export const metadata: Metadata = buildPageMetadata({
  title: "Carte de visite | Arnold Mubuanga",
  description:
    "Carte de visite numérique d'Arnold Mubuanga Yate: email, téléphone et Instagram.",
  path: "/carte",
});

export default function BusinessCardPage() {
  return (
    <main className="min-h-screen bg-[#eef0ea] px-3 py-4 text-slate-950 sm:px-6 sm:py-8">
      <section className="mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-[440px] items-center">
        <div className="w-full overflow-hidden rounded-[22px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.14)] ring-1 ring-[#356dff]/60">
          <div className="relative aspect-[4/5] max-h-[580px] bg-slate-200">
            <Image
              src="/profile-portrait-card.png"
              alt="Portrait d'Arnold Mubuanga Yate"
              fill
              priority
              sizes="(min-width: 640px) 448px, calc(100vw - 32px)"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent px-5 pb-5 pt-28 sm:px-7 sm:pb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">AMY</p>
              <h1 className="mt-2 font-display text-[clamp(1.8rem,8vw,2.55rem)] font-semibold leading-[1.05] text-white">
                Arnold Mubuanga Yate
              </h1>
              <p className="mt-3 max-w-[18rem] text-sm font-semibold leading-5 text-white/90">{profile.title}</p>
            </div>
          </div>

          <div className="space-y-2.5 p-3.5 sm:p-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-[#f5f3ee] px-4 py-3 text-left transition hover:bg-[#ebe7dd]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-slate-600" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Email
                  </span>
                  <span className="block truncate text-sm font-semibold text-slate-950">
                    {profile.email}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500" />
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-[#f5f3ee] px-4 py-3 text-left transition hover:bg-[#ebe7dd]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-slate-600" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Téléphone
                  </span>
                  <span className="block text-sm font-semibold text-slate-950">{phoneDisplay}</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500" />
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-[#f5f3ee] px-4 py-3 text-left transition hover:bg-[#ebe7dd]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Instagram className="h-5 w-5 shrink-0 text-slate-600" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Instagram
                  </span>
                  <span className="block text-sm font-semibold text-slate-950">
                    @{profile.instagram}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500" />
            </a>
          </div>

          <div className="mx-3.5 mb-3.5 flex items-center gap-3 border border-[#356dff]/20 bg-[#f5f3ee] p-3.5 sm:mx-4 sm:mb-4 sm:gap-4 sm:p-4">
            <div className="shrink-0 bg-white p-2">
              <QRCodeSVG value={qrUrl} size={82} level="M" includeMargin={false} fgColor="#111111" bgColor="#ffffff" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Mon portfolio</p>
              <p className="mt-1.5 text-sm leading-5 text-slate-700">Scannez pour découvrir mes projets et mon parcours.</p>
              <p className="mt-2 truncate text-xs text-slate-400">{qrUrl.replace(/^https?:\/\//, "")}</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
