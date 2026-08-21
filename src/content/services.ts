import preProductionIcon from "../assets/icons/services/audio/shs-services-audio-pre-production.svg";
import trackingIcon from "../assets/icons/services/audio/shs-services-audio-tracking.svg";
import editingCompingIcon from "../assets/icons/services/audio/shs-services-audio-editing-comping.svg";
import reAmpingIcon from "../assets/icons/services/audio/shs-services-audio-re-amping.svg";
import mixingIcon from "../assets/icons/services/audio/shs-services-audio-mixing.svg";
import masteringIcon from "../assets/icons/services/audio/shs-services-audio-mastering.svg";
import videoAnimationIcon from "../assets/icons/services/video/shs-services-video-animation.svg";
import videoColourGradingIcon from "../assets/icons/services/video/shs-services-video-colour-grading.svg";
import videoDroneOperationIcon from "../assets/icons/services/video/shs-services-video-drone-operation.svg";
import videoEditingIcon from "../assets/icons/services/video/shs-services-video-editing.svg";
import videoFilmingIcon from "../assets/icons/services/video/shs-services-video-filming.svg";
import videoPhotographyIcon from "../assets/icons/services/video/shs-services-video-photography.svg";
import videoPreProductionIcon from "../assets/icons/services/video/shs-services-video-pre-production.svg";
import liveHybridEventsIcon from "../assets/icons/services/live/shs-services-live-hybrid-events.svg";
import liveInternalCommsIcon from "../assets/icons/services/live/shs-services-live-internal-comms.svg";
import liveLaunchesIcon from "../assets/icons/services/live/shs-services-live-launches.svg";
import livePanelsIcon from "../assets/icons/services/live/shs-services-live-panels.svg";
import livePerformancesIcon from "../assets/icons/services/live/shs-services-live-performances.svg";
import liveTrainingIcon from "../assets/icons/services/live/shs-services-live-training.svg";

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
      mediaOnLeft: true,
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
      title: "Strategy-led video production for brands, campaigns and content that needs to land.",
      body: "Signal House Studios creates corporate films, music visuals, campaign content and short form deliverables with a clear focus on story, audience and platform.",
      theme: "light",
    },
    recentWork: {
      eyebrow: "Video showreel",
      title: "Selected clients and campaigns.",
      cards: [
        {
          title: "LBG",
          body: "Tech Transformations",
          videoEmbed: {
            src: "https://player.vimeo.com/video/719858014?h=d7cd956213&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "LBG - Tech Transformations",
          },
        },
        {
          title: "Newton",
          body: "My Unexpected Journey",
          videoEmbed: {
            src: "https://player.vimeo.com/video/681820522?h=7969bef0c7&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "Newton - My Unexpected Journey",
          },
        },
        {
          title: "UKCSD",
          body: "Scent Dog Training Academy",
          videoEmbed: {
            src: "https://player.vimeo.com/video/656592122?h=301c04fe8e&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "UKCSD - Scent Dog Training Academy",
          },
        },
        {
          title: "Aviva",
          body: "Apprentice Careers Campaign",
          videoEmbed: {
            src: "https://player.vimeo.com/video/666117043?h=85fc2b3ea4&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "Aviva - Apprentice Careers Campaign",
          },
        },
        {
          title: "TJX",
          body: "Early Careers",
          videoEmbed: {
            src: "https://player.vimeo.com/video/742857918?h=613f526c7c&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "TJX - Early Careers",
          },
        },
        {
          title: "Let Golf",
          body: "Womens Qualifiers",
          videoEmbed: {
            src: "https://player.vimeo.com/video/615908117?h=aaa41b8359&loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media",
            title: "LET Golf - Womens Qualifiers",
          },
        },
      ],
      gridColumns: 2,
      compactTopPadding: true,
      theme: "dark",
    },
    approach: {
      eyebrow: "The approach",
      title: "Shape the message first, then build the shoot around what the film needs to do.",
      body: [
        "Strong video starts before anyone picks up a camera. We help define the audience, message, format and delivery plan first, so the shoot has a clear purpose and every setup is tied to the final output.",
        "That approach keeps the work useful after the shoot day. Interviews, cutdowns, social edits, campaign films and internal content can all be planned together, giving the footage more range without losing focus.",
      ],
      hasImagePlaceholder: true,
      theme: "light",
    },
    services: {
      eyebrow: "Services",
      title: "Video production support from strategy to final delivery.",
      cards: [
        {
          title: "Pre-production",
          body: "Define the message, audience, deliverables and schedule before cameras roll so the content is built around the goal, not just the shoot day.",
          iconSrc: videoPreProductionIcon,
        },
        {
          title: "Filming",
          body: "Capture interviews, corporate stories, music visuals, event content and promotional films with a cinematic but efficient production workflow.",
          iconSrc: videoFilmingIcon,
        },
        {
          title: "Editing",
          body: "Shape a strong narrative, build cutdowns and version content for different platforms without losing clarity or impact.",
          iconSrc: videoEditingIcon,
        },
        {
          title: "Colour grading",
          body: "Finish with a consistent grade that supports the mood, the brand and the intended platform, from clean corporate looks to more stylised finishes.",
          iconSrc: videoColourGradingIcon,
        },
        {
          title: "Drone operation",
          body: "Add aerial shots where they genuinely elevate the film and help the viewer understand scale, location or movement.",
          iconSrc: videoDroneOperationIcon,
        },
        {
          title: "Animation",
          body: "Create motion graphics, titles, captions and simple animated elements to support the story and improve accessibility.",
          iconSrc: videoAnimationIcon,
        },
        {
          title: "Photography",
          body: "Capture stills, BTS, headshots or product imagery alongside the moving image work for a joined-up content package.",
          iconSrc: videoPhotographyIcon,
        },
      ],
      theme: "dark",
    },
    corporateTailored: {
      eyebrow: "Corporate tailored",
      title: "Tailored for internal comms, campaigns, socials and client-facing content.",
      body: [
        "A corporate film does not need to feel generic. The right edit, pacing, framing and sound design can make the message feel far more considered and credible.",
        "We can adapt the process around the brief, whether the output is a polished brand film, a series of social assets, a training piece or a more cinematic campaign.",
      ],
      theme: "light",
    },
    clients: {
      eyebrow: "Our clients",
      title: "Trusted by brands, agencies and organisations with messages that need to land clearly.",
      hasImagePlaceholder: true,
      theme: "dark",
    },
  },
  liveStreaming: {
    hero: {
      eyebrow: "Live Streaming",
      title: "Live streaming for launches, performances and events that need to reach people in real time.",
      body: "Signal House Studios plans and delivers live broadcasts with a focus on clarity, stability and a result that still works after the stream ends.",
      theme: "light",
    },
    approach: {
      eyebrow: "The approach",
      title: "The stream should feel simple for the audience and tightly managed behind the scenes.",
      body: [
        "Live content needs more than a camera and a platform. The broadcast needs a clear technical route, a run of show, audio that actually carries the message and enough rehearsal time to remove unnecessary stress from the day.",
        "We are also direct about scale and limitations. A one-camera stream, a multi-camera production and a hybrid event all demand different levels of crew, connection, monitoring and backup planning, so the right setup depends on the venue, budget and delivery requirement.",
      ],
      hasImagePlaceholder: true,
      theme: "dark",
    },
    whyItMatters: {
      eyebrow: "Why it matters",
      title: "A good live stream gives your message reach without losing the immediacy of the room.",
      body: [
        "It is useful when the people who matter most cannot all be in one place, or when the event needs to create urgency and engagement in the moment.",
        "The same session can often be repurposed into clips, highlights or an on-demand replay if the production is planned to capture both the live and the edit-friendly versions of the content.",
      ],
      theme: "light",
    },
    typicalFormats: {
      eyebrow: "Typical formats",
      title: "Built to support lean streams, structured broadcasts and hybrid event delivery.",
      cards: [
        {
          title: "Launches and announcements",
          body: "Useful when a brand wants a clear live moment with a focused message, audience interaction and a replay that still works after the broadcast.",
          iconSrc: liveLaunchesIcon,
        },
        {
          title: "Live performances",
          body: "Suitable for sets, acoustic sessions, DJ streams and other performance-led formats where the audience needs to feel present even when they are remote.",
          iconSrc: livePerformancesIcon,
        },
        {
          title: "Panels and Q&As",
          body: "Works well for discussions that need structure, moderation and cleaner technical handling than a basic video call can usually give.",
          iconSrc: livePanelsIcon,
        },
        {
          title: "Training and webinars",
          body: "A good fit for educational content, internal sessions and presentations that need to be delivered clearly and recorded for later use.",
          iconSrc: liveTrainingIcon,
        },
        {
          title: "Hybrid events",
          body: "Connect the room and the remote audience with a broadcast that is designed around both experiences instead of treating the stream as an afterthought.",
          iconSrc: liveHybridEventsIcon,
        },
        {
          title: "Internal comms",
          body: "Useful for company updates, town halls and leadership messages that need a stable, professional delivery across teams or locations.",
          iconSrc: liveInternalCommsIcon,
        },
      ],
      theme: "dark",
    },
    platformsAndDelivery: {
      eyebrow: "Platforms and delivery",
      title: "We can stream to public or private platforms and shape the output around the event.",
      body: [
        "Depending on the brief, the stream can be configured for YouTube Live, Vimeo, Zoom, Teams or a private RTMP destination. OBS-style workflows, switchers and capture paths can be matched to the scale of the job rather than forcing every event through the same setup.",
        "The main decision is not just where the stream goes, but how much control the client needs over the broadcast, the latency and the downstream use of the recording.",
      ],
      hasImagePlaceholder: true,
      theme: "light",
    },
  },
} as const;
