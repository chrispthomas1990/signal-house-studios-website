import type { LegalPageContent } from "../content/legal";

type LegalPageProps = {
  content: LegalPageContent;
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <article className="content-page">
      <section className="content-page__section">
        <div className="content-page__section-copy">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>

          {content.sections.map((section) => (
            <section className="content-page__section-copy" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
