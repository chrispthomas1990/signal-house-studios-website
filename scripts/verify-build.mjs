import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { loadConfigFromFile } from "vite";
import { routeSeo } from "../src/seo/seoConfig.ts";

const { config } = await loadConfigFromFile({ command: "build", mode: "production" });
const base = config.base ?? "/";
const origin = process.env.SITE_ORIGIN ?? "https://www.signalhousestudios.com";
const titles = new Set();
const external = new Set();
for (const pathname of [...Object.keys(routeSeo), "/404.html"]) {
  const filename = pathname === "/404.html" ? "404.html" : `${pathname.slice(1)}${pathname === "/" ? "" : "/"}index.html`;
  const html = readFileSync(resolve("dist", filename), "utf8");
  const url = `${origin}${base.replace(/\/$/, "")}${pathname}`;
  const { document } = new JSDOM(html, { url }).window;
  assert.equal(document.querySelectorAll("h1").length, 1, `${pathname}: one H1`);
  assert(document.querySelector("main")?.textContent.trim(), `${pathname}: rendered content`);
  assert(!titles.has(document.title), `${pathname}: unique title`);
  titles.add(document.title);
  assert(document.querySelector('meta[name="description"]')?.content, `${pathname}: description`);
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, url);
  JSON.parse(document.querySelector('[data-seo="structured-data"]').textContent);
  if (pathname === "/404.html") assert.match(document.querySelector('meta[name="robots"]').content, /noindex/);
  for (const image of document.querySelectorAll("img")) assert(image.hasAttribute("alt"), `${pathname}: image alt attribute`);
  for (const element of document.querySelectorAll("[href], [src], [srcset]")) {
    const values = [element.getAttribute("href"), element.getAttribute("src")].filter(Boolean);
    const srcset = element.getAttribute("srcset");
    if (srcset && !srcset.startsWith("data:")) values.push(...srcset.split(",").map((entry) => entry.trim().split(/\s+/)[0]));
    for (const value of values) {
      if (/^(data:|mailto:|tel:)/.test(value)) continue;
      const target = new URL(value, url);
      if (target.origin !== origin) { external.add(target.href); continue; }
      assert(target.pathname.startsWith(base), `${pathname}: URL outside base: ${value}`);
      const relative = decodeURIComponent(target.pathname.slice(base.length)).replace(/\/$/, "");
      const file = resolve("dist", relative);
      assert(existsSync(file) || existsSync(resolve(file, "index.html")), `${pathname}: broken URL ${value}`);
      if (target.hash && target.pathname === new URL(url).pathname) {
        assert(document.getElementById(decodeURIComponent(target.hash.slice(1))), `${pathname}: broken anchor ${value}`);
      }
    }
  }
}
const sitemap = new JSDOM(readFileSync("dist/sitemap.xml", "utf8"), { contentType: "text/xml" }).window.document;
const sitemapUrls = [...sitemap.querySelectorAll("loc")].map((element) => element.textContent);
assert.deepEqual(sitemapUrls.sort(), Object.keys(routeSeo).map((path) => `${origin}${base.replace(/\/$/, "")}${path}`).sort());
assert(readFileSync("dist/robots.txt", "utf8").includes(`${origin}${base}sitemap.xml`));
assert(readFileSync("dist/video-production/index.html", "utf8").includes(`content="0;url=${base}"`));
for (const name of readdirSync("dist/assets").filter((name) => name.endsWith(".css"))) {
  const css = readFileSync(resolve("dist/assets", name), "utf8");
  for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
    if (match[1].startsWith("data:")) continue;
    const target = new URL(match[1], `${origin}${base}assets/${name}`);
    if (target.origin !== origin) continue;
    assert(target.pathname.startsWith(base), `CSS URL outside base: ${match[1]}`);
    assert(existsSync(resolve("dist", decodeURIComponent(target.pathname.slice(base.length)))), `CSS asset missing: ${match[1]}`);
  }
}
console.log(`Verified ${titles.size} HTML pages: content, headings, metadata, local links, assets, anchors, sitemap and legacy redirect.`);
console.log(`${external.size} external URLs found; external availability requires a separate live check.`);
