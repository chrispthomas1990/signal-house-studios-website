import "./ServiceDetailSection.css";

type ServiceDetailSectionTheme = "light" | "dark" | "grey";

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
  const className = [
    "service-detail-section",
    `service-detail-section--${theme}`,
    `service-detail-section--grid-${gridColumns}`,
    hasBottomDivider ? "service-detail-section--has-bottom-divider" : "",
    compactTopPadding ? "service-detail-section--compact-top" : "",
    borderlessCards ? "service-detail-section--borderless-cards" : "",
    embed || hasImagePlaceholder ? "service-detail-section--media-layout" : "",
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
                    <iframe
                      src={card.videoEmbed.src}
                      title={card.videoEmbed.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
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
