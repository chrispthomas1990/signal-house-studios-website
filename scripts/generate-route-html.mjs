import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadConfigFromFile } from "vite";
import { routeSeo, getCanonicalUrl, getStructuredData } from "../src/seo/seoConfig.ts";

const { config } = await loadConfigFromFile({ command: "build", mode: "production" });
const base = config.base ?? "/";
// Matches the existing sitemap deployment; override when moving hosting.
const origin = process.env.SITE_ORIGIN ?? "https://chrispthomas1990.github.io";
const baseUrl = getCanonicalUrl("/", origin, base);
const template = readFileSync(resolve("dist/index.html"), "utf8");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const [pathname, seo] of Object.entries(routeSeo)) {
  const canonical = getCanonicalUrl(pathname, origin, base);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(seo.title)}</title>`);
  const values = { description: seo.description, "og:title": seo.title, "og:description": seo.description, "og:url": canonical, "og:image": `${baseUrl}shs-social-image.png` };
  for (const [key, value] of Object.entries(values)) {
    const attribute = key.startsWith("og:") ? "property" : "name";
    html = html.replace(new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>(?:\\s*)`), `<meta ${attribute}="${key}" content="${escape(value)}" />\n`);
  }
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>(?:\s*)/, `<link rel="canonical" href="${escape(canonical)}" />\n`);
  html = html.replace(/(<script type="application\/ld\+json" data-seo="structured-data">)[\s\S]*?(<\/script>)/, (_, open, close) => `${open}${JSON.stringify(getStructuredData(canonical, baseUrl, seo)).replaceAll("<", "\\u003c")}${close}`);
  const directory = resolve("dist", pathname.slice(1));
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, "index.html"), html);
}
copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"));
// Keep the legacy video route usable without JavaScript.
mkdirSync(resolve("dist/video-production"), { recursive: true });
writeFileSync(resolve("dist/video-production/index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${base}"><link rel="canonical" href="${baseUrl}"><title>Video Production</title></head><body><a href="${base}">Video Production</a></body></html>`);
console.log(`Generated metadata for ${Object.keys(routeSeo).length} routes.`);
