import { useEffect, useRef, useState } from "react";
import { selectHeroVideo } from "./videoSources";
import "./VideoHeroMedia.css";

const mobileVideoQuery = "(max-width: 360px)";

type VideoHeroMediaProps = {
  videoSrc?: string;
  label?: string;
};

export function VideoHeroMedia({
  videoSrc,
  label = "Signal House Studios video production showreel",
}: VideoHeroMediaProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(mobileVideoQuery).matches,
  );
  const heroVideoSrc = videoSrc ?? selectHeroVideo(isMobile);

  useEffect(() => {
    if (videoSrc) return;
    const mediaQuery = window.matchMedia(mobileVideoQuery);
    const handleViewportChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (document.hidden || reducedMotion.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    // Setting src already starts media selection; load() would restart that request.
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    video.addEventListener("loadeddata", updatePlayback);
    return () => {
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      video.removeEventListener("loadeddata", updatePlayback);
      video.pause();
    };
  }, [heroVideoSrc]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="auto"
      src={heroVideoSrc}
      aria-label={label}
    />
  );
}
