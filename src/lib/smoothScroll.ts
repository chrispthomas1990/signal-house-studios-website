type SmoothScrollOptions = {
  duration?: number;
  offset?: number;
};

let activeFrameId: number | null = null;
let removeInterruptionListeners: (() => void) | null = null;

export function easeStandard(progress: number) {
  let curveTime = progress;

  for (let iteration = 0; iteration < 5; iteration += 1) {
    const inverse = 1 - curveTime;
    const curveX =
      3 * inverse * inverse * curveTime * 0.44 +
      3 * inverse * curveTime * curveTime * 0.56 +
      curveTime * curveTime * curveTime;
    const slopeX =
      3 * inverse * inverse * 0.44 +
      6 * inverse * curveTime * (0.56 - 0.44) +
      3 * curveTime * curveTime * (1 - 0.56);

    if (slopeX === 0) break;
    curveTime -= (curveX - progress) / slopeX;
  }

  const inverse = 1 - curveTime;
  return 3 * inverse * curveTime * curveTime + curveTime * curveTime * curveTime;
}

export function cancelSmoothScroll() {
  if (activeFrameId !== null) window.cancelAnimationFrame(activeFrameId);
  activeFrameId = null;
  removeInterruptionListeners?.();
  removeInterruptionListeners = null;
}

export function smoothScrollToElement(
  target: HTMLElement,
  { duration = 600, offset = 0 }: SmoothScrollOptions = {},
) {
  cancelSmoothScroll();

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY - offset;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const interrupt = () => cancelSmoothScroll();
  const interruptionEvents = ["wheel", "touchstart", "keydown"] as const;

  interruptionEvents.forEach((eventName) =>
    window.addEventListener(eventName, interrupt, { passive: true, once: true }),
  );
  removeInterruptionListeners = () =>
    interruptionEvents.forEach((eventName) => window.removeEventListener(eventName, interrupt));

  const startTime = performance.now();
  const animate = (time: number) => {
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo(0, startY + (targetY - startY) * easeStandard(progress));

    if (progress < 1) {
      activeFrameId = window.requestAnimationFrame(animate);
    } else {
      cancelSmoothScroll();
    }
  };

  activeFrameId = window.requestAnimationFrame(animate);
}
