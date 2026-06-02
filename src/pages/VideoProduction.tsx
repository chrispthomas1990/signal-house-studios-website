import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { ServiceDetailSection } from "../components/ServiceDetailSection/ServiceDetailSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { servicePageContent } from "../content/services";
import { testimonials } from "../content/testimonials";

export function VideoProduction() {
  const { videoProduction } = servicePageContent;

  return (
    <article className="content-page">
      <HeroSection {...videoProduction.hero} />

      <ServiceDetailSection {...videoProduction.recentWork} />

      <ServiceDetailSection {...videoProduction.approach} />

      <ServiceDetailSection {...videoProduction.services} />

      <ServiceDetailSection {...videoProduction.corporateTailored} />

      <ServiceDetailSection {...videoProduction.clients} />

      <TestimonialCarousel testimonials={testimonials} />

      <CTASection />
    </article>
  );
}
