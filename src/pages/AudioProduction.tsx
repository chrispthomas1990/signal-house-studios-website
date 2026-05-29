import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";

export function AudioProduction() {
  return (
    <article className="content-page">
      <HeroSection
        eyebrow="Audio Production"
        title="Recording, production, mixing and mastering."
        body="For artists who want a focused studio process, strong creative direction and records that feel deliberate from the first take to the final master."
        theme="light"
      />

      <CTASection />
    </article>
  );
}
