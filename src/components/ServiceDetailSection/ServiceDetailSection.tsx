import { useNearViewport } from "../../lib/useNearViewport";
import { responsiveImageSrcSet, sectionImageSizes, cardImageSizes } from "../../lib/responsiveImages";
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
  imagePosition?: string;
  iconSrc?: string;
  iconAlt?: string;
  videoEmbed?: ServiceDetailEmbed;
};

type ServiceDetailEmbed = {
  src: string;
  title: string;
};

type ServiceDetailSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string | readonly string[];
  serviceHeadings?: readonly string[];
  bulletPoints?: readonly string[];
  cards?: readonly ServiceDetailCard[];
  embed?: ServiceDetailEmbed;
  hasBottomDivider?: boolean;
  compactTopPadding?: boolean;
  hasImagePlaceholder?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  mediaOnLeft?: boolean;
  borderlessCards?: boolean;
  gridColumns?: 2 | 3;
  theme?: ServiceDetailSectionTheme;
};

function ServiceDetailCardEmbed({ src, title }: ServiceDetailEmbed) {
  const { ref: iframeRef, ready } = useNearViewport<HTMLIFrameElement>();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const provider = useMemo(() => getEmbedProvider(src), [src]);
  const iframeSrc = useMemo(
    () => (provider === "youtube" ? getApiEnabledYouTubeSrc(src) : src),
    [provider, src],
  );

  useEffect(() => {
    if (!ready || provider !== "youtube") {
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
  }, [provider, ready, iframeSrc, iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      src={ready ? iframeSrc : undefined}
      loading="lazy"
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

function DeferredEmbed({ src, title }: ServiceDetailEmbed) {
  const { ref, ready } = useNearViewport<HTMLIFrameElement>();
  return <iframe ref={ref} src={ready ? src : undefined} title={title} loading="lazy" allow="encrypted-media; fullscreen" />;
}

export function ServiceDetailSection({
  eyebrow,
  title,
  body,
  serviceHeadings,
  bulletPoints,
  cards,
  embed,
  hasBottomDivider = false,
  compactTopPadding = false,
  hasImagePlaceholder = false,
  imageSrc,
  imageAlt,
  imagePosition,
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
          {eyebrow ? <p className="service-detail-section__eyebrow">{eyebrow}</p> : null}
          {title ? <h2>{title}</h2> : null}
          {serviceHeadings?.map((heading) => (
            <h3 className="service-detail-section__service-heading" key={heading}>
              {heading}
            </h3>
          ))}
          {bodyParagraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {bulletPoints ? (
            <ul className="service-detail-section__bullet-points">
              {bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
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
            <DeferredEmbed {...embed} />
          </div>
        ) : null}

        {imageSrc ? (
          <div className="service-detail-section__image">
            <img
              src={imageSrc}
              srcSet={responsiveImageSrcSet(imageSrc)}
              sizes={sectionImageSizes}
              alt={imageAlt ?? ""}
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
              loading="lazy"
              decoding="async"
            />
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
                      srcSet={responsiveImageSrcSet(card.imageSrc)}
                      sizes={cardImageSizes}
                      alt={card.imageAlt ?? ""}
                      style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
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
