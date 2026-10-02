import { useEffect, useRef, useState } from "react";

export function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ready, setReady] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    if (ready || !ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ready]);

  return { ref, ready };
}
