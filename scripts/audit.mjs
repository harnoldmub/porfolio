/**
 * Site audit harness: walks every route at every target width, captures
 * full-page screenshots and collects console errors, failed requests,
 * horizontal overflow and heading structure.
 *
 * Note on the screenshots: `fullPage` composites `position: fixed` layers
 * (header, grain) only over the first viewport, so the top of a long capture
 * does not represent what a visitor sees. Trust the diagnostics for
 * correctness and a viewport-sized capture for anything visual.
 *
 *   node scripts/audit.mjs <baseUrl> <outDir> [width,width,...]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3042";
const out = process.argv[3] ?? "./.audit";
const widths = (process.argv[4] ?? "1440").split(",").map(Number);
/** Full-page captures are expensive on long pages, so only these widths get one. */
const SHOOT = new Set([375, 768, 1440]);
const CONCURRENCY = 3;

const ROUTES = [
  ["/", "home"],
  ["/work", "work"],
  ["/work/e-visa", "case-e-visa"],
  ["/work/daylora", "case-daylora"],
  ["/about", "about"],
  ["/contact", "contact"],
  ["/carte", "carte"],
  ["/rib", "rib"],
  ["/route-inexistante", "404"],
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
    locale: "fr-FR",
  });

  // The intro overlay is a once-per-session affair; marking it seen keeps it
  // out of every capture (it is `fixed`, so it would paste itself over the top
  // of each full-page screenshot).
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("amy:seen", "1");
    } catch {}
  });

  const queue = [...ROUTES];
  const worker = async () => {
   for (let job = queue.shift(); job; job = queue.shift()) {
    const [route, name] = job;
    const page = await context.newPage();
    const errors = [];
    const failed = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("requestfailed", (r) => failed.push(`${r.url()} — ${r.failure()?.errorText}`));
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });

    const res = await page.goto(base + route, { waitUntil: "load", timeout: 30000 });

    // Reveal everything, freeze motion, and settle lazy images before capture.
    await page.addStyleTag({
      content: `*,*::before,*::after{animation-duration:0s !important;animation-delay:0s !important;transition-duration:0s !important;transition-delay:0s !important}`,
    });
    await page.evaluate(async () => {
      window.__lenis?.destroy?.();
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 45));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
      document.querySelectorAll("[data-reveal-group],.reveal,.reveal-clip,.line-mask").forEach((el) => {
        el.dataset.revealed = "true";
      });
      // decode() never settles for a lazy image inside a display:none subtree,
      // so every wait is raced against a deadline.
      const deadline = (promise, ms) =>
        Promise.race([promise, new Promise((r) => setTimeout(r, ms))]);
      await deadline(
        Promise.all(
          [...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})),
        ),
        4000,
      );
    });
    await page.waitForTimeout(300);

    const diag = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;
      const offenders = [];
      if (overflow > 1) {
        document.querySelectorAll("body *").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1)) {
            offenders.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} [${Math.round(r.left)}→${Math.round(r.right)}]`,
            );
          }
        });
      }
      return {
        title: document.title,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 60)),
        headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName),
        overflow,
        offenders: offenders.slice(0, 6),
        imgsNoAlt: [...document.images].filter((i) => i.alt === null).length,
        brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        canonical: document.querySelector("link[rel=canonical]")?.href ?? null,
        ogImage: document.querySelector("meta[property='og:image']")?.content ?? null,
        desc: document.querySelector("meta[name=description]")?.content?.slice(0, 60) ?? null,
      };
    });

    if (SHOOT.has(width)) {
      await page.screenshot({ path: `${out}/${width}-${name}.png`, fullPage: true });
    }
    report.push({ width, route, status: res?.status(), ...diag, errors, failed: [...new Set(failed)] });
    await page.close();
   }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await context.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 1));
