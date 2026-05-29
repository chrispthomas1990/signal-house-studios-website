import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { AudioProduction } from "./pages/AudioProduction";
import { Contact } from "./pages/Contact/Contact";
import { Home } from "./pages/Home";
import { LiveStreaming } from "./pages/LiveStreaming";
import { NotFound } from "./pages/NotFound";
import { VideoProduction } from "./pages/VideoProduction";

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="audio-production" element={<AudioProduction />} />
          <Route path="video-production" element={<VideoProduction />} />
          <Route path="live-streaming" element={<LiveStreaming />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
