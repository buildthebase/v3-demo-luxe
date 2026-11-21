"use client";

import { useEffect, useRef } from "react";
import { homeTestimonialPlaceholders } from "../home-content";

export function HomeTestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  function move(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const itemsPerView = window.matchMedia("(min-width: 961px)").matches ? 2 : 1;
    const pageCount = Math.ceil(homeTestimonialPlaceholders.length / itemsPerView);
    const currentPage = Math.round(track.scrollLeft / track.clientWidth);
    const nextPage = (currentPage + direction + pageCount) % pageCount;

    track.scrollTo({
      behavior: "smooth",
      left: nextPage * track.clientWidth,
    });
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!pausedRef.current) {
        move(1);
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="home-testimonial-carousel"
      id="reviews"
      aria-labelledby="home-reviews-title"
      aria-roledescription="carousel"
      data-content-status="placeholder"
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onPointerDown={() => {
        pausedRef.current = true;
      }}
      onPointerUp={() => {
        pausedRef.current = false;
      }}
    >
      <header>
        <h2 id="home-reviews-title">Client Reviews</h2>
        <div aria-label="Testimonial controls" role="group">
          <button
            aria-label="Previous sample testimonial"
            onClick={() => move(-1)}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Next sample testimonial"
            onClick={() => move(1)}
            type="button"
          >
            ›
          </button>
        </div>
      </header>
      <div
        className="home-testimonial-track"
        ref={trackRef}
        role="group"
        aria-label="Experiences by Luxe review placeholders"
      >
        {homeTestimonialPlaceholders.map((testimonial, index) => (
          <blockquote
            key={testimonial.context}
            role="group"
            aria-roledescription="slide"
            aria-label={`Review placeholder ${index + 1} of ${homeTestimonialPlaceholders.length}`}
          >
            <p>“{testimonial.quote}”</p>
            <footer><cite>Sample — {testimonial.context}</cite></footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
