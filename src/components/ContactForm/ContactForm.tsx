import { type FormEvent, useRef, useState } from "react";
import "./ContactForm.css";

const destinationEmail = "hello@christhomasdesign.co.uk";

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  budget: string;
  details: string;
  consent: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
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

function validate(values: ContactFormValues) {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please use a valid email address.";
  }

  if (!values.projectType) {
    errors.projectType = "Choose a project type.";
  }

  if (!values.timeline) {
    errors.timeline = "Choose a timeframe.";
  }

  if (!values.budget) {
    errors.budget = "Choose a budget range.";
  }

  if (values.details.trim().length < 20) {
    errors.details = "Add a little more detail about the project.";
  }

  if (!values.consent) {
    errors.consent = "Please confirm that we can reply to your email address.";
  }

  return errors;
}

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
    setErrors(validate(values));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
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
        <div className="contact-form__field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={showError("name")}
            aria-required="true"
            aria-describedby={showError("name") ? "name-error" : undefined}
            placeholder="Your name"
            required
          />
          {showError("name") ? (
            <p id="name-error" className="contact-form__error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            onBlur={() => markTouched("email")}
            aria-invalid={showError("email")}
            aria-required="true"
            aria-describedby={showError("email") ? "email-error" : undefined}
            placeholder="name@example.com"
            required
          />
          {showError("email") ? (
            <p id="email-error" className="contact-form__error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="company">Company or artist name</label>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={(event) => updateValue("company", event.target.value)}
            onBlur={() => markTouched("company")}
            placeholder="Optional"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="projectType">Project type</label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(event) => updateValue("projectType", event.target.value)}
            onBlur={() => markTouched("projectType")}
            aria-invalid={showError("projectType")}
            aria-required="true"
            aria-describedby={showError("projectType") ? "projectType-error" : undefined}
            required
          >
            <option value="">Select one</option>
            <option value="Audio production">Audio production</option>
            <option value="Video production">Video production</option>
            <option value="Live streaming">Live streaming</option>
            <option value="Mixed project">Mixed project</option>
          </select>
          {showError("projectType") ? (
            <p id="projectType-error" className="contact-form__error">
              {errors.projectType}
            </p>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="timeline">Ideal timeframe</label>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={(event) => updateValue("timeline", event.target.value)}
            onBlur={() => markTouched("timeline")}
            aria-invalid={showError("timeline")}
            aria-required="true"
            aria-describedby={showError("timeline") ? "timeline-error" : undefined}
            required
          >
            <option value="">Select one</option>
            <option value="ASAP">ASAP</option>
            <option value="Within 2 weeks">Within 2 weeks</option>
            <option value="Within a month">Within a month</option>
            <option value="Flexible">Flexible</option>
          </select>
          {showError("timeline") ? (
            <p id="timeline-error" className="contact-form__error">
              {errors.timeline}
            </p>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="budget">Budget range</label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(event) => updateValue("budget", event.target.value)}
            onBlur={() => markTouched("budget")}
            aria-invalid={showError("budget")}
            aria-required="true"
            aria-describedby={showError("budget") ? "budget-error" : undefined}
            required
          >
            <option value="">Select one</option>
            <option value="Under £1k">Under £1k</option>
            <option value="£1k – £3k">£1k – £3k</option>
            <option value="£3k – £10k">£3k – £10k</option>
            <option value="£10k+">£10k+</option>
          </select>
          {showError("budget") ? (
            <p id="budget-error" className="contact-form__error">
              {errors.budget}
            </p>
          ) : null}
        </div>

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
        <button className="content-page__button" type="submit">
          Send enquiry
        </button>
      </div>
    </form>
  );
}
