import { afterEach, describe, expect, it, vi } from "vitest";
import { cancelSmoothScroll, easeStandard, smoothScrollToElement } from "./smoothScroll";

afterEach(() => {
  cancelSmoothScroll();
  vi.restoreAllMocks();
});

describe("smoothScrollToElement", () => {
  it("uses the site easing curve endpoints", () => {
    expect(easeStandard(0)).toBeCloseTo(0);
    expect(easeStandard(0.5)).toBeCloseTo(0.5);
    expect(easeStandard(1)).toBeCloseTo(1);
  });

  it("scrolls immediately when reduced motion is preferred", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const target = document.createElement("div");
    vi.spyOn(target, "getBoundingClientRect").mockReturnValue({
      top: 500,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 500,
      toJSON: () => ({}),
    });

    smoothScrollToElement(target, { offset: 74 });

    expect(window.scrollTo).toHaveBeenCalledWith(0, 426);
  });

  it("allows an animated scroll to be interrupted", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");
    const target = document.createElement("div");

    smoothScrollToElement(target);
    window.dispatchEvent(new WheelEvent("wheel"));

    expect(requestFrame).toHaveBeenCalledOnce();
    expect(cancelFrame).toHaveBeenCalledWith(42);
  });
});
