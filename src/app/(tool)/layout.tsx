import Link from "next/link";
import Image from "next/image";

/**
 * The utility shell: a mark, a way back, and nothing else. No loader, no
 * smooth scroll, no cursor, no footer — these pages are opened from a message
 * to do one thing, and every extra layer is friction.
 */
export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="on-paper flex min-h-[100svh] flex-col bg-paper text-ink">
      <header className="shrink-0">
        <div className="mx-auto flex w-full max-w-[34rem] items-center justify-between px-gutter py-4">
          <Link href="/" aria-label="AMY — accueil" className="inline-flex items-end gap-1">
            <Image
              src="/assets/brand/amy-monogram.webp"
              alt=""
              width={190}
              height={73}
              priority
              className="h-5 w-auto invert"
            />
            <span aria-hidden className="mb-0.5 font-mono text-[0.6rem] text-ink/40">
              ®
            </span>
          </Link>
          <Link
            href="/"
            className="meta inline-flex min-h-11 items-center text-ink/55 transition-colors hover:text-ink"
          >
            mubuanga.com →
          </Link>
        </div>
      </header>

      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
