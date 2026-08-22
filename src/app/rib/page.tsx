import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CopyField from "@/components/ui/CopyField";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "RIB Dizayna",
  description: "Coordonnées bancaires Dizayna.",
  path: "/rib",
  noIndex: true,
});

const BANK = [
  { label: "Titulaire", value: "MUBUANGA YATE" },
  { label: "IBAN", value: "FR80 2043 3026 26N2 6589 6116 230" },
  { label: "BIC", value: "NTSBFRM1XXX" },
  { label: "Domiciliation", value: "N26" },
] as const;

export default function RibPage() {
  return (
    <section className="flex min-h-[100svh] flex-col pt-[var(--header-h)]">
      <div className="shell flex flex-1 flex-col justify-center py-16">
        <div className="flex items-center justify-between border-b border-ink-line pb-6">
          <p className="meta meta-blue">Dizayna</p>
          <Image
            src="/assets/brand/dizayna.webp"
            alt="Dizayna"
            width={52}
            height={64}
            className="h-12 w-auto object-contain"
          />
        </div>

        <h1 className="mt-12 font-display text-display font-semibold text-paper">
          Coordonnées
          <br />
          bancaires
        </h1>
        <p className="measure mt-6 text-paper/60">
          Touchez une ligne pour la copier. Vérifiez toujours les coordonnées avant un virement.
        </p>

        <div className="mt-12">
          {BANK.map((detail) => (
            <CopyField key={detail.label} label={detail.label} value={detail.value} />
          ))}
        </div>

        <Link href="/" className="meta mt-12 inline-block hover:text-paper" data-cursor="hover">
          ← mubuanga.com
        </Link>
      </div>
    </section>
  );
}
