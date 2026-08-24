"use client";

import { useRef } from "react";

const reviewDestinations = [
  { href: "#review-coffee", label: "Coffee Bar" },
  { href: "#review-coffee-dessert", label: "Coffee Bar + Sweet Cart" },
  { href: "#review-coffee-seating", label: "Coffee Bar + Seating Rentals" },
] as const;

export function HomeReviewLauncher() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section
      className="home-review-launcher"
      id="reviews"
      aria-label="Google reviews by experience"
      data-content-status="integration-ready"
    >
      <button
        className="home-review-launcher-button"
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span className="home-review-google-icon" aria-hidden="true">G</span>
        <span className="home-review-launcher-copy">
          <strong>Google Reviews</strong>
          <span>Reviews by experience</span>
        </span>
        <span className="home-review-rating">
          <strong>5.0</strong>
          <span aria-label="Five out of five stars">★★★★★</span>
        </span>
        <span className="home-review-launcher-arrow" aria-hidden="true">↗︎</span>
      </button>

      <dialog
        className="home-review-dialog"
        ref={dialogRef}
        aria-labelledby="home-review-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="home-review-dialog-inner">
          <button
            className="home-review-dialog-close"
            type="button"
            aria-label="Close review experience chooser"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
          <span className="home-review-google-icon" aria-hidden="true">G</span>
          <p>Google Reviews</p>
          <h2 id="home-review-dialog-title">Choose an experience.</h2>
          <div className="home-review-dialog-options">
            {reviewDestinations.map((destination) => (
              <a
                href={destination.href}
                key={destination.href}
                onClick={() => dialogRef.current?.close()}
              >
                <span>{destination.label}</span>
                <b aria-hidden="true">↘︎</b>
              </a>
            ))}
          </div>
          <small>Select an experience to read its relevant Google review.</small>
        </div>
      </dialog>
    </section>
  );
}
