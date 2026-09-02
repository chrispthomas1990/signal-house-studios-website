import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceDetailSection } from "./ServiceDetailSection";

describe("ServiceDetailSection image-only cards", () => {
  it("keeps card media and accessible labels while hiding visible copy", () => {
    const { container } = render(
      <ServiceDetailSection
        eyebrow="The studio"
        title="Studio spaces"
        cards={[
          {
            title: "Control room",
            body: "Hidden description",
            hasImagePlaceholder: true,
            hideCopy: true,
          },
        ]}
      />,
    );

    expect(screen.getByRole("article", { name: "Control room" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Control room" })).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden description")).not.toBeInTheDocument();
    expect(container.querySelector(".service-detail-section__card-image-placeholder")).toBeInTheDocument();
  });

  it("applies independent focal positions to section and card images", () => {
    render(
      <ServiceDetailSection
        eyebrow="The studio"
        title="Studio spaces"
        imageSrc="section.webp"
        imageAlt="Section image"
        imagePosition="center 25%"
        cards={[
          {
            title: "Control room",
            body: "Control room description",
            imageSrc: "card.webp",
            imageAlt: "Card image",
            imagePosition: "center 45%",
          },
        ]}
      />,
    );

    expect(screen.getByRole("img", { name: "Section image" })).toHaveStyle({
      objectPosition: "center 25%",
    });
    expect(screen.getByRole("img", { name: "Card image" })).toHaveStyle({
      objectPosition: "center 45%",
    });
  });
});
