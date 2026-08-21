import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { cookiePolicyContent, privacyPolicyContent } from "./content/legal";
import { AudioProduction } from "./pages/AudioProduction";
import { BlackBench } from "./pages/BlackBench";
import { Contact } from "./pages/Contact";
import { LegalPage } from "./pages/LegalPage";
import { LiveStreaming } from "./pages/LiveStreaming";
import { NotFound } from "./pages/NotFound";
import { VideoProduction } from "./pages/VideoProduction";
import { SeoMetadata } from "./seo/SeoMetadata";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SeoMetadata />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VideoProduction />} />
          <Route path="audio-production" element={<AudioProduction />} />
          <Route path="video-production" element={<Navigate to="/" replace />} />
          <Route path="live-streaming" element={<LiveStreaming />} />
          <Route path="black-bench" element={<BlackBench />} />
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
