import portraitShowreelVideo from "../../assets/videos/shs-showreel-portrait-4x5.mp4";
import ultrawideShowreelVideo from "../../assets/videos/shs-showreel-ultrawide-21x9.mp4";

export const heroVideoSources = {
  mobile: portraitShowreelVideo,
  tabletAndDesktop: ultrawideShowreelVideo,
};

export function selectHeroVideo(isMobile: boolean) {
  return isMobile ? heroVideoSources.mobile : heroVideoSources.tabletAndDesktop;
}
