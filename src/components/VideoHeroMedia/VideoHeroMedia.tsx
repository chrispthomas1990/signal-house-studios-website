import { useEffect, useRef } from "react";
import { selectHeroVideo } from "./videoSources";
import "./VideoHeroMedia.css";

export function VideoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoSrc = selectHeroVideo();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, []);

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
