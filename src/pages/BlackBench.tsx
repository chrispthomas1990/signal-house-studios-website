import { Link } from "react-router-dom";
import "./BlackBench.css";

export function BlackBench() {
  return (
    <article className="content-page black-bench-page">
      <section className="black-bench-page__hero">
        <div className="black-bench-page__inner">
          <p className="black-bench-page__eyebrow">Black Bench</p>
          <h1>More information is being prepared.</h1>
          <p>
            Final Black Bench content and imagery have not yet been supplied. This page is ready to
            be updated when the approved material is available.
          </p>
          <Link className="content-page__button" to="/contact">
            Contact the studio
          </Link>
        </div>
      </section>
    </article>
  );
}
