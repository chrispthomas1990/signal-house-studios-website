import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { VideoProduction } from "./VideoProduction";
import { videoServiceGroups } from "./videoServices";

describe("VideoProduction", () => {
  it("uses a logical heading hierarchy", () => {
    render(
      <MemoryRouter>
        <VideoProduction />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Video Production" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Built for Impact, Not Just Aesthetics." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Flexible Scale" })).toBeInTheDocument();
  });

  it("renders three explicit service groups in the intended order", () => {
    const { container } = render(
      <MemoryRouter>
        <VideoProduction />
      </MemoryRouter>,
    );
    const groups = container.querySelectorAll(".video-services__group");

    expect(groups).toHaveLength(3);
    groups.forEach((group, groupIndex) => {
      const titles = within(group as HTMLElement)
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);
      expect(titles).toEqual(videoServiceGroups[groupIndex].map((service) => service.title));
    });
  });
});
