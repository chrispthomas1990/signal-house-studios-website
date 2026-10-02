import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { cookiePolicyContent, privacyPolicyContent } from "./content/legal";
import { SeoMetadata } from "./seo/SeoMetadata";

const AudioProduction = lazy(() => import("./pages/AudioProduction").then((module) => ({ default: module.AudioProduction })));

const BlackBench = lazy(() => import("./pages/BlackBench").then((module) => ({ default: module.BlackBench })));

const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));

const LegalPage = lazy(() => import("./pages/LegalPage").then((module) => ({ default: module.LegalPage })));

const LiveStreaming = lazy(() => import("./pages/LiveStreaming").then((module) => ({ default: module.LiveStreaming })));

const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));

const VideoProduction = lazy(() => import("./pages/VideoProduction").then((module) => ({ default: module.VideoProduction })));

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
