export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  budget: string;
  details: string;
  consent: boolean;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(values: ContactFormValues) {
  const errors: ContactFormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please use a valid email address.";
  if (!values.projectType) errors.projectType = "Choose a project type.";
  if (!values.timeline) errors.timeline = "Choose a timeframe.";
  if (!values.budget) errors.budget = "Choose a budget range.";
  if (values.details.trim().length < 20) errors.details = "Add a little more detail about the project.";
  if (!values.consent) errors.consent = "Please confirm that we can reply to your email address.";
  return errors;
}
