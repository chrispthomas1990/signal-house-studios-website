import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { servicePageContent } from "../content/services";
import { testimonials } from "../content/testimonials";

export function AudioProduction() {
  const { audioProduction } = servicePageContent;

  return (
    <article className="content-page">
      <HeroSection {...audioProduction.hero} />

      <ServiceDetailSection {...audioProduction.audioShowreel} />

      <ServiceDetailSection {...audioProduction.approach} />

      <ServiceDetailSection {...audioProduction.services} />

      <ServiceDetailSection {...audioProduction.studio} />

      <TestimonialCarousel testimonials={testimonials} />

      <CTASection />
    </article>
  );
}
