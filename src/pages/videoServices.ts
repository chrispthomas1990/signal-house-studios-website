import masteringIcon from "../assets/icons/services/audio/shs-services-audio-mastering.svg";
import colourGradingIcon from "../assets/icons/services/video/shs-services-video-colour-grading.svg";
import droneOperationIcon from "../assets/icons/services/video/shs-services-video-drone-operation.svg";
import editingIcon from "../assets/icons/services/video/shs-services-video-editing.svg";
import filmingIcon from "../assets/icons/services/video/shs-services-video-filming.svg";
import photographyIcon from "../assets/icons/services/video/shs-services-video-photography.svg";
import preProductionIcon from "../assets/icons/services/video/shs-services-video-pre-production.svg";
import scoutingIcon from "../assets/icons/services/video/shs-services-video-scouting.svg";
import storyboardIcon from "../assets/icons/services/video/shs-services-video-storyboard.svg";

export const videoServiceGroups = [
  [
    { title: "Script & Concept", icon: preProductionIcon },
    { title: "Visuals & Storyboard", icon: storyboardIcon },
    { title: "Logistics & Scouting", icon: scoutingIcon },
  ],
  [
    { title: "Principal Photography", icon: filmingIcon },
    { title: "Stills & BTS", icon: photographyIcon },
    { title: "Drone Operation", icon: droneOperationIcon },
  ],
  [
    { title: "Editing", icon: editingIcon },
    { title: "Sound Design", icon: masteringIcon },
    { title: "Colour Grading", icon: colourGradingIcon },
  ],
] as const;
