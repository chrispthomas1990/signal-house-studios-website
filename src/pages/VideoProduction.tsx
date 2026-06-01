import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { servicePageContent } from "../content/services";

export function VideoProduction() {
  return (
    <article className="content-page">
      <HeroSection {...servicePageContent.videoProduction.hero} />

      <CTASection />
    </article>
  );
}
