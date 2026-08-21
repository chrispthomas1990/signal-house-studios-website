import { describe, expect, it } from "vitest";
import { selectHeroVideo } from "./videoSources";

describe("selectHeroVideo", () => {
  it("uses the 4:5 showreel on mobile", () => {
    expect(selectHeroVideo(true)).toContain("portrait-4x5.mp4");
  });

  it("uses the 21:9 showreel on tablet and desktop", () => {
    expect(selectHeroVideo(false)).toContain("ultrawide-21x9.mp4");
  });
});
