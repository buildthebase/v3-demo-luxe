"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 24;
}

export function ScrollHeader({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  return (
    <header className="foundation-header" data-scrolled={scrolled}>
      {children}
    </header>
  );
}
