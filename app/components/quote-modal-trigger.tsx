"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FlashquotesForm } from "./flashquotes-form";

type QuoteModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
  tabIndex?: number;
  "data-event-name"?: string;
};

export function QuoteModalTrigger({
  children,
  className,
  tabIndex,
  "data-event-name": dataEventName = "inquiry_start",
}: QuoteModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `quote-modal-title-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <a
        href="/contact"
        className={className}
        tabIndex={tabIndex}
        data-luxe-cta="true"
        data-event-name={dataEventName}
        aria-haspopup="dialog"
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open
        ? createPortal(
            <dialog
              className="home-quote-modal flashquotes-modal"
              ref={dialogRef}
              aria-labelledby={titleId}
              onClose={() => setOpen(false)}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <FlashquotesForm titleId={titleId} onClose={() => setOpen(false)} />
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
