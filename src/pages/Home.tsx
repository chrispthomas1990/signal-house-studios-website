import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { ThreeCardSection } from "../components/ThreeCardSection/ThreeCardSection";
import { homePageContent } from "../content/home";
import { testimonials } from "../content/testimonials";

export function Home() {
  return (
    <article className="content-page">
      <HeroSection {...homePageContent.hero} />

      <ThreeCardSection {...homePageContent.services} />

      <HeroSection {...homePageContent.whySignalHouse} />

      <TestimonialCarousel testimonials={testimonials} />

      <CTASection />
    </article>
  );
}
