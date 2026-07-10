import { trustedCompanies } from "@/data/profile";

const items = [...trustedCompanies, ...trustedCompanies];

export default function ReferenceMarquee() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 md:hidden">
        {trustedCompanies.map((company) => (
          <div
            key={company}
            className="rounded-[1.35rem] border border-white/12 bg-white/[0.06] px-4 py-4 text-center text-sm font-medium text-[#f6efe2] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          >
            {company}
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden md:block">
        <div className="reference-track flex min-w-max items-center gap-4 py-2">
          {items.map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-[#f6efe2] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:border-[#356dff] hover:bg-white/[0.08]"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
