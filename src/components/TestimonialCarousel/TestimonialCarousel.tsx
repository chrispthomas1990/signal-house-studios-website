import { type PointerEvent, useEffect, useState } from "react";
import "./TestimonialCarousel.css";

type Testimonial = {
  name: string;
  quote: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

const rotationDelay = 6000;
const swipeThreshold = 40;

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerStartX, setPointerStartX] = useState<number | null>(null);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, rotationDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const activeTestimonial = testimonials[activeIndex];
  const showTestimonial = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    setPointerStartX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStartX === null || testimonials.length <= 1) {
      setPointerStartX(null);
      return;
    }

    const distance = event.clientX - pointerStartX;
    setPointerStartX(null);

    if (Math.abs(distance) < swipeThreshold) {
      return;
    }

    showTestimonial(distance < 0 ? activeIndex + 1 : activeIndex - 1);
  };

  return (
    <section className="testimonial-carousel">
      <div className="testimonial-carousel__inner">
        <p className="testimonial-carousel__eyebrow">Testimonials</p>

        <article
          className="testimonial-carousel__item"
          key={activeTestimonial.name}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setPointerStartX(null)}
        >
          <h2 className="testimonial-carousel__name">{activeTestimonial.name}</h2>
          <p className="testimonial-carousel__quote">“{activeTestimonial.quote}”</p>
          <div className="testimonial-carousel__stars" aria-label="5 out of 5 stars">
            <span aria-hidden="true">★★★★★</span>
          </div>
        </article>

        <div className="testimonial-carousel__dots" aria-label="Testimonial navigation">
          {testimonials.map((testimonial, index) => (
            <button
              className={`testimonial-carousel__dot ${
                index === activeIndex ? "testimonial-carousel__dot--active" : ""
              }`}
              key={testimonial.name}
              type="button"
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
