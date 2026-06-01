import { Link } from "react-router-dom";
import { defaultCTAContent } from "../../content/cta";
import "./CTASection.css";

type CTASectionTheme = "light" | "dark";

type CTASectionProps = {
  title?: string;
  body?: string;
  buttonText?: string;
  buttonHref?: string;
  theme?: CTASectionTheme;
  reversed?: boolean;
};

export function CTASection({
  title = defaultCTAContent.title,
  body = defaultCTAContent.body,
  buttonText = defaultCTAContent.buttonText,
  buttonHref = defaultCTAContent.buttonHref,
  theme = "dark",
  reversed = false,
}: CTASectionProps) {
  const className = [
    "cta-section",
    `cta-section--${theme}`,
    reversed ? "cta-section--reversed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className}>
      <div className="cta-section__inner">
        <div className="cta-section__content">
          <h2 className="cta-section__title">{title}</h2>
          <p className="cta-section__body">{body}</p>
        </div>

        <div className="cta-section__action">
          <Link className="cta-section__button" to={buttonHref}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
