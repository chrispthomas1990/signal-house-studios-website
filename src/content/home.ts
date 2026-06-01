export const homePageContent = {
  hero: {
    eyebrow: "Signal House Studios",
    title: "Creative production for audio, video and live broadcast work.",
    body: "A Hertfordshire-based production studio creating audio, video and live streaming content for artists, brands and events.",
    theme: "light",
  },
  services: {
    eyebrow: "What we do",
    title: "Three core production services under one studio-led process.",
    body: "Signal House Studios supports projects from early planning through to delivery, with each service shaped around the brief, audience and final output.",
    cards: [
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
    ],
    theme: "dark",
  },
  whySignalHouse: {
    eyebrow: "Why Signal House",
    title: "Flexible enough for small projects, structured enough for larger briefs.",
    body: "Signal House is built to handle a wide range of production needs without overcomplicating the process. Smaller projects get the same care and attention as larger briefs, while more complex jobs benefit from a structured approach that keeps planning, production and delivery clear.",
    headingLevel: "h2",
    theme: "light",
    reversed: true,
  },
} as const;
