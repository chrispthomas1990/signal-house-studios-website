import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VideoHeroMedia } from "./VideoHeroMedia";

afterEach(() => vi.restoreAllMocks());

describe("hero playback", () => {
  it("pauses hidden tabs and resumes visible tabs without reloading", () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockClear();
    vi.mocked(HTMLMediaElement.prototype.load).mockClear();
    vi.mocked(HTMLMediaElement.prototype.pause).mockClear();
    render(<VideoHeroMedia videoSrc="audio.mp4" label="Audio hero" />);
    expect(screen.getByLabelText("Audio hero")).toHaveAttribute("src", "audio.mp4");
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    hidden.mockReturnValue(false);
    fireEvent(document, new Event("visibilitychange"));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled();
  });

  it("responds to reduced-motion changes and cleans up listeners", () => {
    let change: (() => void) | undefined;
    const motion = { matches: true, addEventListener: vi.fn((_event: string, listener: () => void) => { change = listener; }), removeEventListener: vi.fn() };
    vi.spyOn(window, "matchMedia").mockImplementation((query) => (query.includes("prefers-reduced-motion") ? motion : { matches: false }) as MediaQueryList);
    vi.mocked(HTMLMediaElement.prototype.play).mockClear();
    const { unmount } = render(<VideoHeroMedia videoSrc="audio.mp4" />);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    motion.matches = false;
    change?.();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    unmount();
    expect(motion.removeEventListener).toHaveBeenCalledWith("change", change);
  });
});
