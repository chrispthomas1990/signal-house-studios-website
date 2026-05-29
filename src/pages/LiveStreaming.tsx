import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";

export function LiveStreaming() {
  return (
    <article className="content-page">
      <HeroSection
        eyebrow="Live Streaming"
        title="Broadcasts, launches and hybrid events."
        body="For moments that need to reach people in real time with clean audio, stable delivery and a clear plan for scale, limitations and re-use."
        theme="light"
      />

      <CTASection />
    </article>
  );
}
