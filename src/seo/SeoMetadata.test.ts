import { describe, expect, it } from "vitest";
import { getCanonicalUrl, getStructuredData, routeSeo } from "./seoConfig";

describe("SEO helpers", () => {
  it("builds stable canonical URLs for pre-rendering", () => {
    expect(getCanonicalUrl("/contact", "https://example.com", "/site/")).toBe("https://example.com/site/contact");
  });

  it("includes service structured data on service pages", () => {
    const data = getStructuredData("https://example.com/", "https://example.com/", routeSeo["/"]);
    expect(data["@graph"].some((item) => item["@type"] === "Service")).toBe(true);
    expect(data["@graph"].map((item) => item["@id"])).toContain(
      "https://example.com/#organization",
    );
  });
});
