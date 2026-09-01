import { useEffect, useMemo, useRef } from "react";
import {
  getApiEnabledYouTubeSrc,
  loadYouTubeIframeApi,
  type YouTubePlayer,
} from "../../lib/youtubeIframeApi";
import "./ServiceDetailSection.css";

type ServiceDetailSectionTheme = "light" | "dark" | "grey";

const activeYouTubePlayers = new Set<YouTubePlayer>();

function getEmbedProvider(src: string) {
  const hostname = new URL(src).hostname;

  if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
    return "youtube";
  }

  if (hostname.includes("tidal.com")) {
    return "tidal";
  }

  if (hostname.includes("vimeo.com")) {
    return "vimeo";
  }

  return "default";
}

type ServiceDetailCard = {
  title: string;
  body: string;
  hideCopy?: boolean;
  hasImagePlaceholder?: boolean;
  imageSrc?: string;
  imageAlt?: string;
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
  imageSrc?: string;
  imageAlt?: string;
  mediaOnLeft?: boolean;
  borderlessCards?: boolean;
  gridColumns?: 2 | 3;
  theme?: ServiceDetailSectionTheme;
};

function ServiceDetailCardEmbed({ src, title }: ServiceDetailEmbed) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const provider = useMemo(() => getEmbedProvider(src), [src]);
  const iframeSrc = useMemo(
    () => (provider === "youtube" ? getApiEnabledYouTubeSrc(src) : src),
    [provider, src],
  );

  useEffect(() => {
    if (provider !== "youtube") {
      return;
    }

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
    }).catch(() => {
      // The iframe remains usable even when API-based player coordination is unavailable.
    });

    return () => {
      isMounted = false;

      if (playerRef.current) {
        activeYouTubePlayers.delete(playerRef.current);
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [provider]);

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      title={title}
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
  imageSrc,
  imageAlt,
  mediaOnLeft = false,
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
    embed || hasImagePlaceholder || imageSrc ? "service-detail-section--media-layout" : "",
    mediaOnLeft ? "service-detail-section--media-left" : "",
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
          <div
            className={[
              "service-detail-section__embed",
              `service-detail-section__embed--${getEmbedProvider(embed.src)}`,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <iframe
              src={embed.src}
              title={embed.title}
              allow="encrypted-media; fullscreen"
            />
          </div>
        ) : null}

        {imageSrc ? (
          <div className="service-detail-section__image">
            <img src={imageSrc} alt={imageAlt ?? ""} loading="lazy" decoding="async" />
          </div>
        ) : hasImagePlaceholder ? (
          <div className="service-detail-section__image-placeholder" aria-hidden="true" />
        ) : null}

        {cards ? (
          <div className="service-detail-section__grid">
            {cards.map((card) => (
              <article
                className={[
                  "service-detail-section__card",
                  card.videoEmbed ? "service-detail-section__card--video" : "",
                  card.hideCopy ? "service-detail-section__card--image-only" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={card.title}
                aria-label={card.hideCopy ? card.title : undefined}
              >
                {card.imageSrc ? (
                  <div className="service-detail-section__card-image">
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : card.hasImagePlaceholder ? (
                  <div
                    className="service-detail-section__card-image-placeholder"
                    aria-hidden="true"
                  />
                ) : null}
                {card.videoEmbed ? (
                  <div className="service-detail-section__card-video">
                    <ServiceDetailCardEmbed {...card.videoEmbed} />
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
                {card.hideCopy ? null : (
                  <>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </>
                )}
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
