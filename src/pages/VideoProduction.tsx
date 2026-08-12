import { type ImgHTMLAttributes, useEffect, useRef } from "react";
import { CTASection } from "../components/CTASection/CTASection";
import animationIcon from "../assets/services/video/shs-services-video-animation.svg";
import colourGradingIcon from "../assets/services/video/shs-services-video-colour-grading.svg";
import editingIcon from "../assets/services/video/shs-services-video-editing.svg";
import filmingIcon from "../assets/services/video/shs-services-video-filming.svg";
import photographyIcon from "../assets/services/video/shs-services-video-photography.svg";
import preProductionIcon from "../assets/services/video/shs-services-video-pre-production.svg";
import { servicePageContent } from "../content/services";
import "./VideoProduction.css";

const heroVideoSrc = "";
const heroPosterSrc = "";

type ClientLogo = {
  name: string;
  src: string;
  alt: ImgHTMLAttributes<HTMLImageElement>["alt"];
};

const clientLogos: readonly ClientLogo[] = [];
const clientLogoPlaceholderCount = 8;

const processStages = [
  { title: "Strategy", detail: "We define the purpose, audience and outcome the content needs to achieve.", icon: animationIcon },
  { title: "Creative planning", detail: "We shape a creative route and format that brings the central idea to life.", icon: photographyIcon },
  { title: "Pre-production", detail: "We prepare the brief, locations, contributors and practical requirements for the shoot.", icon: preProductionIcon },
  { title: "Scheduling", detail: "We build a clear production schedule that keeps the people and moving parts aligned.", icon: preProductionIcon },
  { title: "Filming", detail: "We capture purposeful footage around the agreed creative and production plan.", icon: filmingIcon },
  { title: "Editing and post-production", detail: "We shape the narrative, picture, sound and finishing details into a polished film.", icon: editingIcon },
  { title: "Social media content creation", detail: "We create focused edits designed to work naturally across the relevant social channels.", icon: animationIcon },
  { title: "Output planning", detail: "We identify every required format and version before the final files are prepared.", icon: colourGradingIcon },
  { title: "Delivery", detail: "We supply approved files in the right specifications, ready for their intended use.", icon: editingIcon },
  { title: "Distribution", detail: "We confirm where each asset needs to go and support a smooth final handover.", icon: colourGradingIcon },
] as const;

const corporateOutputs = [
  "Internal communications",
  "Campaigns",
  "Social content",
  "Client-facing films",
  "Brand films",
  "Training content",
] as const;

function VideoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      videoRef.current?.pause();
    }
  }, []);

  if (!heroVideoSrc) {
    return (
      <div
        className="video-hero__placeholder"
        role="img"
        aria-label="Video production hero asset pending"
      >
        <span>Video to be supplied</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={heroPosterSrc || undefined}
      aria-label="Signal House Studios video production showreel"
    >
      <source src={heroVideoSrc} />
    </video>
  );
}

function ClientLogoItems({ duplicate = false }: { duplicate?: boolean }) {
  const hasClientLogos = clientLogos.length > 0;

  return (
    <ul
      className="client-logos__group"
      aria-label={duplicate || !hasClientLogos ? undefined : "Client logos"}
      aria-hidden={duplicate || !hasClientLogos ? "true" : undefined}
    >
      {hasClientLogos
        ? clientLogos.map((logo) => (
            <li className="client-logos__box" key={logo.name}>
              <img src={logo.src} alt={duplicate ? "" : logo.alt} />
            </li>
          ))
        : Array.from({ length: clientLogoPlaceholderCount }, (_, index) => (
            <li className="client-logos__box" key={index} />
          ))}
    </ul>
  );
}

export function VideoProduction() {
  const { videoProduction } = servicePageContent;

  return (
    <article className="content-page video-page">
      <section className="video-hero" aria-label="Video production hero">
        <div className="video-hero__media">
          <VideoHeroMedia />
          <div className="video-hero__shade" aria-hidden="true" />
        </div>
      </section>

      <section className="video-positioning" aria-labelledby="video-positioning-title">
        <div className="video-page__inner video-positioning__inner">
          <div className="video-positioning__content">
            <p className="video-page__eyebrow">Video Production</p>
            <h1 id="video-positioning-title">
              Strategy-led video production for brands, campaigns and content that needs to land.
            </h1>
            <p>
              Signal House Studios creates corporate films, music visuals, campaign content and
              short-form deliverables with a clear focus on story, audience and platform.
            </p>
          </div>
          <div
            className="video-positioning__image-placeholder"
            role="img"
            aria-label="Video production image to be supplied"
          />
        </div>
      </section>

      <section className="client-logos" aria-labelledby="client-logos-title">
        <div className="video-page__inner client-logos__inner">
          <h2 id="client-logos-title">Trusted by:</h2>
          {clientLogos.length === 0 ? (
            <p className="visually-hidden">Approved client logos are still to be supplied.</p>
          ) : null}
          <div className="client-logos__viewport" role="region" aria-label="Client logo ticker" tabIndex={0}>
            <div className="client-logos__track">
              <ClientLogoItems />
              <ClientLogoItems duplicate />
            </div>
          </div>
        </div>
      </section>

      <section className="video-team" aria-labelledby="video-team-title">
        <div className="video-page__inner video-page__split">
          <div
            className="video-team__image-placeholder"
            role="img"
            aria-label="Team photograph to be supplied"
          />
          <div className="video-page__copy">
            <p className="video-page__eyebrow">The team</p>
            <h2 id="video-team-title">The people behind the work.</h2>
            <p>
              Couple-owned and led by Tim and Annie, Signal House Studios brings a personal,
              collaborative approach to every production. Together, they combine creative thinking,
              technical expertise and a shared commitment to making work that connects with its
              audience.
            </p>
          </div>
        </div>
      </section>

      <section className="video-approach" aria-labelledby="video-approach-title">
        <div className="video-page__inner video-page__split video-page__split--reversed">
          <div
            className="video-approach__image-placeholder"
            role="img"
            aria-label="Approach photograph to be supplied"
          />
          <div className="video-page__copy">
            <p className="video-page__eyebrow">{videoProduction.approach.eyebrow}</p>
            <h2 id="video-approach-title">{videoProduction.approach.title}</h2>
            {videoProduction.approach.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="video-process" aria-labelledby="video-process-title">
        <div className="video-page__inner">
          <div className="video-page__section-heading">
            <p className="video-page__eyebrow">Process</p>
            <h2 id="video-process-title">From strategy to delivery.</h2>
          </div>
          <ul className="video-process__grid">
            {processStages.map((stage) => (
              <li key={stage.title}>
                <img src={stage.icon} alt="" aria-hidden="true" />
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="corporate-content" aria-labelledby="corporate-content-title">
        <div className="video-page__inner corporate-content__inner">
          <div className="video-page__copy">
            <p className="video-page__eyebrow">Corporate tailored</p>
            <h2 id="corporate-content-title">Corporate video does not need to feel generic.</h2>
            <p>
              The right edit, pacing, framing and sound design can transform a straightforward
              message into something considered, engaging and credible. By shaping each element
              around your audience and objectives, we create corporate content that feels polished
              and purposeful without losing the personality behind the organisation.
            </p>
          </div>
          <div className="corporate-content__formats">
            <h3 className="video-page__eyebrow">Content tailored to your brief</h3>
            <ul className="corporate-content__outputs">
              {corporateOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </article>
  );
}
