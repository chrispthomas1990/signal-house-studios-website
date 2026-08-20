import showreelVideoMobile from "../../assets/videos/shs-showreel-landscape-16x9.mp4";
import showreelVideoDesktop from "../../assets/videos/shs-showreel-ultrawide-21x9.mp4";

export const mobileVideoMediaQuery = "(max-width: 767.98px)";

export function selectHeroVideo(isMobile: boolean) {
  return isMobile ? showreelVideoMobile : showreelVideoDesktop;
}
