import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ServiceDetailSection } from "./ServiceDetailSection";

afterEach(() => vi.unstubAllGlobals());

it("defers the embed URL until near the viewport and disconnects the observer", () => {
  let callback: IntersectionObserverCallback;
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(handler: IntersectionObserverCallback) { callback = handler; }
    observe = vi.fn();
    disconnect = disconnect;
  });
  render(<ServiceDetailSection embed={{ src: "https://embed.tidal.com/playlists/example", title: "Audio playlist" }} />);
  expect(screen.getByTitle("Audio playlist")).not.toHaveAttribute("src");
  act(() => callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(screen.getByTitle("Audio playlist")).toHaveAttribute("src", "https://embed.tidal.com/playlists/example");
  expect(disconnect).toHaveBeenCalled();
});
