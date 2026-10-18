"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryMedia } from "../gallery/gallery-content";
import { ResponsiveImage } from "./responsive-image";

export function galleryPhotoAlt(item: GalleryMedia) {
  return item.alt === item.caption ? item.alt : `${item.alt.replace(/[.]$/, "")}. ${item.caption}`;
}

export function GalleryPhotoViewer({ photos, initialId, onClose }: {
  photos: readonly GalleryMedia[];
  initialId: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(() => Math.max(0, photos.findIndex(photo => photo.id === initialId)));
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const wheel = useRef({ sum: 0, lastEvent: 0, lastMove: 0 });
  const move = (direction: number) => setIndex(current => (current + direction + photos.length) % photos.length);
  const photo = photos[index];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className="gallery-photo-viewer" aria-label="Event photo viewer" aria-describedby="gallery-viewer-help"
      onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          setIndex(event.key === "Home" ? 0 : photos.length - 1);
        }
      }}>
      <header className="gallery-viewer-toolbar">
        <span role="status" aria-live="polite" aria-atomic="true">Photo {index + 1} of {photos.length}</span>
        <button type="button" onClick={onClose} aria-label="Close photo viewer" autoFocus>×</button>
      </header>
      <p id="gallery-viewer-help" className="gallery-viewer-sr-only">Use the arrows, swipe horizontally, or scroll to browse photos. Press Escape to close.</p>
      <div className="gallery-viewer-stage"
        onDragStart={event => event.preventDefault()}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
          gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={event => {
          const start = gesture.current;
          gesture.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { gesture.current = null; }}
        onLostPointerCapture={() => { gesture.current = null; }}
        onWheel={event => {
          if (event.ctrlKey) return;
          const now = performance.now();
          const state = wheel.current;
          if (now - state.lastMove < 500) return;
          if (now - state.lastEvent > 180) state.sum = 0;
          state.lastEvent = now;
          const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
          state.sum += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 300 : 1);
          if (Math.abs(state.sum) >= 85) {
            move(state.sum > 0 ? 1 : -1);
            state.sum = 0;
            state.lastMove = now;
          }
        }}>
        <ResponsiveImage key={photo.id} asset={{ ...photo, alt: galleryPhotoAlt(photo), priority: true, sizes: "100vw" }} className="gallery-viewer-photo" />
        {photos.length > 1 ? <>
          <button className="gallery-viewer-previous" type="button" onClick={() => move(-1)} aria-label="Previous photo">←</button>
          <button className="gallery-viewer-next" type="button" onClick={() => move(1)} aria-label="Next photo">→</button>
        </> : null}
      </div>
    </dialog>
  );
}
