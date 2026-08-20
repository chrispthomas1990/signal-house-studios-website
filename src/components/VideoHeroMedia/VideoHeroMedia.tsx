import { useEffect, useRef, useState } from "react";
import { mobileVideoMediaQuery, selectHeroVideo } from "./videoSources";
import "./VideoHeroMedia.css";

export function VideoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoSrc, setHeroVideoSrc] = useState(() =>
    selectHeroVideo(
      typeof window !== "undefined" && window.matchMedia(mobileVideoMediaQuery).matches,
    ),
  );

  useEffect(() => {
    const mobileViewport = window.matchMedia(mobileVideoMediaQuery);
    const selectVideo = (event: MediaQueryListEvent) => {
      setHeroVideoSrc(selectHeroVideo(event.matches));
    };

    mobileViewport.addEventListener("change", selectVideo);
    return () => mobileViewport.removeEventListener("change", selectVideo);
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
