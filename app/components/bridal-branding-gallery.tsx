"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ResponsiveImageAsset } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import styles from "./bridal-editorial.module.css";

export function BridalBrandingGallery({ images }: { images: readonly ResponsiveImageAsset[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const trackId = useId();

  function syncActive() {
    const element = track.current;
    if (!element) return;
    const slides = Array.from(element.children) as HTMLElement[];
    const firstLeft = slides[0]?.offsetLeft ?? 0;
    const nearest = slides.reduce((best, slide, index) =>
      Math.abs(slide.offsetLeft - firstLeft - element.scrollLeft) <
      Math.abs(slides[best].offsetLeft - firstLeft - element.scrollLeft) ? index : best, 0);
    setActive(nearest);
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(syncActive);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const target = Math.max(0, Math.min(images.length - 1, index));
    const first = element.children[0] as HTMLElement;
    const slide = element.children[target] as HTMLElement;
    if (!first || !slide) return;
    element.scrollTo({
      left: slide.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className={styles.brandingExamples} role="region" aria-roledescription="carousel" aria-label="Custom cups and menu signage photos">
      <div className={styles.brandingPhotos} id={trackId} ref={track} tabIndex={0} onScroll={syncActive}
        onKeyDown={event => {
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            goTo(event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : active + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}>
        {images.map((image, index) => (
          <figure key={image.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`}>
            <ResponsiveImage asset={image} fill />
          </figure>
        ))}
      </div>
      <div className={styles.brandingControls}>
        <button type="button" aria-label="Previous personalization photo" aria-controls={trackId} disabled={active === 0} onClick={() => goTo(active - 1)}>←</button>
        <span aria-live="polite" aria-atomic="true">Photo {active + 1} of {images.length}</span>
        <button type="button" aria-label="Next personalization photo" aria-controls={trackId} disabled={active === images.length - 1} onClick={() => goTo(active + 1)}>→</button>
      </div>
    </div>
  );
}
