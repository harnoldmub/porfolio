/**
 * Contrast against a moving background.
 *
 * The hero sits over an animated 3D object, so a single frame proves nothing:
 * a highlight sweeping under a line of text can drop it below AA for a moment
 * and back. This samples each text element at several points in the rotation
 * and reports the worst ratio seen.
 *
 * The glyph mask comes from diffing a shot with the text against one without
 * it, which only holds if the background is identical in both. It is not —
 * unless the object is stopped first. Rendering is frozen by neutering
 * requestAnimationFrame, which strands the render loop on its current frame.
 * Skip that step and the diff reports the object's own movement as text,
 * which makes every reading fiction.
 *
 *   node scripts/contrast.mjs <baseUrl> [route]
 */
import { chromium, devices } from "playwright";
import { PNG } from "pngjs";

const base = process.argv[2] ?? "http://localhost:3000";
const route = process.argv[3] ?? "/";
const SAMPLES = 6;
const SELECTOR = "h1, h2, p, span.meta, a.btn";
const AA = 4.5;
const AA_LARGE = 3;

const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const collect = (page, selector) =>
  page.evaluate((sel) => {
    const out = [];
    document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 12 || r.height < 8 || r.y < 0 || r.bottom > innerHeight) return;
      if (!el.textContent.trim()) return;
      const cs = getComputedStyle(el);
      // An element with its own opaque fill is read against that fill, not
      // against the page, so the page probe does not apply to it.
      const own = cs.backgroundColor.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      if (own && (own[4] === undefined || +own[4] > 0.05)) return;
      const m = cs.color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      const idx = out.length;
      el.dataset.contrastProbe = String(idx);
      out.push({
        idx,
        key: el.textContent.trim().slice(0, 26),
        rgb: m ? [+m[1], +m[2], +m[3]] : [242, 240, 234],
        alpha: m && m[4] !== undefined ? +m[4] : 1,
        large: size >= 24 || (size >= 18.66 && weight >= 700),
        x: Math.round(r.x), y: Math.round(r.y),
        width: Math.round(r.width), height: Math.round(r.height),
        viewW: innerWidth, viewH: innerHeight,
      });
    });
    return out;
  }, selector);

const browser = await chromium.launch();
let failures = 0;

for (const [name, cfg] of [
  ["iPhone 13", devices["iPhone 13"]],
  ["Pixel 7", devices["Pixel 7"] ?? devices["Pixel 5"]],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
]) {
  const ctx = await browser.newContext({ ...cfg });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("amy:seen", "1"); } catch {} });
  const page = await ctx.newPage();

  const worst = new Map();
  const meta = new Map();

  for (let s = 0; s < SAMPLES; s++) {
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(1500 + s * 450);      // a different phase each pass
    const targets = await collect(page, SELECTOR);
    await page.evaluate(() => { window.requestAnimationFrame = () => 0; });

    for (const t of targets) {
      meta.set(t.key, t);
      // Rounding can push a rect a pixel past the viewport, which the
      // screenshot clip rejects outright.
      const clip = {
        x: Math.max(0, t.x),
        y: Math.max(0, t.y),
        width: Math.max(1, Math.min(t.width, t.viewW - Math.max(0, t.x))),
        height: Math.max(1, Math.min(t.height, t.viewH - Math.max(0, t.y))),
      };
      if (clip.width < 4 || clip.height < 4) continue;
      const shown = PNG.sync.read(await page.screenshot({ clip }));
      await page.evaluate((i) => { document.querySelector(`[data-contrast-probe="${i}"]`).style.visibility = "hidden"; }, t.idx);
      const hidden = PNG.sync.read(await page.screenshot({ clip }));
      await page.evaluate((i) => { document.querySelector(`[data-contrast-probe="${i}"]`).style.visibility = ""; }, t.idx);

      let low = Infinity;
      for (let k = 0; k < shown.data.length; k += 4) {
        const d =
          Math.abs(shown.data[k] - hidden.data[k]) +
          Math.abs(shown.data[k + 1] - hidden.data[k + 1]) +
          Math.abs(shown.data[k + 2] - hidden.data[k + 2]);
        if (d < 120) continue;                       // antialiased fringe, not glyph body
        const bg = [hidden.data[k], hidden.data[k + 1], hidden.data[k + 2]];
        const fg = t.rgb.map((c, j) => t.alpha * c + (1 - t.alpha) * bg[j]);
        const r = ratio(L(fg[0], fg[1], fg[2]), L(bg[0], bg[1], bg[2]));
        if (r < low) low = r;
      }
      if (low !== Infinity) worst.set(t.key, Math.min(worst.get(t.key) ?? Infinity, low));
    }
  }

  console.log(`\n${name}`);
  for (const [key, w] of worst) {
    const min = meta.get(key).large ? AA_LARGE : AA;
    const ok = w >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? "✓" : "✗"} ${w.toFixed(2)}:1 (min ${min})  "${key}"`);
  }
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} element(s) below the threshold` : "\nAll sampled text meets WCAG AA across the animation.");
process.exit(failures ? 1 : 0);
