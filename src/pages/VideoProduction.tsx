import { CTASection } from "../components/CTASection/CTASection";
import { ClientLogoTicker } from "../components/ClientLogoTicker/ClientLogoTicker";
import { VideoHeroMedia } from "../components/VideoHeroMedia/VideoHeroMedia";
import animationIcon from "../assets/icons/services/video/shs-services-video-animation.svg";
import editingIcon from "../assets/icons/services/video/shs-services-video-editing.svg";
import filmingIcon from "../assets/icons/services/video/shs-services-video-filming.svg";
import preProductionIcon from "../assets/icons/services/video/shs-services-video-pre-production.svg";
import creativePlanningIcon from "../assets/icons/services/video/shs-services-video-creative-planning.svg";
import deliveryIcon from "../assets/icons/services/video/shs-services-video-delivery.svg";
import distributionIcon from "../assets/icons/services/video/shs-services-video-distribution.svg";
import outputPlanningIcon from "../assets/icons/services/video/shs-services-video-output-planning.svg";
import schedulingIcon from "../assets/icons/services/video/shs-services-video-scheduling.svg";
import strategyIcon from "../assets/icons/services/video/shs-services-video-strategy.svg";
import lakeDistrictFilmingImage from "../assets/images/projects/lake-district/lake-district-filming-landscape-colour.webp";
import motorsportCameraRigImage from "../assets/images/projects/motorsport/motorsport-camera-rig.webp";
import teamImage from "../assets/images/team/team-portrait-annie-and-tim.webp";
import { servicePageContent } from "../content/services";
import "./VideoProduction.css";

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

export function VideoProduction() {
  const { videoProduction } = servicePageContent;

  return (
    <article className="content-page video-page">
      <section className="video-hero" aria-label="Video production hero">
        <div className="video-hero__media">
          <VideoHeroMedia />
        </div>
      </section>

      <section className="client-logos" aria-labelledby="client-logos-title">
        <div className="video-page__inner client-logos__inner">
          <p id="client-logos-title" className="client-logos__title">Trusted by:</p>
          <ClientLogoTicker />
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
