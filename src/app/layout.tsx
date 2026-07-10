import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import { defaultKeywords, fullName, metadataBase, siteName } from "@/lib/seo";

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontDisplay = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase,
  applicationName: siteName,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  title: {
    default: "AMY | CV, portfolio et projets digitaux",
    template: "%s | AMY",
  },
  description:
    "CV en ligne et portfolio d'Arnold Mubuanga Yate (AMY), ingénieur développement, chef de projet informatique et entrepreneur digital.",
  keywords: defaultKeywords,
  openGraph: {
    title: "AMY | CV, portfolio et projets digitaux",
    description:
      "CV en ligne et portfolio d'Arnold Mubuanga Yate (AMY), ingénieur développement, chef de projet informatique et entrepreneur digital.",
    siteName,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMY | CV, portfolio et projets digitaux",
    description:
      "CV en ligne et portfolio d'Arnold Mubuanga Yate (AMY), ingénieur développement, chef de projet informatique et entrepreneur digital.",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: fullName }],
  creator: fullName,
  publisher: fullName,
  category: "portfolio",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
