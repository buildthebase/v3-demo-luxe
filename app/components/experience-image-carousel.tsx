"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ResponsiveImageAsset } from "../image-system";
import { ResponsiveImage } from "./responsive-image";

export function ExperienceImageCarousel({ images, href }: { images: readonly ResponsiveImageAsset[]; href: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => setActive(index => (index + direction + images.length) % images.length);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % images.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, inView, images.length]);

  return (
    <div ref={container} className="signature-selector-art experience-image-carousel" role="region" aria-roledescription="carousel" aria-label="Luxe Coffee Bar event photos"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={event => { if (touchStart.current !== null) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) { move(delta < 0 ? 1 : -1); setPaused(true); } touchStart.current = null; } }}>
      {images.map((image, index) => (
        <Link href={href} className={`experience-image-slide${index === active ? " is-active" : ""}`} key={image.id} aria-hidden={index !== active} tabIndex={index === active ? 0 : -1}>
          <ResponsiveImage asset={image} className="signature-selector-image" fill />
        </Link>
      ))}
      <div className="experience-image-controls">
        <button type="button" aria-label="Previous Coffee Bar photo" onClick={() => move(-1)}>←</button>
        <span aria-live={paused ? "polite" : "off"}>{active + 1} / {images.length}</span>
        <button type="button" aria-label="Next Coffee Bar photo" onClick={() => move(1)}>→</button>
        <button type="button" aria-label={paused ? "Play Coffee Bar slideshow" : "Pause Coffee Bar slideshow"} onClick={() => setPaused(value => !value)}>{paused ? "▶" : "Ⅱ"}</button>
      </div>
    </div>
  );
}
