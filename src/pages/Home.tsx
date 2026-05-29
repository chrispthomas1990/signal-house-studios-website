import { CTASection } from "../components/CTASection/CTASection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { ThreeCardSection } from "../components/ThreeCardSection/ThreeCardSection";

export function Home() {
  return (
    <article className="content-page">
      <HeroSection
        eyebrow="Signal House Studios"
        title="Creative production for audio, video and live broadcast work."
        body="A Hertfordshire-based production studio creating audio, video and live streaming content for artists, brands and events."
        theme="light"
      />

      <ThreeCardSection
        eyebrow="What we do"
        title="Three core production services under one studio-led process."
        body="Signal House Studios supports projects from early planning through to delivery, with each service shaped around the brief, audience and final output."
        cards={[
          {
            title: "Audio Production",
            body: "Recording, production, mixing and mastering for artists who want a focused studio process.",
            buttonText: "Read more",
            buttonHref: "/audio-production",
          },
          {
            title: "Video Production",
            body: "Strategy-led films and content for campaigns, businesses, artists and editorial projects.",
            buttonText: "Read more",
            buttonHref: "/video-production",
          },
          {
            title: "Live Streaming",
            body: "Broadcast planning and delivery for launches, performances, panels and hybrid events.",
            buttonText: "Read more",
            buttonHref: "/live-streaming",
          },
        ]}
        theme="dark"
      />

      <HeroSection
        eyebrow="Why Signal House"
        title="Flexible enough for small projects, structured enough for larger briefs."
        body="Signal House is built to handle a wide range of production needs without overcomplicating the process. Smaller projects get the same care and attention as larger briefs, while more complex jobs benefit from a structured approach that keeps planning, production and delivery clear."
        headingLevel="h2"
        theme="light"
        reversed
      />

      <TestimonialCarousel
        testimonials={[
          {
            name: "The Zipheads",
            quote:
              "We have worked with Tim for over 7 years, using him for every recording since our second album. The new studio is incredible, with fantastic live room facilities and high-quality audio and video production.",
          },
          {
            name: "Nicholas Scott",
            quote:
              "Signal House has been my go-to recording studio for 3–4 years. The live room sounds great, the setup is comfortable and well-equipped, and Tim always helps get the best possible sound.",
          },
          {
            name: "Ashley Clark (SMB)",
            quote:
              "Tim is great and very welcoming. The venue is incredible, with plenty of room in the live room and a great recreation area to relax in. It was a pleasure from start to finish.",
          },
        ]}
      />

      <CTASection />
    </article>
  );
}
