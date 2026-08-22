import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

// Kept in sync with src/data/projects.ts — the file name maps to the slug in
// scripts/build-assets.py, which turns these raw captures into served assets.
const urls = [
  ["https://salon.congonaparis.fr/", "salon_congonaparis_fr"],
  ["https://mbokahub.com/", "mbokahub_com"],
  ["https://tselemrdc.com/", "tselemrdc_com"],
  ["https://e-visa.mubuanga.com/", "e-visa_mubuanga_com"],
  ["https://blocleopards.mubuanga.com/", "blocleopards_mubuanga_com"],
  ["https://momento.wedding/", "momento_wedding"],
  ["https://u-moja.org/", "u-moja_org"],
  ["https://dgm.mubuanga.com/", "dgm_mubuanga_com"],
  ["https://fondationnoahsadiki.org/", "fondationnoahsadiki_org"],
  ["https://cozyinterieur.com/", "cozyinterieur_com"],
  ["https://malkya.co/", "malkya_co"],
  ["https://tselem.studio/", "tselem_studio"],
  ["http://awanetwork.com/", "awanetwork_com"],
  ["https://daylora.co/", "daylora_co"],
  ["https://kecha2026.com/", "kecha_2026"],
  ["https://mamisamarylin2026.com/", "mami_samarylin_2026"],
];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE  = { width: 390,  height: 844 };  // iPhone 14

const outDir = "_source-assets/screenshots";
if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

async function capture(url, name, viewport, suffix) {
  const ua = viewport.width < 500
    ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  const context = await browser.newContext({ viewport, userAgent: ua });
  const page = await context.newPage();
  const path = `${outDir}/${name}${suffix}.png`;
  process.stdout.write(`  [${suffix === "" ? "desktop" : "mobile "}] `);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path, clip: { x: 0, y: 0, width: viewport.width, height: viewport.height } });
    console.log("✓");
  } catch (err) {
    console.log(`✗ ${err.message.split("\n")[0]}`);
  }
  await context.close();
}

for (const [url, name] of urls) {
  console.log(`\n→ ${url}`);
  await capture(url, name, DESKTOP, "");
  await capture(url, name, MOBILE,  "_mobile");
}

await browser.close();
console.log("\nDone — screenshots in _source-assets/screenshots/");
