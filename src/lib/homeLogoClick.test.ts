import type { MouseEvent } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleHomeLogoClick } from "./homeLogoClick";

function click(overrides = {}) {
  return {
    button: 0,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as MouseEvent<HTMLAnchorElement>;
}

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.restoreAllMocks());

describe("home logo navigation", () => {
  it("returns to the top without navigating when already home", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const event = click();

    handleHomeLogoClick(event, "/");

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it.each(["/live-streaming", "/audio-production"])("preserves navigation from %s", (pathname) => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const event = click();

    handleHomeLogoClick(event, pathname);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(scroll).not.toHaveBeenCalled();
  });

  it.each([{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }])(
    "preserves browser behaviour for modified clicks: %o",
    (modifiers) => {
      const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
      const event = click(modifiers);

      handleHomeLogoClick(event, "/");

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(scroll).not.toHaveBeenCalled();
    },
  );
});
