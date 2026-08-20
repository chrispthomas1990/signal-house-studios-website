import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Layout } from "./Layout";

function FirstPage() {
  return <><h1>First page</h1><Link to="/second">Next page</Link></>;
}

describe("Layout route focus", () => {
  it("moves focus to the destination heading after navigation", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/first"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="first" element={<FirstPage />} />
            <Route path="second" element={<h1>Second page</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: "Next page" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Second page" })).toHaveFocus());
  });
});
