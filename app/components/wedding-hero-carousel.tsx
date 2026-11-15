"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingHeroPhotos } from "../wedding-hero-media";
import { ResponsiveImage } from "./responsive-image";

export function WeddingHeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const hintTimer = useRef<number | null>(null);
  const hasInteracted = useRef(false);
  const activeIndex = useRef(0);
  const previousWidth = useRef(0);
  const [active, setActive] = useState(0);
  const [nudge, setNudge] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const dismissHint = useCallback(() => {
    hasInteracted.current = true;
    if (hintTimer.current !== null) {
      window.clearTimeout(hintTimer.current);
      hintTimer.current = null;
    }
    setHintVisible(false);
    setNudge(false);
  }, []);

  const syncActive = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const width = element.getBoundingClientRect().width;
    if (!width) return;
    if (Math.abs(element.scrollLeft) > 4) dismissHint();
    const index = Math.round(element.scrollLeft / width);
    activeIndex.current = Math.max(0, Math.min(weddingHeroPhotos.length - 1, index));
    setActive(activeIndex.current);
  }, [dismissHint]);

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
  }, [syncActive]);

  useEffect(() => {
    const element = track.current;
    const firstImage = element?.querySelector("img");
    if (!element || !firstImage) return;

    let imageReady = firstImage.complete && firstImage.naturalWidth > 0;
    let visible = false;
    let started = false;

    function startNudge() {
      if (!imageReady || !visible || started || hasInteracted.current) return;
      started = true;
      setNudge(true);
      setHintVisible(true);
      hintTimer.current = window.setTimeout(() => {
        hintTimer.current = null;
        setHintVisible(false);
        setNudge(false);
      }, 3000);
      observer.disconnect();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.5;
      startNudge();
    }, { threshold: 0.5 });

    function imageLoaded() {
      imageReady = true;
      startNudge();
    }

    firstImage.addEventListener("load", imageLoaded, { once: true });
    observer.observe(element);
    return () => {
      observer.disconnect();
      firstImage.removeEventListener("load", imageLoaded);
      if (hintTimer.current !== null) {
        window.clearTimeout(hintTimer.current);
        hintTimer.current = null;
      }
    };
  }, []);

  function browse(index: number) {
    dismissHint();
    const element = track.current;
    if (!element) return;
    const destination = Math.max(0, Math.min(weddingHeroPhotos.length - 1, index));
    element.scrollTo({
      left: destination * element.getBoundingClientRect().width,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div
      className="wedding-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Luxe wedding coffee and dessert moments"
      data-discovery={nudge ? "active" : undefined}
      onPointerDown={() => setNudge(false)}
      onFocusCapture={() => setNudge(false)}
    >
      <div className="wedding-hero-carousel-viewport">
        <div
          className="wedding-hero-carousel-track"
          id="wedding-hero-carousel-track"
          ref={track}
          tabIndex={0}
          aria-label="Wedding photos. Swipe or use the left and right arrow keys to browse."
          onScroll={syncActive}
          onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setNudge(false); }}
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
        {hintVisible && (
          <div className="wedding-hero-swipe-cue" aria-hidden="true">
            <div className="wedding-hero-swipe-hint">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H3m3-3L3 5l3 3m17-3h6m-3-3 3 3-3 3" />
                <path className="wedding-hero-swipe-hand" d="M11 21V11a2 2 0 0 1 4 0v7l1.6-.6a2 2 0 0 1 2 .3l1.4-.4a2 2 0 0 1 2 .6l1 .2a2 2 0 0 1 1.5 2v3.6a7 7 0 0 1-2 4.9L21 30h-9l-5.7-6.3a2 2 0 0 1 2.9-2.8l1.8 1.8" />
              </svg>
              <span>Swipe to see more</span>
            </div>
          </div>
        )}
      </div>
      <div className="wedding-hero-carousel-controls">
        <button
          type="button"
          aria-label="Previous wedding hero photo"
          aria-controls="wedding-hero-carousel-track"
          disabled={active === 0}
          onClick={() => browse(activeIndex.current - 1)}
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
          onClick={() => browse(activeIndex.current + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
