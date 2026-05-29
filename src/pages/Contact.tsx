import { ContactForm } from "../components/ContactForm";
import "./Contact.css";

export function Contact() {
  return (
    <article className="content-page contact-page">
      <section className="content-page__section contact-section">
        <div className="content-page__section-copy">
          <p className="content-page__eyebrow">Contact</p>
          <h1>Tell us about your project, goals and next steps.</h1>
          <p>
            A clear brief helps make the first reply more useful. Share what 
            you’re looking to create, update or improve, along with any practical 
            details that are already in place.
          </p>
          <p>
            If you know the deliverables, timelines, budget range or visual 
            references, include them here. You can also mention where the 
            project is up to, who needs to be involved and anything that 
            may affect the schedule.
          </p>
          <p>
            With the right information upfront, we can come back with a more 
            focused response and a clearer sense of what’s realistic, 
            what needs planning and what can move quickly.
          </p>
        </div>

        <ContactForm />
      </section>
    </article>
  );
}
