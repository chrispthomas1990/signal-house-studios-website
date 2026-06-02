import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { cookiePolicyContent, privacyPolicyContent } from "./content/legal";
import { AudioProduction } from "./pages/AudioProduction";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { LegalPage } from "./pages/LegalPage";
import { LiveStreaming } from "./pages/LiveStreaming";
import { NotFound } from "./pages/NotFound";
import { VideoProduction } from "./pages/VideoProduction";

type SeoConfig = {
  title: string;
  description: string;
  serviceName?: string;
  serviceType?: string;
};

const defaultSeo = {
  title: "Signal House Studios | Audio, Video and Live Streaming Production",
  description:
    "Signal House Studios is a Hertfordshire production studio for audio production, video production and live streaming, led by producer Tim Kramer.",
};

const routeSeo: Record<string, SeoConfig> = {
  "/": defaultSeo,
  "/audio-production": {
    title: "Audio Production Hertfordshire | Signal House Studios",
    description:
      "Recording, production, mixing and mastering for artists at Signal House Studios, a Hertfordshire production studio led by producer Tim Kramer.",
    serviceName: "Audio Production",
    serviceType: "Recording, production, mixing and mastering",
  },
  "/video-production": {
    title: "Video Production Hertfordshire | Signal House Studios",
    description:
      "Strategy-led video production for brands, campaigns, corporate films and short form content from Signal House Studios in Hertfordshire.",
    serviceName: "Video Production",
    serviceType: "Corporate films, campaign content and short form video production",
  },
  "/live-streaming": {
    title: "Live Streaming Production Hertfordshire | Signal House Studios",
    description:
      "Live streaming production for launches, performances, hybrid events and broadcasts, planned and delivered by Signal House Studios.",
    serviceName: "Live Streaming Production",
    serviceType: "Live streaming for launches, performances, hybrid events and broadcasts",
  },
  "/contact": {
    title: "Contact Signal House Studios | Start a Project",
    description:
      "Contact Signal House Studios to discuss audio production, video production, live streaming or a mixed production project.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Signal House Studios",
    description:
      "Read the Signal House Studios privacy policy for information about how enquiries and site data are handled.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Signal House Studios",
    description:
      "Read the Signal House Studios cookie policy for information about cookies, analytics and third-party embedded features.",
  },
};

function getCanonicalUrl(pathname: string) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const routePath = pathname === "/" ? "/" : pathname;

  return `${window.location.origin}${basePath}${routePath}`;
}

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

function setOpenGraphMeta(property: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function getStructuredData(canonicalUrl: string, seo: SeoConfig) {
  const baseUrl = getCanonicalUrl("/");
  const assetBaseUrl = baseUrl.replace(/\/$/, "");
  const logoUrl = `${assetBaseUrl}/shs-social-image.png`;
  const businessId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": businessId,
      name: "Signal House Studios",
      url: baseUrl,
      image: logoUrl,
      telephone: "+447859821284",
      email: "info@signalhousestudios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hertfordshire",
        addressCountry: "GB",
      },
      sameAs: [
        "https://www.facebook.com/signalhousestudios/",
        "https://www.instagram.com/signalhousestudios/",
        "https://tidal.com/browse/playlist/6ef56bda-2da3-431b-b083-651303e46c4b",
        "https://www.youtube.com/channel/UCXJfMQPz61S-NdvhhL9fUHQ",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Signal House Studios",
      url: baseUrl,
      publisher: {
        "@id": businessId,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": businessId,
      },
    },
  ];

  if (seo.serviceName && seo.serviceType) {
    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: seo.serviceName,
      serviceType: seo.serviceType,
      description: seo.description,
      provider: {
        "@id": businessId,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Hertfordshire",
      },
      url: canonicalUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

function SeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = routeSeo[pathname] ?? {
      title: "Page Not Found | Signal House Studios",
      description:
        "The page you were looking for could not be found. Explore Signal House Studios audio, video and live streaming services.",
    };
    const canonicalPath = routeSeo[pathname] ? pathname : "/";
    const canonicalUrl = getCanonicalUrl(canonicalPath);

    document.title = seo.title;
    setMetaAttribute('meta[name="description"]', "content", seo.description);
    setOpenGraphMeta("og:title", seo.title);
    setOpenGraphMeta("og:description", seo.description);
    setOpenGraphMeta("og:type", "website");
    setOpenGraphMeta("og:url", canonicalUrl);
    setOpenGraphMeta("og:image", `${getCanonicalUrl("/").replace(/\/$/, "")}/shs-social-image.png`);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = canonicalUrl;

    let structuredDataScript = document.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-seo="structured-data"]',
    );

    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.type = "application/ld+json";
      structuredDataScript.dataset.seo = "structured-data";
      document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.textContent = JSON.stringify(
      getStructuredData(canonicalUrl, seo),
    );
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SeoMetadata />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="audio-production" element={<AudioProduction />} />
          <Route path="video-production" element={<VideoProduction />} />
          <Route path="live-streaming" element={<LiveStreaming />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<LegalPage content={privacyPolicyContent} />} />
          <Route path="cookie-policy" element={<LegalPage content={cookiePolicyContent} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
