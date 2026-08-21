import { describe, expect, it } from "vitest";
import { selectHeroVideo } from "./videoSources";

describe("selectHeroVideo", () => {
  it("uses the 21:9 showreel on every viewport", () => {
    expect(selectHeroVideo()).toContain("ultrawide-21x9.mp4");
  });
});
