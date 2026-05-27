import { siteInfo } from "../content/siteInfo";

export function Contact() {
  return (
    <section className="page-section">
      <h1>Let’s Talk</h1>
      <p className="page-section__contact">
        <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
      </p>
    </section>
  );
}
