import { describe, expect, it } from "vitest";
import { type ContactFormValues, validateContactForm } from "./contactFormValidation";

const validValues: ContactFormValues = {
  name: "Chris Thomas",
  email: "chris@example.com",
  company: "Signal House",
  projectType: "Video production",
  timeline: "Flexible",
  budget: "£3k – £10k",
  details: "A sufficiently detailed description of the project.",
  consent: true,
};

describe("validateContactForm", () => {
  it("accepts a complete valid enquiry", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });

  it("returns errors for every required empty field", () => {
    const errors = validateContactForm({ ...validValues, name: "", email: "", projectType: "", timeline: "", budget: "", details: "", consent: false });
    expect(Object.keys(errors)).toHaveLength(7);
  });
});
