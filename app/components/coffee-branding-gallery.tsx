"use client";

import { useRef, useState } from "react";
import { ResponsiveImage } from "./responsive-image";
import { brandingPhotos } from "../coffee-branding-media";


export function CoffeeBrandingGallery() {
  const [active, setActive] = useState(0);
  const gesture = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const multiple = brandingPhotos.length > 1;
  const move = (direction: number) => setActive(index => (index + direction + brandingPhotos.length) % brandingPhotos.length);

  return (
    <div className="coffee-branding-gallery" role="region" aria-label="Coffee Bar customization photos" aria-roledescription={multiple ? "carousel" : undefined}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="coffee-branding-photo"
        onDragStart={event => event.preventDefault()}
        onPointerDown={event => {
          if (!multiple || !event.isPrimary || event.button !== 0) return;
          gesture.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={event => {
          const start = gesture.current;
          gesture.current = null;
          if (!start || start.pointerId !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { gesture.current = null; }}
        onLostPointerCapture={() => { gesture.current = null; }}>
        <ResponsiveImage asset={brandingPhotos[active]} />
      </div>
      {multiple ? (
        <>
        <div className="coffee-branding-controls">
          <button className="coffee-branding-arrow" type="button" aria-label="Previous customization photo" onClick={() => move(-1)}>←</button>
          <div className="coffee-branding-dots" role="group" aria-label="Choose customization photo">
            {brandingPhotos.map((photo, index) => (
              <button key={photo.id} type="button" aria-label={`Show photo ${index + 1}: ${photo.alt}`} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)}><span /></button>
            ))}
          </div>
          <button className="coffee-branding-arrow" type="button" aria-label="Next customization photo" onClick={() => move(1)}>→</button>
        </div>
        <p className="coffee-branding-gallery-count" aria-live="polite" aria-atomic="true">Photo {active + 1} of {brandingPhotos.length}</p>
        </>
      ) : null}
    </div>
  );
}
