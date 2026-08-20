import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClientLogoTicker } from "./ClientLogoTicker";
import { clientLogos, normalizeTickerPosition } from "./clientLogos";

describe("ClientLogoTicker", () => {
  it("renders one accessible logo list and hidden buffer copies", () => {
    render(<ClientLogoTicker />);
    expect(screen.getAllByRole("list")).toHaveLength(1);
    expect(screen.getAllByRole("img")).toHaveLength(clientLogos.length);
  });

  it("wraps positions without exposing the physical track ends", () => {
    expect(normalizeTickerPosition(200, 100)).toBe(100);
    expect(normalizeTickerPosition(0, 100)).toBe(100);
    expect(normalizeTickerPosition(150, 100)).toBe(150);
  });
});
