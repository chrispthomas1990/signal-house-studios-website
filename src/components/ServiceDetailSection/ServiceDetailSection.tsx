import { useEffect, useMemo, useRef } from "react";
import "./ServiceDetailSection.css";

type ServiceDetailSectionTheme = "light" | "dark" | "grey";

type YouTubePlayer = {
  pauseVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayer;
  data: number;
};

type YouTubeConstructor = new (
  element: HTMLIFrameElement,
  options: {
    events: {
      onStateChange: (event: YouTubePlayerEvent) => void;
    };
  },
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: {
      Player: YouTubeConstructor;
      PlayerState: {
        PLAYING: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeApiPromise: Promise<void> | null = null;
const activeYouTubePlayers = new Set<YouTubePlayer>();

function loadYouTubeIframeApi() {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (!youTubeApiPromise) {
    youTubeApiPromise = new Promise((resolve) => {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    });
  }

  return youTubeApiPromise;
}

function getApiEnabledYouTubeSrc(src: string) {
  const url = new URL(src);

  url.searchParams.set("enablejsapi", "1");
  url.searchParams.set("origin", window.location.origin);

  return url.toString();
}

type ServiceDetailCard = {
  title: string;
  body: string;
  hasImagePlaceholder?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  videoEmbed?: ServiceDetailEmbed;
};

type ServiceDetailEmbed = {
  src: string;
  title: string;
};

type ServiceDetailSectionProps = {
  eyebrow: string;
  title: string;
  body?: string | readonly string[];
  cards?: readonly ServiceDetailCard[];
  embed?: ServiceDetailEmbed;
  hasBottomDivider?: boolean;
  compactTopPadding?: boolean;
  hasImagePlaceholder?: boolean;
  borderlessCards?: boolean;
  gridColumns?: 2 | 3;
  theme?: ServiceDetailSectionTheme;
};

function YouTubeCardEmbed({ src, title }: ServiceDetailEmbed) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const apiEnabledSrc = useMemo(() => getApiEnabledYouTubeSrc(src), [src]);

  useEffect(() => {
    let isMounted = true;

    loadYouTubeIframeApi().then(() => {
      if (!isMounted || !iframeRef.current || !window.YT?.Player) {
        return;
      }

      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data !== window.YT?.PlayerState.PLAYING) {
              return;
            }

            activeYouTubePlayers.forEach((activePlayer) => {
              if (activePlayer !== event.target) {
                activePlayer.pauseVideo();
              }
            });
          },
        },
      });

      playerRef.current = player;
      activeYouTubePlayers.add(player);
    });

    return () => {
      isMounted = false;

      if (playerRef.current) {
        activeYouTubePlayers.delete(playerRef.current);
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={apiEnabledSrc}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export function ServiceDetailSection({
  eyebrow,
  title,
  body,
  cards,
  embed,
  hasBottomDivider = false,
  compactTopPadding = false,
  hasImagePlaceholder = false,
  borderlessCards = false,
  gridColumns = 3,
  theme = "light",
}: ServiceDetailSectionProps) {
  const bodyParagraphs = typeof body === "string" ? [body] : body;
  const hasVideoCards = cards?.some((card) => card.videoEmbed);
  const className = [
    "service-detail-section",
    `service-detail-section--${theme}`,
    `service-detail-section--grid-${gridColumns}`,
    hasBottomDivider ? "service-detail-section--has-bottom-divider" : "",
    compactTopPadding ? "service-detail-section--compact-top" : "",
    borderlessCards ? "service-detail-section--borderless-cards" : "",
    embed || hasImagePlaceholder ? "service-detail-section--media-layout" : "",
    hasVideoCards ? "service-detail-section--has-video-cards" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className}>
      <div className="service-detail-section__inner">
        <div className="service-detail-section__intro">
          <p className="service-detail-section__eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {bodyParagraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {embed ? (
          <div className="service-detail-section__embed">
            <iframe
              src={embed.src}
              title={embed.title}
              loading="lazy"
              allow="encrypted-media; fullscreen"
            />
          </div>
        ) : null}

        {hasImagePlaceholder ? (
          <div className="service-detail-section__image-placeholder" aria-hidden="true" />
        ) : null}

        {cards ? (
          <div className="service-detail-section__grid">
            {cards.map((card) => (
              <article
                className={[
                  "service-detail-section__card",
                  card.videoEmbed ? "service-detail-section__card--video" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={card.title}
              >
                {card.hasImagePlaceholder ? (
                  <div
                    className="service-detail-section__card-image-placeholder"
                    aria-hidden="true"
                  />
                ) : null}
                {card.videoEmbed ? (
                  <div className="service-detail-section__card-video">
                    <YouTubeCardEmbed {...card.videoEmbed} />
                  </div>
                ) : null}
                {card.iconSrc ? (
                  <img
                    className="service-detail-section__card-icon"
                    src={card.iconSrc}
                    alt={card.iconAlt ?? ""}
                    aria-hidden={card.iconAlt ? undefined : "true"}
                  />
                ) : null}
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        ) : null}
        {hasBottomDivider ? (
          <div className="service-detail-section__divider" aria-hidden="true" />
        ) : null}
      </div>
    </section>
  );
}
