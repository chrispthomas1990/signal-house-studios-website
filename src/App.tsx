import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AudioProduction } from "./pages/AudioProduction";
import { VideoProduction } from "./pages/VideoProduction";
import { LiveStreaming } from "./pages/LiveStreaming";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="audio-production" element={<AudioProduction />} />
          <Route path="video-production" element={<VideoProduction />} />
          <Route path="live-streaming" element={<LiveStreaming />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;