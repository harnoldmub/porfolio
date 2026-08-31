import type { Metadata } from "next";

import { profile } from "@/data/profile";

const FALLBACK = "https://www.mubuanga.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL && /^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : FALLBACK
).replace(/\/$/, "");

export const metadataBase = new URL(siteUrl);
export const siteName = `${profile.shortName} — ${profile.name}`;
// A compact square mark keeps shared links recognisable without the full-size
// project artwork taking over the preview.
export const defaultOg = "/share-icon.png?v=20260831";

export const defaultDescription =
  "Arnold Mubuanga Yate (AMY) — Software Engineer, Product Builder et Chef de Projet IT. Je conçois et développe des applications métier, des plateformes web et des produits digitaux, de l'idée à la production.";

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = defaultOg,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "fr_FR",
      type,
      images: [{ url: image, width: 512, height: 512, alt: `${siteName} — logo` }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

/** Person + WebSite graph, emitted once from the root layout. */
export const identityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: profile.shortName,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      jobTitle: "Software Engineer · Product Builder · IT Project Lead",
      description: defaultDescription,
      knowsAbout: [
        "Software engineering",
        "Product design",
        "IT project management",
        "Web platforms",
        "Digital transformation",
      ],
      knowsLanguage: ["fr", "en", "ln"],
      worksFor: { "@type": "Organization", name: "Ville de Lille" },
      alumniOf: { "@type": "Organization", name: "Dassault Systèmes" },
      sameAs: [profile.linkedin, profile.instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: defaultDescription,
      inLanguage: "fr-FR",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Data is authored in this repository, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
