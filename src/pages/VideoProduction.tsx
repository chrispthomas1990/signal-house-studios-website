import { responsiveImageSrcSet, sectionImageSizes } from "../lib/responsiveImages";
import { CTASection } from "../components/CTASection/CTASection";
import { ClientLogoTicker } from "../components/ClientLogoTicker/ClientLogoTicker";
import { VideoHeroMedia } from "../components/VideoHeroMedia/VideoHeroMedia";
import videoProductionCameraRigImage from "../assets/images/pages/video/video-production-camera-rig.webp";
import teamImage from "../assets/images/pages/video/signal-house-studios-team.webp";
import { ScrollCue } from "../components/ScrollCue/ScrollCue";
import { videoServiceGroups } from "./videoServices";
import "./VideoProduction.css";

export function VideoProduction() {

  return (
    <article className="content-page video-page">
      <section className="video-hero" aria-label="Video production hero">
        <h1 className="visually-hidden">Video Production</h1>
        <div className="video-hero__media">
          <VideoHeroMedia />
        </div>
      </section>

      <ScrollCue targetId="client-logos" label="Scroll to trusted clients" />

      <section id="client-logos" className="client-logos" aria-labelledby="client-logos-title">
        <div className="video-page__inner client-logos__inner">
          <p id="client-logos-title" className="client-logos__title">Trusted by:</p>
          <ClientLogoTicker />
        </div>
      </section>

      <section className="video-team" aria-labelledby="video-team-title">
        <div className="video-page__inner video-page__split">
          <div className="video-team__image">
            <img
              src={teamImage}
              srcSet={responsiveImageSrcSet(teamImage)}
              sizes={sectionImageSizes}
              alt="Annie and Tim, the couple behind Signal House Studios"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="video-page__copy">
            <p className="video-page__eyebrow">The team</p>
            <h2 id="video-team-title" className="section-title--larger">
              <strong>Two Sides of the Same Studio.</strong>
            </h2>
            <p>
              We share the same vision, standards, and work ethic—but the magic happens in how our
              individual skill sets cross paths.
            </p>
            <p>
              <strong>Tim</strong> brings technical ambition grounded in real-world execution. With a
              background in engineering, project management, and production, he’s built to push
              creative boundaries while keeping high-stakes projects running seamlessly.
            </p>
            <p>
              <strong>Annie</strong> grounds the work in story, aesthetic, and meticulous detail.
              Drawing on her experience in product development, studio photography and interiors,
              she excels at capturing the true character of people and places, ensuring every frame
              feels intentional.
            </p>
          </div>
        </div>
      </section>

      <section className="video-positioning" aria-labelledby="video-positioning-title">
        <div className="video-page__inner video-positioning__inner">
          <div className="video-positioning__content">
            <p className="video-page__eyebrow">The Approach</p>
            <h2 id="video-positioning-title" className="section-title--larger">
              Built for Impact, Not Just Aesthetics.
            </h2>
            <p>
              High-performing video starts long before the light hits the lens. We align on
              strategy, message, and multi-channel delivery up front, ensuring the entire
              production is driven by a clear objective.
            </p>
            <div className="video-positioning__point">
              <h3>
                <span className="video-positioning__number" aria-hidden="true">01</span>
                <span className="video-positioning__subtitle">Flexible Scale</span>
              </h3>
              <p>
                From lean small-scale creative sessions to full-scale studio productions, our
                approach adapts to fit your project perfectly.
              </p>
            </div>
            <div className="video-positioning__point">
              <h3>
                <span className="video-positioning__number" aria-hidden="true">02</span>
                <span className="video-positioning__subtitle">Clear Structure</span>
              </h3>
              <p>
                No guesswork or chaotic workflows. We keep planning, production, and final delivery
                clear and on schedule.
              </p>
            </div>
            <div className="video-positioning__point">
              <h3>
                <span className="video-positioning__number" aria-hidden="true">03</span>
                <span className="video-positioning__subtitle">End-to-End Process</span>
              </h3>
              <p>
                Every brief, regardless of size, gets the same attention to detail, precision
                engineering, and creative focus.
              </p>
            </div>
          </div>
          <div className="video-positioning__image">
            <img
              src={videoProductionCameraRigImage}
              srcSet={responsiveImageSrcSet(videoProductionCameraRigImage)}
              sizes={sectionImageSizes}
              alt="Camera operator filming a motorsport production with a stabilised cinema rig"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="video-services" aria-labelledby="video-services-title">
        <div className="video-page__inner">
          <div className="video-page__section-heading">
            <p className="video-page__eyebrow">Services</p>
            <h2 id="video-services-title" className="section-title--larger">From strategy to delivery.</h2>
          </div>
          <div className="video-services__groups">
            {videoServiceGroups.map((group) => (
              <div className="video-services__group" key={group.title}>
                <h3 className="video-services__group-title">
                  {group.title}
                </h3>
                <ul>
                  {group.services.map((service) => (
                    <li key={service.title}>
                      <img src={service.icon} alt="" aria-hidden="true" />
                      <p>{service.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection theme="light" />
    </article>
  );
}
