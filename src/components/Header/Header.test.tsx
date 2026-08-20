import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header mobile menu", () => {
  it("moves focus into the menu and returns it after Escape", async () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Video Production" })[1]).toHaveFocus());
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(toggle).toHaveFocus());
  });
});
