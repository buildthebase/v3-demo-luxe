"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingHeroPhotos } from "../wedding-hero-media";
import { ResponsiveImage } from "./responsive-image";

export function WeddingHeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const previousWidth = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

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

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.25), {
      threshold: 0.25,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncPreference();
    syncVisibility();
    preference.addEventListener("change", syncPreference);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  const show = useCallback((index: number, instant = false) => {
    const element = track.current;
    if (!element) return;
    const destination = (index + weddingHeroPhotos.length) % weddingHeroPhotos.length;
    element.scrollTo({
      left: destination * element.getBoundingClientRect().width,
      behavior: reducedMotion || instant ? "instant" : "smooth",
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (paused || hovered || !inView || !pageVisible || reducedMotion) return;
    const timer = window.setInterval(() => {
      const next = (activeIndex.current + 1) % weddingHeroPhotos.length;
      // Return directly to the first photo instead of scrolling back through every slide.
      show(next, next === 0);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, inView, pageVisible, reducedMotion, show]);

  function browse(index: number) {
    setPaused(true);
    show(index);
  }

  return (
    <div
      className="wedding-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Luxe wedding coffee and dessert moments"
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={event => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocusCapture={event => {
        if (!(event.target as HTMLElement).closest(".wedding-hero-slideshow-toggle")) {
          setPaused(true);
        }
      }}
    >
      <div
        className="wedding-hero-carousel-track"
        id="wedding-hero-carousel-track"
        ref={track}
        tabIndex={0}
        aria-label="Wedding photos. Use the left and right arrow keys to browse."
        onScroll={syncActive}
        onPointerDown={() => setPaused(true)}
        onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setPaused(true); }}
        onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home") browse(0);
          else if (event.key === "End") browse(weddingHeroPhotos.length - 1);
          else browse(activeIndex.current + (event.key === "ArrowLeft" ? -1 : 1));
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
          onClick={() => browse(activeIndex.current - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span aria-live={paused || reducedMotion ? "polite" : "off"} aria-atomic="true">
          {active + 1} / {weddingHeroPhotos.length}
        </span>
        <button
          type="button"
          aria-label="Next wedding hero photo"
          aria-controls="wedding-hero-carousel-track"
          onClick={() => browse(activeIndex.current + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
        {!reducedMotion && (
          <button
            className="wedding-hero-slideshow-toggle"
            type="button"
            aria-label={paused ? "Play wedding hero slideshow" : "Pause wedding hero slideshow"}
            aria-controls="wedding-hero-carousel-track"
            onClick={() => setPaused(value => !value)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
