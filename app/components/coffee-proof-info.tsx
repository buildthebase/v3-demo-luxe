"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type CoffeeProofInfoProps = {
  children: ReactNode;
  id: string;
  label: string;
};

const coffeeProofOpenEvent = "luxe:coffee-proof-info-open";

export function CoffeeProofInfo({ children, id, label }: CoffeeProofInfoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [shift, setShift] = useState(0);
  const open = hovered || pinned;

  const close = useCallback(() => {
    setHovered(false);
    setPinned(false);
  }, []);

  const announceOpen = useCallback(() => {
    document.dispatchEvent(
      new CustomEvent<string>(coffeeProofOpenEvent, { detail: id }),
    );
  }, [id]);

  useEffect(() => {
    const handleAnotherBubbleOpening = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) close();
    };

    document.addEventListener(coffeeProofOpenEvent, handleAnotherBubbleOpening);

    return () => {
      document.removeEventListener(coffeeProofOpenEvent, handleAnotherBubbleOpening);
    };
  }, [close, id]);

  useEffect(() => {
    if (!open) return;

    const handleOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    window.addEventListener("scroll", close, { capture: true, passive: true });
    window.addEventListener("resize", close);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [close, open]);

  useLayoutEffect(() => {
    if (!open || !panelRef.current || !triggerRef.current) return;

    const panel = panelRef.current.getBoundingClientRect();
    const trigger = triggerRef.current.getBoundingClientRect();
    const viewportMargin = 16;
    const centeredLeft = trigger.left + (trigger.width / 2) - (panel.width / 2);
    const centeredRight = centeredLeft + panel.width;
    let nextShift = 0;

    if (centeredLeft < viewportMargin) {
      nextShift = viewportMargin - centeredLeft;
    } else if (centeredRight > window.innerWidth - viewportMargin) {
      nextShift = (window.innerWidth - viewportMargin) - centeredRight;
    }

    const spaceBelow = window.innerHeight - trigger.bottom - viewportMargin;
    const spaceAbove = trigger.top - viewportMargin;

    setShift(nextShift);
    setPlacement(spaceBelow < panel.height + 14 && spaceAbove > spaceBelow ? "top" : "bottom");
  }, [open]);

  return (
    <div
      className={`coffee-proof-info${open ? " is-open" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
      onFocus={() => {
        announceOpen();
        setHovered(true);
      }}
      onMouseEnter={() => {
        announceOpen();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      ref={rootRef}
      data-placement={placement}
      style={{ "--coffee-proof-shift": `${shift}px` } as CSSProperties}
    >
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-label={label}
        className="coffee-proof-info-trigger"
        onClick={() => {
          const nextPinned = !pinned;

          if (nextPinned) {
            announceOpen();
          }

          setPinned(nextPinned);
        }}
        ref={triggerRef}
        type="button"
      >
        i
      </button>
      <div
        aria-hidden={!open}
        className="coffee-proof-info-copy"
        id={id}
        ref={panelRef}
        role="tooltip"
      >
        <p>{children}</p>
      </div>
    </div>
  );
}
