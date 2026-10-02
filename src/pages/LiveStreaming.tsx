import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { servicePageContent } from "../content/services";

export function LiveStreaming() {
  const { liveStreaming } = servicePageContent;

  return (
    <article className="content-page">
      <HeroSection {...liveStreaming.hero} />

      <ServiceDetailSection {...liveStreaming.approach} />

      <ServiceDetailSection {...liveStreaming.whyItMatters} mediaOnLeft />

      <ServiceDetailSection {...liveStreaming.typicalFormats} />

      <ServiceDetailSection {...liveStreaming.platformsAndDelivery} />

      <ServiceDetailSection {...liveStreaming.additionalSupport} mediaOnLeft />

      <CTASection theme="light" />
    </article>
  );
}
