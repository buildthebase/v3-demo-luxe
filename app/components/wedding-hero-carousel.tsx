"use client";

import { useEffect, useRef, useState } from "react";
import { weddingHeroPhotos } from "../wedding-hero-media";
import { ResponsiveImage } from "./responsive-image";

export function WeddingHeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const previousWidth = useRef(0);
  const [active, setActive] = useState(0);

  function syncActive() {
    const element = track.current;
    if (!element) return;
    const width = element.getBoundingClientRect().width;
    if (!width) return;
    const index = Math.round(element.scrollLeft / width);
    activeIndex.current = Math.max(0, Math.min(weddingHeroPhotos.length - 1, index));
    setActive(activeIndex.current);
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const width = element.getBoundingClientRect().width;
      if (previousWidth.current && previousWidth.current !== width) {
        element.scrollTo({ left: activeIndex.current * width, behavior: "instant" });
      }
      previousWidth.current = width;
      syncActive();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function show(index: number) {
    const element = track.current;
    if (!element) return;
    const destination = Math.max(0, Math.min(weddingHeroPhotos.length - 1, index));
    element.scrollTo({
      left: destination * element.getBoundingClientRect().width,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div
      className="wedding-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Luxe wedding coffee and dessert moments"
    >
      <div
        className="wedding-hero-carousel-track"
        id="wedding-hero-carousel-track"
        ref={track}
        tabIndex={0}
        aria-label="Wedding photos. Use the left and right arrow keys to browse."
        onScroll={syncActive}
        onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home") show(0);
          else if (event.key === "End") show(weddingHeroPhotos.length - 1);
          else show(active + (event.key === "ArrowLeft" ? -1 : 1));
        }}
      >
        {weddingHeroPhotos.map((photo, index) => (
          <figure
            className="wedding-hero-carousel-slide"
            key={photo.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${weddingHeroPhotos.length}`}
          >
            <ResponsiveImage asset={photo} />
          </figure>
        ))}
      </div>
      <div className="wedding-hero-carousel-controls">
        <button
          type="button"
          aria-label="Previous wedding hero photo"
          aria-controls="wedding-hero-carousel-track"
          disabled={active === 0}
          onClick={() => show(active - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span aria-live="polite" aria-atomic="true">
          {active + 1} / {weddingHeroPhotos.length}
        </span>
        <button
          type="button"
          aria-label="Next wedding hero photo"
          aria-controls="wedding-hero-carousel-track"
          disabled={active === weddingHeroPhotos.length - 1}
          onClick={() => show(active + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
