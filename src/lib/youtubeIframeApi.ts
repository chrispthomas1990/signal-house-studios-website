export type YouTubePlayer = {
  pauseVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerEvent = { target: YouTubePlayer; data: number };
type YouTubeConstructor = new (
  element: HTMLIFrameElement,
  options: { events: { onStateChange: (event: YouTubePlayerEvent) => void } },
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: { Player: YouTubeConstructor; PlayerState: { PLAYING: number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

export function loadYouTubeIframeApi(timeoutMs = 15000) {
  if (window.YT?.Player) return Promise.resolve();

  if (!apiPromise) {
    apiPromise = new Promise<void>((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      const scriptSelector = 'script[src="https://www.youtube.com/iframe_api"]';
      let script = document.querySelector<HTMLScriptElement>(scriptSelector);
      const timeoutId = window.setTimeout(() => {
        apiPromise = null;
        reject(new Error("YouTube iframe API timed out"));
      }, timeoutMs);

      window.onYouTubeIframeAPIReady = () => {
        window.clearTimeout(timeoutId);
        previousCallback?.();
        resolve();
      };

      if (!script) {
        script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }

      script.addEventListener("error", () => {
        window.clearTimeout(timeoutId);
        apiPromise = null;
        reject(new Error("YouTube iframe API failed to load"));
      }, { once: true });
    });
  }

  return apiPromise;
}

export function getApiEnabledYouTubeSrc(src: string, origin = window.location.origin) {
  const url = new URL(src);
  url.searchParams.set("enablejsapi", "1");
  url.searchParams.set("origin", origin);
  return url.toString();
}
