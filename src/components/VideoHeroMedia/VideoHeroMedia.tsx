import { useEffect, useRef, useSyncExternalStore } from "react";
import { selectHeroVideo } from "./videoSources";
import "./VideoHeroMedia.css";

const mobileVideoQuery = "(max-width: 360px)";

function subscribeViewport(callback: () => void) {
  const query = window.matchMedia(mobileVideoQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMobileViewport() {
  return window.matchMedia(mobileVideoQuery).matches;
}

type VideoHeroMediaProps = {
  videoSrc?: string;
  mobileVideoSrc?: string;
  label?: string;
};

export function VideoHeroMedia({
  videoSrc,
  mobileVideoSrc,
  label = "Signal House Studios video production showreel",
}: VideoHeroMediaProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useSyncExternalStore(subscribeViewport, getMobileViewport, () => false);
  const heroVideoSrc = isMobile && mobileVideoSrc
    ? mobileVideoSrc
    : videoSrc ?? selectHeroVideo(isMobile);

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
