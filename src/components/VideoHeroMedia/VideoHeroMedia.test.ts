import { describe, expect, it } from "vitest";
import { selectHeroVideo } from "./videoSources";

describe("selectHeroVideo", () => {
  it("selects v1 for mobile and v2 for desktop", () => {
    expect(selectHeroVideo(true)).toContain("landscape-16x9.mp4");
    expect(selectHeroVideo(false)).toContain("ultrawide-21x9.mp4");
  });
});
