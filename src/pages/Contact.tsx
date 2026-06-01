import { ContactForm } from "../components/ContactForm/ContactForm";
import { contactPageContent } from "../content/contact";

export function Contact() {
  return (
    <article className="content-page contact-page">
      <section className="content-page__section contact-section">
        <div className="content-page__section-copy">
          <p className="content-page__eyebrow">{contactPageContent.eyebrow}</p>
          <h1>{contactPageContent.title}</h1>
          {contactPageContent.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ContactForm />
      </section>
    </article>
  );
}
