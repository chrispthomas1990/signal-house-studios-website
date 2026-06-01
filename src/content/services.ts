import drumProgrammingIcon from "../assets/services/audio/shs-services-audio-drum-programming.svg";
import editingCompingIcon from "../assets/services/audio/shs-services-audio-editing-comping.svg";
import masteringIcon from "../assets/services/audio/shs-services-audio-mastering.svg";
import mixingIcon from "../assets/services/audio/shs-services-audio-mixing.svg";
import preProductionIcon from "../assets/services/audio/shs-services-audio-pre-production.svg";
import reAmpingIcon from "../assets/services/audio/shs-services-audio-re-amping.svg";
import trackingIcon from "../assets/services/audio/shs-services-audio-tracking.svg";

export const servicePageContent = {
  audioProduction: {
    hero: {
      eyebrow: "Audio Production",
      title: "Recording, production, mixing and mastering.",
      body: "For artists who want a focused studio process, strong creative direction and records that feel deliberate from the first take to the final master.",
      theme: "light",
    },
    audioShowreel: {
      eyebrow: "Audio showreel",
      title: "Recent productions with depth, detail and intent.",
      body: "Listen through a selection of recent productions from Signal House Studios, covering the sound, feel and finish of the studio’s audio work.",
      embed: {
        src: "https://embed.tidal.com/playlists/6ef56bda-2da3-431b-b083-651303e46c4b",
        title: "Signal House Studios TIDAL playlist",
      },
      hasBottomDivider: true,
      theme: "dark",
    },
    recentWork: {
      eyebrow: "Recent sessions",
      title: "Live sessions with studio-grade sound and visuals.",
      body: "Watch recent audio and video work from Signal House Studios, including live sessions shaped around strong performances, polished sound and clean visual delivery.",
      cards: [
        {
          title: "Harsh Language",
          body: "Engineering, mixing, videography",
          videoEmbed: {
            src: "https://www.youtube.com/embed/hPRJQFNQp0U?controls=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0",
            title: "Harsh Language - Imperial Bedrooms Live at Signal House Studios",
          },
        },
        {
          title: "Joseph Lofthouse",
          body: "Engineering, mixing, videography",
          videoEmbed: {
            src: "https://www.youtube.com/embed/UoFN2eAFQkk?controls=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0",
            title: "Signal House Sessions presents Joseph Lofthouse - London",
          },
        },
      ],
      gridColumns: 2,
      compactTopPadding: true,
      theme: "dark",
    },
    approach: {
      eyebrow: "The approach",
      title: "Built around the artist, the song and the right recording environment.",
      body: [
        "The aim is to help new and established artists create records that feel unique, focused and fully realised. Sessions are designed to make people feel comfortable, creative and ready to perform at their best.",
        "Depending on the project, tracking can happen at Signal House or across a range of suitable studios and spaces. That flexibility means the production can be shaped around budget, scale, instrumentation and the sound the record needs.",
      ],
      hasImagePlaceholder: true,
      theme: "light",
    },
    services: {
      eyebrow: "Services",
      title: "Production support from first idea to final master.",
      body: "Work with Signal House on a complete record, a focused mix, an individual vocal session, a re-amp pass, or the final polish before release.",
      cards: [
        {
          title: "Pre-production",
          body: "Shape the direction before recording starts. We can refine arrangements, references, tempo, tone and structure so the session has a clear creative target.",
          iconSrc: preProductionIcon,
        },
        {
          title: "Tracking",
          body: "Capture performances with the right room, microphones and signal chain for the project. Sessions can be built around the studio, or around other spaces when budget and requirements call for it.",
          iconSrc: trackingIcon,
        },
        {
          title: "Drum programming",
          body: "Program realistic, musical drum parts for demos, releases and productions where live drums are not the right fit.",
          iconSrc: drumProgrammingIcon,
        },
        {
          title: "Editing & comping",
          body: "Tighten performances, comp takes and correct timing or tuning issues while keeping the track feeling natural.",
          iconSrc: editingCompingIcon,
        },
        {
          title: "Re-amping",
          body: "Run guitar and bass tracks through boutique amps, cabs and carefully chosen microphones to replace flat DI tones with real movement and weight.",
          iconSrc: reAmpingIcon,
        },
        {
          title: "Mixing",
          body: "Balance, shape and finish productions through a hybrid workflow using analogue outboard, detailed monitoring and modern plug-ins.",
          iconSrc: mixingIcon,
        },
        {
          title: "Mastering",
          body: "Prepare finished mixes for streaming, radio, video, vinyl or release packages, including sequencing and metadata where needed.",
          iconSrc: masteringIcon,
        },
      ],
      theme: "dark",
    },
    studio: {
      eyebrow: "The studio",
      title: "Purpose-built spaces for tracking, production and longer creative days.",
      body: "Signal House combines treated recording spaces, a flexible control room, analogue outboard, a deep microphone collection and comfortable areas for writing and downtime.",
      cards: [
        {
          title: "Live room & vocal booth",
          body: "A large live room with an isolated vocal booth, independent stage boxes and adjustable acoustic panels for more reflective or absorptive tones.",
          hasImagePlaceholder: true,
        },
        {
          title: "Control room",
          body: "A central production space built around Cubase Pro, Universal Audio Apollo conversion, Adam Audio S3V monitoring and a wide choice of preamps and outboard.",
          hasImagePlaceholder: true,
        },
        {
          title: "Kitchen & lounge",
          body: "A comfortable upstairs space for writing, admin, breaks and longer sessions where artists need room to reset between takes.",
          hasImagePlaceholder: true,
        },
      ],
      borderlessCards: true,
      theme: "light",
    },
  },
  videoProduction: {
    hero: {
      eyebrow: "Video Production",
      title: "Strategy-led films and content.",
      body: "For campaigns, corporate work and editorial content that needs more than a shoot day – the brief, audience and delivery are planned first.",
      theme: "light",
    },
  },
  liveStreaming: {
    hero: {
      eyebrow: "Live Streaming",
      title: "Broadcasts, launches and hybrid events.",
      body: "For moments that need to reach people in real time with clean audio, stable delivery and a clear plan for scale, limitations and re-use.",
      theme: "light",
    },
  },
} as const;
