import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("applies a focal position to its image", () => {
    render(
      <HeroSection
        eyebrow="Audio production"
        title="Recording and production"
        body="Hero body"
        imageSrc="hero.webp"
        imageAlt="Audio equipment"
        imagePosition="center 50%"
      />,
    );

    expect(screen.getByRole("img", { name: "Audio equipment" })).toHaveStyle({
      objectPosition: "center 50%",
    });
  });
});
