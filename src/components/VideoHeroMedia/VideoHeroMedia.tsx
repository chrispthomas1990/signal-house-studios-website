import { useEffect, useRef, useState } from "react";
import { selectHeroVideo } from "./videoSources";
import "./VideoHeroMedia.css";

const mobileVideoQuery = "(max-width: 360px)";

export function VideoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(mobileVideoQuery).matches,
  );
  const heroVideoSrc = selectHeroVideo(isMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileVideoQuery);
    const handleViewportChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, [heroVideoSrc]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      src={heroVideoSrc}
      aria-label="Signal House Studios video production showreel"
    />
  );
}
