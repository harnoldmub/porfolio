/**
 * Keyboard and semantics pass: tabs through each route, records the focus
 * order and whether the focus ring is actually visible, and checks landmarks,
 * link text and the mobile menu's focus trap.
 *
 *   node scripts/a11y.mjs <baseUrl>
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3042";
const ROUTES = ["/", "/work", "/work/e-visa", "/about", "/contact", "/route-inexistante"];

const browser = await chromium.launch();
const SEEN = () => {
  try {
    sessionStorage.setItem("amy:seen", "1"); // skip the once-per-session intro
  } catch {}
};

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(SEEN);
const findings = [];

for (const route of ROUTES) {
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  const order = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 34),
        outline: `${s.outlineStyle} ${s.outlineWidth}`,
        offscreen: r.width === 0 || r.height === 0,
      };
    });
    if (info) order.push(info);
  }

  const semantics = await page.evaluate(() => {
    const heads = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]);
    let jumps = [];
    for (let i = 1; i < heads.length; i++) {
      if (heads[i] > heads[i - 1] + 1) jumps.push(`h${heads[i - 1]} → h${heads[i]}`);
    }
    return {
      landmarks: {
        main: document.querySelectorAll("main").length,
        header: document.querySelectorAll("header").length,
        footer: document.querySelectorAll("footer").length,
        nav: document.querySelectorAll("nav").length,
      },
      headingJumps: jumps,
      emptyLinks: [...document.querySelectorAll("a[href]")].filter(
        (a) => !a.textContent.trim() && !a.getAttribute("aria-label"),
      ).length,
      imgsMissingAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
      newTabNoRel: [...document.querySelectorAll('a[target="_blank"]')].filter(
        (a) => !(a.rel || "").includes("noreferrer"),
      ).length,
      lang: document.documentElement.lang,
      skipLink: !!document.querySelector(".skip-link"),
    };
  });

  const noRing = order.filter((o) => o.outline.startsWith("none")).length;
  findings.push({ route, focusables: order.length, withoutFocusRing: noRing, ...semantics, order: order.slice(0, 6) });
  await page.close();
}

// Mobile menu focus trap
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await m.addInitScript(SEEN);
const mp = await m.newPage();
await mp.goto(base + "/", { waitUntil: "domcontentloaded" });
await mp.waitForTimeout(600);
await mp.click('button[aria-controls="mobile-menu"]');
await mp.waitForTimeout(900);
const trap = await mp.evaluate(() => ({
  open: !!document.getElementById("mobile-menu"),
  modal: document.getElementById("mobile-menu")?.getAttribute("aria-modal"),
  bodyLocked: getComputedStyle(document.documentElement).overflow === "hidden",
  focusInside: document.getElementById("mobile-menu")?.contains(document.activeElement),
}));
await mp.keyboard.press("Escape");
await mp.waitForTimeout(800);
const closed = await mp.evaluate(() => !document.getElementById("mobile-menu"));
findings.push({ route: "mobile-menu", ...trap, closesOnEscape: closed });

await browser.close();
console.log(JSON.stringify(findings, null, 1));
