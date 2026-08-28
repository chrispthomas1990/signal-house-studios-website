import { type FormEvent, useRef, useState } from "react";
import { siteInfo } from "../../content/siteInfo";
import {
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "./contactFormValidation";
import "./ContactForm.css";

const destinationEmail = siteInfo.email;

type RequiredContactFormField = Exclude<keyof ContactFormValues, "company">;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  budget: "",
  details: "",
  consent: false,
};

const requiredFields: readonly RequiredContactFormField[] = [
  "name",
  "email",
  "projectType",
  "timeline",
  "budget",
  "details",
  "consent",
];

const textFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "name@example.com", required: true },
  { name: "company", label: "Company or artist name", type: "text", placeholder: "Optional", required: false },
] as const;

const selectFields = [
  {
    name: "projectType",
    label: "Project type",
    options: ["Video production", "Live streaming", "Audio production", "Mixed project"],
  },
  {
    name: "timeline",
    label: "Ideal timeframe",
    options: ["ASAP", "Within 2 weeks", "Within a month", "Flexible"],
  },
  {
    name: "budget",
    label: "Budget range",
    options: ["Under £1k", "£1k – £3k", "£3k – £10k", "£10k+"],
  },
] as const;

function buildMailto(values: ContactFormValues) {
  const subject = `Project enquiry from ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || "N/A"}`,
    `Project type: ${values.projectType}`,
    `Timeframe: ${values.timeline}`,
    `Budget: ${values.budget}`,
    "",
    values.details.trim(),
  ].join("\n");

  return `mailto:${destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const updateValue = (field: keyof ContactFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const markTouched = (field: keyof ContactFormValues) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validateContactForm(values));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      company: true,
      projectType: true,
      timeline: true,
      budget: true,
      details: true,
      consent: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = requiredFields.find((field) => nextErrors[field]);

      if (firstInvalidField) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
          ?.focus();
      }

      return;
    }

    window.location.href = buildMailto(values);
  };

  const showError = (field: keyof ContactFormValues) => Boolean(touched[field] && errors[field]);
  const visibleErrors = requiredFields.filter((field) => showError(field));

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      {visibleErrors.length > 0 ? (
        <div className="contact-form__error-summary" role="alert" aria-labelledby="form-errors">
          <p id="form-errors">Please check the highlighted fields.</p>
        </div>
      ) : null}

      <div className="contact-form__grid">
        {textFields.map((field) => {
          const hasError = showError(field.name);

          return (
            <div className="contact-form__field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={(event) => updateValue(field.name, event.target.value)}
                onBlur={() => markTouched(field.name)}
                aria-invalid={hasError || undefined}
                aria-required={field.required || undefined}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
                placeholder={field.placeholder}
                required={field.required}
              />
              {hasError ? (
                <p id={`${field.name}-error`} className="contact-form__error">
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}

        {selectFields.map((field) => {
          const hasError = showError(field.name);

          return (
            <div className="contact-form__field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <select
                id={field.name}
                name={field.name}
                value={values[field.name]}
                onChange={(event) => updateValue(field.name, event.target.value)}
                onBlur={() => markTouched(field.name)}
                aria-invalid={hasError || undefined}
                aria-required="true"
                aria-describedby={hasError ? `${field.name}-error` : undefined}
                required
              >
                <option value="">Select one</option>
                {field.options.map((option) => (
                  <option value={option} key={option}>{option}</option>
                ))}
              </select>
              {hasError ? (
                <p id={`${field.name}-error`} className="contact-form__error">
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor="details">Project details</label>
          <textarea
            id="details"
            name="details"
            rows={6}
            value={values.details}
            onChange={(event) => updateValue("details", event.target.value)}
            onBlur={() => markTouched("details")}
            aria-invalid={showError("details")}
            aria-required="true"
            aria-describedby={showError("details") ? "details-error" : "details-hint"}
            placeholder="Tell us about the brief, what needs to be delivered, and anything that will help us understand the work."
            required
          />
          <p id="details-hint" className="contact-form__hint">
            Minimum 20 characters. Include the key deliverables, audience and any references if they
            matter.
          </p>
          {showError("details") ? (
            <p id="details-error" className="contact-form__error">
              {errors.details}
            </p>
          ) : null}
        </div>

        <label className="contact-form__consent contact-form__field--full" htmlFor="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => updateValue("consent", event.target.checked)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                updateValue("consent", !event.currentTarget.checked);
              }
            }}
            onBlur={() => markTouched("consent")}
            aria-invalid={showError("consent")}
            aria-required="true"
            aria-describedby={showError("consent") ? "consent-error" : undefined}
            required
          />
          <span>
            I agree that Signal House Studios can reply to this enquiry at the email address
            provided.
          </span>
        </label>
        {showError("consent") ? (
          <p id="consent-error" className="contact-form__error contact-form__field--full">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="contact-form__actions">
        <p className="contact-form__note">
          Submitting the form will open an email draft to {destinationEmail}.
        </p>
        <button className="button content-page__button" type="submit">
          Send enquiry
        </button>
      </div>
    </form>
  );
}
