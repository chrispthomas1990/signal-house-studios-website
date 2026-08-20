export type SeoConfig = { title: string; description: string; serviceName?: string; serviceType?: string };

export const defaultSeo: SeoConfig = { title: "Signal House Studios | Video Production Hertfordshire", description: "Strategy-led video production for brands, campaigns, corporate films and content from Signal House Studios in Hertfordshire.", serviceName: "Video Production", serviceType: "Corporate films, campaign content and short form video production" };
export const routeSeo: Record<string, SeoConfig> = {
  "/": defaultSeo,
  "/audio-production": { title: "Signal House Studios | Audio Production Hertfordshire", description: "Recording, production, mixing and mastering for artists at Signal House Studios, a Hertfordshire production studio led by producer Tim Kramer.", serviceName: "Audio Production", serviceType: "Recording, production, mixing and mastering" },
  "/live-streaming": { title: "Signal House Studios | Live Streaming Production Hertfordshire", description: "Live streaming production for launches, performances, hybrid events and broadcasts, planned and delivered by Signal House Studios.", serviceName: "Live Streaming Production", serviceType: "Live streaming for launches, performances, hybrid events and broadcasts" },
  "/black-bench": { title: "Signal House Studios | Black Bench", description: "Black Bench content is being prepared. Contact Signal House Studios for current information." },
  "/contact": { title: "Signal House Studios | Contact", description: "Contact Signal House Studios to discuss audio production, video production, live streaming or a mixed production project." },
  "/privacy-policy": { title: "Signal House Studios | Privacy Policy", description: "Read the Signal House Studios privacy policy for information about how enquiries and site data are handled." },
  "/cookie-policy": { title: "Signal House Studios | Cookie Policy", description: "Read the Signal House Studios cookie policy for information about cookies, analytics and third-party embedded features." },
};
const notFoundSeo: SeoConfig = { title: "Signal House Studios | Page Not Found", description: "The page you were looking for could not be found. Explore Signal House Studios audio, video and live streaming services." };

export function getCanonicalUrl(pathname: string, origin: string, basePath: string) {
  return `${origin}${basePath.replace(/\/$/, "")}${pathname === "/" ? "/" : pathname}`;
}

export function getStructuredData(canonicalUrl: string, baseUrl: string, seo: SeoConfig) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const logoUrl = `${normalizedBaseUrl}/shs-social-image.png`;
  const businessId = `${normalizedBaseUrl}/#organization`;
  const websiteId = `${normalizedBaseUrl}/#website`;
  const graph: Record<string, unknown>[] = [
    { "@type": ["Organization", "LocalBusiness"], "@id": businessId, name: "Signal House Studios", url: baseUrl, image: logoUrl, telephone: "+447859821284", email: "info@signalhousestudios.com", address: { "@type": "PostalAddress", addressLocality: "Hertfordshire", addressCountry: "GB" }, sameAs: ["https://www.facebook.com/signalhousestudios/", "https://www.instagram.com/signalhousestudios/", "https://tidal.com/browse/playlist/6ef56bda-2da3-431b-b083-651303e46c4b", "https://www.youtube.com/channel/UCXJfMQPz61S-NdvhhL9fUHQ"] },
    { "@type": "WebSite", "@id": websiteId, name: "Signal House Studios", url: baseUrl, publisher: { "@id": businessId } },
    { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: seo.title, description: seo.description, isPartOf: { "@id": websiteId }, about: { "@id": businessId } },
  ];
  if (seo.serviceName && seo.serviceType) graph.push({ "@type": "Service", "@id": `${canonicalUrl}#service`, name: seo.serviceName, serviceType: seo.serviceType, description: seo.description, provider: { "@id": businessId }, areaServed: { "@type": "AdministrativeArea", name: "Hertfordshire" }, url: canonicalUrl });
  return { "@context": "https://schema.org", "@graph": graph };
}

function setOpenGraphMeta(property: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!meta) { meta = document.createElement("meta"); meta.setAttribute("property", property); document.head.appendChild(meta); }
  meta.content = content;
}

export function applySeoMetadata(pathname: string) {
  const seo = routeSeo[pathname] ?? notFoundSeo;
  const canonicalPath = routeSeo[pathname] ? pathname : "/";
  const baseUrl = getCanonicalUrl("/", window.location.origin, import.meta.env.BASE_URL);
  const canonicalUrl = getCanonicalUrl(canonicalPath, window.location.origin, import.meta.env.BASE_URL);
  document.title = seo.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", seo.description);
  setOpenGraphMeta("og:title", seo.title); setOpenGraphMeta("og:description", seo.description); setOpenGraphMeta("og:type", "website"); setOpenGraphMeta("og:url", canonicalUrl); setOpenGraphMeta("og:image", `${baseUrl.replace(/\/$/, "")}/shs-social-image.png`);
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) { canonicalLink = document.createElement("link"); canonicalLink.rel = "canonical"; document.head.appendChild(canonicalLink); }
  canonicalLink.href = canonicalUrl;
  let script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-seo="structured-data"]');
  if (!script) { script = document.createElement("script"); script.type = "application/ld+json"; script.dataset.seo = "structured-data"; document.head.appendChild(script); }
  script.textContent = JSON.stringify(getStructuredData(canonicalUrl, baseUrl, seo));
}
