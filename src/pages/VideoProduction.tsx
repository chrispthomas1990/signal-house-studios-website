import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";

export function VideoProduction() {
  return (
    <article className="content-page">
      <HeroSection
        eyebrow="Video Production"
        title="Strategy-led films and content."
        body="For campaigns, corporate work and editorial content that needs more than a shoot day – the brief, audience and delivery are planned first."
        theme="light"
      />

      <CTASection />
    </article>
  );
}
