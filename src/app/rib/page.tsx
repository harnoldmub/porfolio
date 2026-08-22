import type { Metadata } from "next";
import Image from "next/image";

import CopyableBankField from "@/components/CopyableBankField";
import { buildPageMetadata } from "@/lib/seo";

const bankDetails = [
  { label: "Titulaire", value: "MUBUANGA YATE" },
  { label: "IBAN", value: "FR80 2043 3026 26N2 6589 6116 230" },
  { label: "BIC", value: "NTSBFRM1XXX" },
  { label: "Domiciliation", value: "N26" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "RIB | Dizayna",
  description: "Coordonnées bancaires de Dizayna, faciles à consulter et à copier.",
  path: "/rib",
});

export default function RibPage() {
  return (
    <main className="site-canvas min-h-screen text-[#111111]">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10">
        <header className="flex items-center justify-between border-b border-black/10 pb-5">
          <a href="/" className="text-sm font-semibold text-black/56 transition hover:text-[#356dff]">
            AMY
          </a>
          <Image
            src="/logo-dizayna.png"
            alt="Dizayna"
            width={108}
            height={108}
            priority
            className="h-14 w-14 object-contain"
          />
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-20">
          <p className="eyebrow text-[#356dff]">Dizayna</p>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-medium leading-[0.96] tracking-[-0.06em] sm:text-7xl">
            Coordonnées bancaires
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-black/56">
            Les informations essentielles, prêtes à être copiées depuis votre téléphone.
          </p>

          <div className="mt-10 border-y border-black/10 bg-[#f0f3ef] px-5 sm:px-7">
            {bankDetails.map((detail) => (
              <CopyableBankField key={detail.label} label={detail.label} value={detail.value} />
            ))}
          </div>

          <p className="mt-6 text-xs leading-5 text-black/42">
            Vérifiez toujours les coordonnées avant d&apos;effectuer un virement.
          </p>
        </section>

        <footer className="border-t border-black/10 pt-5 text-xs text-black/42">
          RIB Dizayna
        </footer>
      </div>
    </main>
  );
}
