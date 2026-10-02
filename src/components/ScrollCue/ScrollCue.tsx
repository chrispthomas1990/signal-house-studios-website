import type { MouseEvent } from "react";
import { smoothScrollToElement } from "../../lib/smoothScroll";
import "./ScrollCue.css";

type ScrollCueProps = { targetId: string; label: string; dark?: boolean };

export function ScrollCue({ targetId, label, dark = false }: ScrollCueProps) {
  const scrollToTarget = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 0;
    smoothScrollToElement(target, { offset: headerHeight });
  };

  return (
    <div className={`video-scroll-cue${dark ? " video-scroll-cue--dark" : ""}`}>
      <a href={`#${targetId}`} onClick={scrollToTarget} aria-label={label}>
        <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false">
          <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0L224 285.3l154.7-154.7c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
        </svg>
      </a>
    </div>
  );
}
