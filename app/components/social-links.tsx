"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "../site-config";

const instagramLinks = [
  { href: siteConfig.socialProfiles.coffeeBar, label: "Luxe Coffee Bar" },
  { href: siteConfig.socialProfiles.sweetCart, label: "Luxe Sweet Cart" },
  { href: siteConfig.socialProfiles.seatingRentals, label: "Luxe Event Rentals" },
] as const;

export function InstagramLinks({ className }: { className: string }) {
  const disclosureRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const disclosure = disclosureRef.current;

    function closePicker(event: PointerEvent) {
      if (!disclosure?.contains(event.target as Node)) {
        disclosure?.removeAttribute("open");
      }
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && disclosure?.open) {
        disclosure.removeAttribute("open");
        disclosure.querySelector<HTMLElement>("summary")?.focus();
      }
    }

    document.addEventListener("pointerdown", closePicker);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closePicker);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div className={className}>
      <details className="instagram-picker" ref={disclosureRef}>
        <summary aria-label="Choose a Luxe Instagram account">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle className="instagram-dot" cx="17.4" cy="6.7" r="1" />
          </svg>
        </summary>
        <nav className="instagram-picker-menu" aria-label="Luxe experiences on Instagram">
          <span>Choose an experience</span>
          {instagramLinks.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} on Instagram, opens in a new tab`}
              key={link.href}
              onClick={() => disclosureRef.current?.removeAttribute("open")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </details>
    </div>
  );
}
