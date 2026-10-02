import type { MouseEvent } from "react";
import { cancelSmoothScroll } from "./smoothScroll";

export function handleHomeLogoClick(event: MouseEvent<HTMLAnchorElement>, pathname: string) {
  if (
    pathname !== "/" ||
    event.button !== 0 ||
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  ) {
    return;
  }

  event.preventDefault();
  cancelSmoothScroll();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
