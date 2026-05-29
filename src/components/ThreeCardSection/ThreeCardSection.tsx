import { Link } from "react-router-dom";
import "./ThreeCardSection.css";

type ThreeCardSectionTheme = "light" | "dark";

type ThreeCard = {
  title: string;
  body: string;
  buttonText?: string;
  buttonHref?: string;
};

type ThreeCardSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  cards: [ThreeCard, ThreeCard, ThreeCard];
  theme?: ThreeCardSectionTheme;
  reversed?: boolean;
};

export function ThreeCardSection({
  eyebrow,
  title,
  body,
  cards,
  theme = "light",
  reversed = false,
}: ThreeCardSectionProps) {
  const className = [
    "three-card-section",
    `three-card-section--${theme}`,
    reversed ? "three-card-section--reversed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className}>
      <div className="three-card-section__inner">
        <div className="three-card-section__intro">
          <p className="three-card-section__eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>

        <div className="three-card-section__grid">
          {cards.map((card) => (
            <article className="three-card-section__card" key={card.title}>
              <h3 className="three-card-section__card-title">{card.title}</h3>
              <p className="three-card-section__card-body">{card.body}</p>
              {card.buttonText && card.buttonHref ? (
                <Link className="three-card-section__card-button" to={card.buttonHref}>
                  {card.buttonText}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
