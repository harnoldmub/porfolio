import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";

import BankDetails, { type BankField } from "@/components/ui/BankDetails";
import RibEasterEgg from "@/components/games/RibEasterEgg";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Coordonnées bancaires",
  description: "Coordonnées bancaires d'Arnold Mubuanga Yate.",
  path: "/rib",
  noIndex: true,
});

const IBAN = "FR80 2043 3026 26N2 6589 6116 230";

const FIELDS: readonly BankField[] = [
  { label: "Titulaire", value: "MUBUANGA YATE" },
  { label: "IBAN", value: IBAN, copyValue: IBAN.replace(/\s+/g, ""), primary: true },
  { label: "BIC / SWIFT", value: "NTSBFRM1XXX" },
  { label: "Banque", value: "N26", copyable: false },
];

/**
 * Opened from a message, used once, closed. Everything above the fold on a
 * phone: who it belongs to, the IBAN, and a way to take it away.
 *
 * The PDF button appears only when the document is actually in the project —
 * a bank document is never something to generate.
 */
const PDF = "/assets/rib.pdf";
const hasPdf = existsSync(path.join(process.cwd(), "public", "assets", "rib.pdf"));

export default function RibPage() {
  return (
    <section className="flex flex-1 items-start justify-center px-gutter pb-10 pt-2 sm:items-center sm:pb-16">
      <div className="w-full max-w-[34rem] animate-[rib-in_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
        <p className="meta text-ink/45">Coordonnées bancaires</p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,7vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
          {profile.name}
        </h1>

        <div className="mt-6">
          <BankDetails fields={FIELDS} />
        </div>

        {hasPdf && (
          <a href={PDF} download className="btn btn-ghost mt-3 w-full justify-center">
            Télécharger le RIB (PDF)
          </a>
        )}

        <p className="mt-6 text-sm leading-6 text-ink/50">
          Vérifiez toujours ces coordonnées auprès de moi avant d&apos;émettre un virement.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <RibEasterEgg />
          <a
            href={`mailto:${profile.email}`}
            className="meta link-underline inline-flex min-h-11 items-center text-ink/40 hover:text-ink"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
