import type { ImgHTMLAttributes } from "react";
import avivaLogo from "../../assets/images/client-logos/aviva-investors.svg";
import bellIntegrationLogo from "../../assets/images/client-logos/bell-integration.svg";
import boultLogo from "../../assets/images/client-logos/boult.svg";
import brainlabsLogo from "../../assets/images/client-logos/brainlabs.svg";
import charlesTyrwhittLogo from "../../assets/images/client-logos/charles-tyrwhitt.svg";
import cranborneAudioLogo from "../../assets/images/client-logos/cranborne-audio.svg";
import kognityLogo from "../../assets/images/client-logos/kognity.svg";
import lloydsBankingGroupLogo from "../../assets/images/client-logos/lloyds-banking-group.svg";
import maitlandChambersLogo from "../../assets/images/client-logos/maitland-chambers.svg";
import meysanLogo from "../../assets/images/client-logos/meysan.svg";
import nikeLogo from "../../assets/images/client-logos/nike.svg";
import rollsRoyceLogo from "../../assets/images/client-logos/rolls-royce.svg";
import southeasternLogo from "../../assets/images/client-logos/southeastern.svg";
import tjxLogo from "../../assets/images/client-logos/tjx.svg";

type ClientLogo = {
  name: string;
  src: string;
  alt: ImgHTMLAttributes<HTMLImageElement>["alt"];
  scale: number;
};

export const clientLogos: readonly ClientLogo[] = [
  { name: "Aviva Investors", src: avivaLogo, alt: "Aviva Investors", scale: 0.855 },
  { name: "Bell Integration", src: bellIntegrationLogo, alt: "Bell Integration", scale: 0.9 },
  { name: "Boult", src: boultLogo, alt: "Boult", scale: 0.6885 },
  { name: "Brainlabs", src: brainlabsLogo, alt: "Brainlabs", scale: 1 },
  {
    name: "Charles Tyrwhitt",
    src: charlesTyrwhittLogo,
    alt: "Charles Tyrwhitt",
    scale: 0.9,
  },
  { name: "Cranborne Audio", src: cranborneAudioLogo, alt: "Cranborne Audio", scale: 0.9867 },
  { name: "Kognity", src: kognityLogo, alt: "Kognity", scale: 0.846 },
  {
    name: "Lloyds Banking Group",
    src: lloydsBankingGroupLogo,
    alt: "Lloyds Banking Group",
    scale: 0.9,
  },
  {
    name: "Maitland Chambers",
    src: maitlandChambersLogo,
    alt: "Maitland Chambers",
    scale: 1.026,
  },
  { name: "Meysan", src: meysanLogo, alt: "Meysan", scale: 0.9002 },
  { name: "Nike", src: nikeLogo, alt: "Nike", scale: 0.5925 },
  { name: "Rolls-Royce", src: rollsRoyceLogo, alt: "Rolls-Royce", scale: 1.0973 },
  { name: "Southeastern", src: southeasternLogo, alt: "Southeastern", scale: 1.08 },
  { name: "TJX", src: tjxLogo, alt: "TJX", scale: 0.663 },
];

export function normalizeTickerPosition(position: number, loopWidth: number) {
  if (position >= loopWidth * 2) return position - loopWidth;
  if (position <= 0) return position + loopWidth;
  return position;
}
