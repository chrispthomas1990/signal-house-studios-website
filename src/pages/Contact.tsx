import { siteInfo } from "../content/siteInfo";

export function Contact() {
  return (
    <section className="page-section">
      <p className="eyebrow">Contact</p>
      <h1>Let’s Talk</h1>
      <p>Page content will be added later.</p>

      <p>
        <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
      </p>
    </section>
  );
}