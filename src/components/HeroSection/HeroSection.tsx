import "./HeroSection.css";

type HeroSectionTheme = "light" | "dark";
type HeroSectionHeadingLevel = "h1" | "h2";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  headingLevel?: HeroSectionHeadingLevel;
  theme?: HeroSectionTheme;
  reversed?: boolean;
};

export function HeroSection({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  headingLevel = "h1",
  theme = "light",
  reversed = false,
}: HeroSectionProps) {
  const className = [
    "hero-section",
    `hero-section--${theme}`,
    reversed ? "hero-section--reversed" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const Heading = headingLevel;

  return (
    <section className={className}>
      <div className="hero-section__inner">
        <div className="hero-section__image">
          {imageSrc ? <img src={imageSrc} alt={imageAlt ?? ""} /> : null}
        </div>

        <div className="hero-section__content">
          <p className="hero-section__eyebrow">{eyebrow}</p>
          <Heading className="hero-section__title">{title}</Heading>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
