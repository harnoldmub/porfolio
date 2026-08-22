# mubuanga.com

Portfolio of **Arnold Mubuanga Yate (AMY)** — Software Engineer · Product Builder · IT Project Lead.

Next.js 14 (App Router) · TypeScript · Tailwind · Three.js · Framer Motion · Lenis.

## Running

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production (defaults to `https://www.mubuanga.com`).
It drives canonicals, OpenGraph URLs, the sitemap and the JSON-LD graph.

## Checks

```bash
npm run typecheck
npm run lint
npm run audit -- http://localhost:3000 ./.audit 375,768,1440
```

`npm run audit` walks every route at the given widths and reports console
errors, failed requests, horizontal overflow, heading structure and broken
images, writing full-page screenshots to the output directory.

## Content

Everything the site says lives in two files — no CMS, no database:

- `src/data/profile.ts` — identity, copy, stats, capabilities, experience.
- `src/data/projects.ts` — the case studies. Adding one entry adds it to the
  index, the homepage selection (via `featured`), its own `/work/[slug]` page,
  its metadata, its JSON-LD and the prev/next navigation.

## Assets

`public/assets` is **generated**, never edited by hand. The originals —
purchased 3D packs, raw site captures, the untouched portrait and logo — live
in `_source-assets/`, which is git-ignored and never served.

```bash
npm run captures   # re-capture the project sites into _source-assets/screenshots
npm run assets     # select, clean, rename, resize and re-encode into public/assets
```

`scripts/build-assets.py` is the whole pipeline: it strips the burnt-in orbit
from the portrait, normalises every capture to 16:10 while cropping out cookie
banners, desaturates the chrome ring still, cleans the tech SVGs, and renders
`public/og.png` and the favicons. Run individual steps with
`python3 scripts/build-assets.py projects portrait`.

## Structure

```
src/app/
  (site)/           the portfolio — /, /work, /work/[slug], /about,
                    /contact, /carte. Wrapped in SiteChrome.
  (tool)/           utility routes — /rib. A mark, a way back, nothing else:
                    no loader, no smooth scroll, no cursor, no footer.
  not-found.tsx     404, sitemap.ts, robots.ts, icons
src/components/
  layout/           chrome — header, mobile menu, footer, cursor, loader,
                    page transition, smooth scroll, grain
  ui/               reveal primitives, marquee, magnetic, icons, forms
  home/             homepage sections + the WebGL hero object
  work/             project feature block, case study gallery
src/data/           content
src/lib/            seo helpers, reveal hook, class merger
```

## Notes

- The hero's chrome ring is progressive enhancement: the still frame renders
  first, and Three.js only boots on pointer devices with 4+ cores that have not
  asked for reduced motion. Any failure leaves the still in place.
- Reveals are CSS transitions toggled by an IntersectionObserver, and the hidden
  start state is scoped to `.js` — without JavaScript the page renders finished.
- `/carte` and `/rib` are private utility pages: reachable by direct link,
  `noindex`, and excluded from the sitemap and robots.
- `/carte/vcard` serves a real `.vcf` so the card lands in the phone's address
  book. `/rib` copies entirely in the browser — no bank detail is ever sent
  anywhere. Its "Télécharger le RIB" button appears only when
  `public/assets/rib.pdf` actually exists; drop the document in and it shows
  up. Nothing generates a bank document.
