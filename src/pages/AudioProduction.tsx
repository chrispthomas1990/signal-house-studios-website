import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { servicePageContent } from "../content/services";

export function AudioProduction() {
  return (
    <article className="content-page">
      <HeroSection {...servicePageContent.audioProduction.hero} />

      <CTASection />
    </article>
  );
}
