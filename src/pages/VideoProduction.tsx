import { type ImgHTMLAttributes, useEffect, useRef } from "react";
import { CTASection } from "../components/CTASection/CTASection";
import animationIcon from "../assets/icons/services/video/shs-services-video-animation.svg";
import editingIcon from "../assets/icons/services/video/shs-services-video-editing.svg";
import filmingIcon from "../assets/icons/services/video/shs-services-video-filming.svg";
import preProductionIcon from "../assets/icons/services/video/shs-services-video-pre-production.svg";
import creativePlanningIcon from "../assets/icons/services/video/shs-process-creative-planning.svg";
import deliveryIcon from "../assets/icons/services/video/shs-process-delivery.svg";
import distributionIcon from "../assets/icons/services/video/shs-process-distribution.svg";
import outputPlanningIcon from "../assets/icons/services/video/shs-process-output-planning.svg";
import schedulingIcon from "../assets/icons/services/video/shs-process-scheduling.svg";
import strategyIcon from "../assets/icons/services/video/shs-process-strategy.svg";
import avivaLogo from "../assets/images/client-logos/aviva-investors.svg";
import bellIntegrationLogo from "../assets/images/client-logos/bell-integration.svg";
import boultLogo from "../assets/images/client-logos/boult.svg";
import brainlabsLogo from "../assets/images/client-logos/brainlabs.svg";
import charlesTyrwhittLogo from "../assets/images/client-logos/charles-tyrwhitt.svg";
import cranborneAudioLogo from "../assets/images/client-logos/cranborne-audio.svg";
import kognityLogo from "../assets/images/client-logos/kognity.svg";
import lloydsBankingGroupLogo from "../assets/images/client-logos/lloyds-banking-group.svg";
import maitlandChambersLogo from "../assets/images/client-logos/maitland-chambers.svg";
import meysanLogo from "../assets/images/client-logos/meysan.svg";
import nikeLogo from "../assets/images/client-logos/nike.svg";
import rollsRoyceLogo from "../assets/images/client-logos/rolls-royce.svg";
import southeasternLogo from "../assets/images/client-logos/southeastern.svg";
import tjxLogo from "../assets/images/client-logos/tjx.svg";
import musicVideoBandImage from "../assets/images/projects/music-video/music-video-band-setup-edited.webp";
import lakeDistrictFilmingImage from "../assets/images/projects/lake-district/lake-district-filming-landscape-colour.webp";
import motorsportCameraRigImage from "../assets/images/projects/motorsport/motorsport-camera-rig.webp";
import teamImage from "../assets/images/team/team-portrait-annie-and-tim.webp";
import showreelVideo from "../assets/videos/shs-showreel-2160p.mp4";
import { servicePageContent } from "../content/services";
import "./VideoProduction.css";

const heroVideoSrc = showreelVideo;
const heroPosterSrc = musicVideoBandImage;

type ClientLogo = {
  name: string;
  src: string;
  alt: ImgHTMLAttributes<HTMLImageElement>["alt"];
};

const clientLogos: readonly ClientLogo[] = [
  { name: "Aviva Investors", src: avivaLogo, alt: "Aviva Investors" },
  { name: "Bell Integration", src: bellIntegrationLogo, alt: "Bell Integration" },
  { name: "Boult", src: boultLogo, alt: "Boult" },
  { name: "Brainlabs", src: brainlabsLogo, alt: "Brainlabs" },
  { name: "Charles Tyrwhitt", src: charlesTyrwhittLogo, alt: "Charles Tyrwhitt" },
  { name: "Cranborne Audio", src: cranborneAudioLogo, alt: "Cranborne Audio" },
  { name: "Kognity", src: kognityLogo, alt: "Kognity" },
  { name: "Lloyds Banking Group", src: lloydsBankingGroupLogo, alt: "Lloyds Banking Group" },
  { name: "Maitland Chambers", src: maitlandChambersLogo, alt: "Maitland Chambers" },
  { name: "Meysan", src: meysanLogo, alt: "Meysan" },
  { name: "Nike", src: nikeLogo, alt: "Nike" },
  { name: "Rolls-Royce", src: rollsRoyceLogo, alt: "Rolls-Royce" },
  { name: "Southeastern", src: southeasternLogo, alt: "Southeastern" },
  { name: "TJX", src: tjxLogo, alt: "TJX" },
];

const processStages = [
  { title: "Strategy", detail: "We define the purpose, audience and outcome the content needs to achieve.", icon: strategyIcon },
  { title: "Creative planning", detail: "We shape a creative route and format that brings the central idea to life.", icon: creativePlanningIcon },
  { title: "Pre-production", detail: "We prepare the brief, locations, contributors and practical requirements for the shoot.", icon: preProductionIcon },
  { title: "Scheduling", detail: "We build a clear production schedule that keeps the people and moving parts aligned.", icon: schedulingIcon },
  { title: "Filming", detail: "We capture purposeful footage around the agreed creative and production plan.", icon: filmingIcon },
  { title: "Editing and post-production", detail: "We shape the narrative, picture, sound and finishing details into a polished film.", icon: editingIcon },
  { title: "Social media content creation", detail: "We create focused edits designed to work naturally across the relevant social channels.", icon: animationIcon },
  { title: "Output planning", detail: "We identify every required format and version before the final files are prepared.", icon: outputPlanningIcon },
  { title: "Delivery", detail: "We supply approved files in the right specifications, ready for their intended use.", icon: deliveryIcon },
  { title: "Distribution", detail: "We confirm where each asset needs to go and support a smooth final handover.", icon: distributionIcon },
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
  return (
    <ul
      className="client-logos__group"
      aria-label={duplicate ? undefined : "Client logos"}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {clientLogos.map((logo) => (
        <li className="client-logos__box" key={logo.name}>
          <img src={logo.src} alt={duplicate ? "" : logo.alt} loading="lazy" decoding="async" />
        </li>
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
        </div>
      </section>

      <section className="video-positioning" aria-labelledby="video-positioning-title">
        <div className="video-page__inner video-positioning__inner">
          <div className="video-positioning__content">
            <p className="video-page__eyebrow">Video Production</p>
            <h1 id="video-positioning-title">
              Strategy-led video production from Signal House Studios.
            </h1>
            <p>
              Signal House Studios creates corporate films, music visuals, campaign content and
              short-form deliverables shaped around a clear purpose. From the first conversation,
              we consider the story, the audience and where the finished work will be seen, building
              the creative and production approach around those needs. The result is distinctive
              video content designed to communicate clearly and perform across every relevant
              platform.
            </p>
          </div>
          <div className="video-positioning__image">
            <img
              src={motorsportCameraRigImage}
              alt="Camera operator filming a motorsport production with a stabilised cinema rig"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="client-logos" aria-labelledby="client-logos-title">
        <div className="video-page__inner client-logos__inner">
          <h2 id="client-logos-title">Trusted by:</h2>
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
          <div className="video-team__image">
            <img
              src={teamImage}
              alt="Annie and Tim, the couple behind Signal House Studios"
              loading="lazy"
              decoding="async"
            />
          </div>
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
          <div className="video-approach__image">
            <img
              src={lakeDistrictFilmingImage}
              alt="Camera operator filming on location in the Lake District"
              loading="lazy"
              decoding="async"
            />
          </div>
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
