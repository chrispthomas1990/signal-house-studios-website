import { CTASection } from "../components/CTASection/CTASection";
import { VideoHeroMedia } from "../components/VideoHeroMedia/VideoHeroMedia";
import liveStreamingHeroVideo from "../assets/videos/shs-live-streaming-landing-ultrawide-21x9.mp4";
import liveStreamingMobileHeroVideo from "../assets/videos/shs-live-streaming-landing-portrait-4x5.mp4";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { servicePageContent } from "../content/services";
import { ScrollCue } from "../components/ScrollCue/ScrollCue";

export function LiveStreaming() {
  const { liveStreaming } = servicePageContent;

  return (
    <article className="content-page">
      <section className="video-hero" aria-label="Live streaming hero">
        <h1 className="visually-hidden">Live Streaming</h1>
        <div className="video-hero__media">
          <VideoHeroMedia
            videoSrc={liveStreamingHeroVideo}
            mobileVideoSrc={liveStreamingMobileHeroVideo}
            label="Signal House Studios live streaming showreel"
          />
        </div>
      </section>

      <ScrollCue targetId="live-streaming-approach" label="Scroll to live streaming approach" dark />

      <div id="live-streaming-approach">
        <ServiceDetailSection {...liveStreaming.approach} titleClassName="section-title--larger" />
      </div>

      <ServiceDetailSection {...liveStreaming.whyItMatters} titleClassName="section-title--larger" mediaOnLeft />

      <ServiceDetailSection {...liveStreaming.typicalFormats} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.platformsAndDelivery} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.additionalSupport} mediaOnLeft />

      <CTASection theme="light" />
    </article>
  );
}
