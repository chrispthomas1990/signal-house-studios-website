import comingSoonImage from "../assets/images/black-bench/black-bench-coming-soon.webp";
import "./BlackBench.css";

export function BlackBench() {
  return (
    <article className="content-page black-bench-page">
      <h1 className="visually-hidden">Black Bench: Stories of the Makers</h1>
      <img
        className="black-bench-page__placeholder"
        src={comingSoonImage}
        alt="Black Bench: Stories of the Makers. Coming soon."
        width="1000"
        height="1500"
      />
    </article>
  );
}
