import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "../App";
import { routeSeo } from "./seoConfig";

describe("pre-rendered pages", () => {
  for (const pathname of [...Object.keys(routeSeo), "/404"]) {
    it(`hydrates ${pathname} without replacing its content`, async () => {
      const location = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${pathname}`;
      window.history.replaceState(null, "", location);
      window.localStorage.setItem("signalHouseCookieConsent", "accepted");
      const container = document.createElement("div");
      container.innerHTML = renderToString(
        <StaticRouter location={location} basename={import.meta.env.BASE_URL}><AppRoutes /></StaticRouter>,
      );
      document.body.appendChild(container);
      const heading = container.querySelector("h1");
      expect(heading).not.toBeNull();
      expect(container.querySelectorAll("h1")).toHaveLength(1);
      const errors: unknown[] = [];
      let root: ReturnType<typeof hydrateRoot>;
      await act(async () => {
        root = hydrateRoot(container,
          <BrowserRouter basename={import.meta.env.BASE_URL}><AppRoutes /></BrowserRouter>,
          { onRecoverableError: (error) => errors.push(error) },
        );
      });
      expect(errors).toEqual([]);
      expect(container.querySelector("h1")).toBe(heading);
      await act(async () => root.unmount());
      container.remove();
      window.localStorage.clear();
    });
  }
});
