import { CTASection } from "../components/CTASection/CTASection";
import { VideoHeroMedia } from "../components/VideoHeroMedia/VideoHeroMedia";
import audioHeroVideo from "../assets/videos/shs-audio-landing-ultrawide-21x9.mp4";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { servicePageContent } from "../content/services";
import { testimonials } from "../content/testimonials";
import { ScrollCue } from "../components/ScrollCue/ScrollCue";

export function AudioProduction() {
  const { audioProduction } = servicePageContent;

  return (
    <article className="content-page">
      <section className="video-hero" aria-label="Audio production hero">
        <h1 className="visually-hidden">Audio Production</h1>
        <div className="video-hero__media video-hero__media--ultrawide">
          <VideoHeroMedia
            videoSrc={audioHeroVideo}
            label="Signal House Studios audio production showreel"
          />
        </div>
      </section>

      <ScrollCue targetId="audio-showreel" label="Scroll to audio showreel" dark />

      <div id="audio-showreel">
        <ServiceDetailSection {...audioProduction.audioShowreel} titleClassName="section-title--larger" />
      </div>

      <ServiceDetailSection {...audioProduction.approach} titleClassName="section-title--larger" />

      <ServiceDetailSection {...audioProduction.services} titleClassName="section-title--larger" />

      <ServiceDetailSection {...audioProduction.studio} titleClassName="section-title--larger" />

      <TestimonialCarousel testimonials={testimonials} />

      <CTASection />
    </article>
  );
}
