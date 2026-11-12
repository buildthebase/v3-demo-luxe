"use client";

import { useEffect, useRef, useState } from "react";
import { weddingBrandingPhotos } from "../wedding-branding-media";
import { ResponsiveImage } from "./responsive-image";

export function WeddingBrandingGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ first: 1, last: 2 });

  function syncRange() {
    const element = track.current;
    if (!element) return;
    const slides = Array.from(element.children) as HTMLElement[];
    const visible = slides.map((slide, index) => ({ slide, index })).filter(({ slide }) =>
      slide.offsetLeft + slide.offsetWidth > element.scrollLeft + 8 &&
      slide.offsetLeft < element.scrollLeft + element.clientWidth - 8,
    );
    if (visible.length) setRange({ first: visible[0].index + 1, last: visible[visible.length - 1].index + 1 });
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(syncRange);
    observer.observe(element);
    syncRange();
    return () => observer.disconnect();
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const step = (element.children[1] as HTMLElement).offsetLeft;
    element.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div className="wedding-branding-gallery" role="region" aria-roledescription="carousel" aria-label="Examples of Luxe Custom Branding">
      <div id="wedding-branding-track" className="wedding-branding-track" ref={track} tabIndex={0} onScroll={syncRange}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        {weddingBrandingPhotos.map((photo, index) => (
          <figure className="wedding-branding-slide" key={photo.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${weddingBrandingPhotos.length}`}>
            <ResponsiveImage asset={photo} />
          </figure>
        ))}
      </div>
      <div className="wedding-branding-controls">
        <button type="button" aria-label="Previous wedding branding photo" aria-controls="wedding-branding-track" disabled={range.first === 1} onClick={() => move(-1)}>←</button>
        <span aria-live="polite" aria-atomic="true">{range.first === range.last ? `Photo ${range.first}` : `Photos ${range.first}–${range.last}`} of {weddingBrandingPhotos.length}</span>
        <button type="button" aria-label="Next wedding branding photo" aria-controls="wedding-branding-track" disabled={range.last === weddingBrandingPhotos.length} onClick={() => move(1)}>→</button>
      </div>
    </div>
  );
}
