import image0_640 from "../assets/images/pages/audio/audio-production-equipment-640w.webp";
import image0_960 from "../assets/images/pages/audio/audio-production-equipment-960w.webp";
import image0_1440 from "../assets/images/pages/audio/audio-production-equipment-1440w.webp";
import image0_1672 from "../assets/images/pages/audio/audio-production-equipment.webp";
import image1_640 from "../assets/images/pages/audio/recording-studio-mixing-session-640w.webp";
import image1_960 from "../assets/images/pages/audio/recording-studio-mixing-session-960w.webp";
import image1_1440 from "../assets/images/pages/audio/recording-studio-mixing-session-1440w.webp";
import image1_1920 from "../assets/images/pages/audio/recording-studio-mixing-session.webp";
import image2_640 from "../assets/images/pages/audio/recording-studio-drum-kit-640w.webp";
import image2_960 from "../assets/images/pages/audio/recording-studio-drum-kit-960w.webp";
import image2_1440 from "../assets/images/pages/audio/recording-studio-drum-kit-1440w.webp";
import image2_1920 from "../assets/images/pages/audio/recording-studio-drum-kit.webp";
import image3_640 from "../assets/images/pages/live/live-streaming-event-production-640w.webp";
import image3_960 from "../assets/images/pages/live/live-streaming-event-production-960w.webp";
import image3_1440 from "../assets/images/pages/live/live-streaming-event-production-1440w.webp";
import image3_1920 from "../assets/images/pages/live/live-streaming-event-production.webp";
import image4_640 from "../assets/images/pages/live/live-streaming-approach-camera-640w.webp";
import image4_960 from "../assets/images/pages/live/live-streaming-approach-camera-960w.webp";
import image4_1440 from "../assets/images/pages/live/live-streaming-approach-camera-1440w.webp";
import image4_1920 from "../assets/images/pages/live/live-streaming-approach-camera.webp";
import image5_640 from "../assets/images/pages/live/live-streaming-studio-production-640w.webp";
import image5_960 from "../assets/images/pages/live/live-streaming-studio-production-960w.webp";
import image5_1440 from "../assets/images/pages/live/live-streaming-studio-production-1440w.webp";
import image5_1920 from "../assets/images/pages/live/live-streaming-studio-production.webp";
import image6_640 from "../assets/images/pages/live/live-streaming-interview-production-640w.webp";
import image6_960 from "../assets/images/pages/live/live-streaming-interview-production-960w.webp";
import image6_1440 from "../assets/images/pages/live/live-streaming-interview-production-1440w.webp";
import image6_1604 from "../assets/images/pages/live/live-streaming-interview-production.webp";
import image7_640 from "../assets/images/pages/live/live-streaming-multiview-monitor-640w.webp";
import image7_960 from "../assets/images/pages/live/live-streaming-multiview-monitor-960w.webp";
import image7_1440 from "../assets/images/pages/live/live-streaming-multiview-monitor-1440w.webp";
import image7_1920 from "../assets/images/pages/live/live-streaming-multiview-monitor.webp";
import image8_640 from "../assets/images/pages/video/video-production-camera-rig-640w.webp";
import image8_960 from "../assets/images/pages/video/video-production-camera-rig-960w.webp";
import image8_1440 from "../assets/images/pages/video/video-production-camera-rig-1440w.webp";
import image8_1536 from "../assets/images/pages/video/video-production-camera-rig.webp";
import image9_640 from "../assets/images/pages/video/signal-house-studios-team-640w.webp";
import image9_960 from "../assets/images/pages/video/signal-house-studios-team-960w.webp";
import image9_1440 from "../assets/images/pages/video/signal-house-studios-team-1440w.webp";
import image9_1920 from "../assets/images/pages/video/signal-house-studios-team.webp";

const sources = new Map<string, [number, string][]>([
  [image0_1672, [[640, image0_640], [960, image0_960], [1440, image0_1440], [1672, image0_1672]]],
  [image1_1920, [[640, image1_640], [960, image1_960], [1440, image1_1440], [1920, image1_1920]]],
  [image2_1920, [[640, image2_640], [960, image2_960], [1440, image2_1440], [1920, image2_1920]]],
  [image3_1920, [[640, image3_640], [960, image3_960], [1440, image3_1440], [1920, image3_1920]]],
  [image4_1920, [[640, image4_640], [960, image4_960], [1440, image4_1440], [1920, image4_1920]]],
  [image5_1920, [[640, image5_640], [960, image5_960], [1440, image5_1440], [1920, image5_1920]]],
  [image6_1604, [[640, image6_640], [960, image6_960], [1440, image6_1440], [1604, image6_1604]]],
  [image7_1920, [[640, image7_640], [960, image7_960], [1440, image7_1440], [1920, image7_1920]]],
  [image8_1536, [[640, image8_640], [960, image8_960], [1440, image8_1440], [1536, image8_1536]]],
  [image9_1920, [[640, image9_640], [960, image9_960], [1440, image9_1440], [1920, image9_1920]]],
]);

// Section images stack below 992px; desktop columns share the 1344px page container.
export const sectionImageSizes = "(max-width: 991.98px) calc(100vw - 36px), 720px";
export const cardImageSizes = "(max-width: 575.98px) calc(100vw - 24px), (max-width: 1344px) calc((100vw - 52px) / 2), 646px";

export function responsiveImageSrcSet(src: string) {
  return sources.get(src)?.map(([width, url]) => `${url} ${width}w`).join(", ");
}
