import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { profile } from "@/data/profile";
import { defaultDescription, defaultOg, identityJsonLd, JsonLd, metadataBase, siteName } from "@/lib/seo";

// Display: a grotesk that holds up at 13vw. Body: Inter for long-form French.
// Mono: numbers, years, labels — never paragraphs.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${profile.shortName} — Software Engineer & Product Builder`,
    template: `%s — ${profile.shortName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName,
    title: `${profile.shortName} — Software Engineer & Product Builder`,
    description: defaultDescription,
    images: [{ url: defaultOg, width: 512, height: 512, alt: `${siteName} — logo` }],
  },
  twitter: {
    card: "summary",
    title: `${profile.shortName} — Software Engineer & Product Builder`,
    description: defaultDescription,
    images: [defaultOg],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/*
          Marks the document as scripted before first paint. Every hidden
          reveal start-state is scoped to `.js`, so without JavaScript the page
          renders finished instead of blank.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }}
        />
      </head>
      <body>
        <JsonLd data={identityJsonLd} />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
