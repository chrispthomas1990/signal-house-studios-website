import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { servicePageContent } from "../content/services";

export function LiveStreaming() {
  return (
    <article className="content-page">
      <HeroSection {...servicePageContent.liveStreaming.hero} />

      <CTASection />
    </article>
  );
}
