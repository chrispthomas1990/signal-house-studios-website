import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { servicePageContent } from "../content/services";

export function LiveStreaming() {
  const { liveStreaming } = servicePageContent;

  return (
    <article className="content-page">
      <HeroSection {...liveStreaming.hero} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.approach} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.whyItMatters} titleClassName="section-title--larger" mediaOnLeft />

      <ServiceDetailSection {...liveStreaming.typicalFormats} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.platformsAndDelivery} titleClassName="section-title--larger" />

      <ServiceDetailSection {...liveStreaming.additionalSupport} mediaOnLeft />

      <CTASection theme="light" />
    </article>
  );
}
