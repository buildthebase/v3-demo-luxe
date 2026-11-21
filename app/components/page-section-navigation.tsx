"use client";

import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PageSectionNavigationItem } from "../page-section-navigation";

export function PageSectionNavigation({
  items,
  revealAfterId,
}: {
  items: readonly PageSectionNavigationItem[];
  revealAfterId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastTop, setIsPastTop] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => Boolean(target));

    targets.forEach((target) => target.setAttribute("data-page-section-anchor", ""));

    function updateActiveSection() {
      const revealTarget = revealAfterId
        ? document.getElementById(revealAfterId)
        : null;
      const closingSection = document.querySelector(
        "main > .signature-inquiry, main .blog-journal-inquiry, main > .faq-hub-inquiry, footer",
      );
      const atPageEnd = closingSection
        ? closingSection.getBoundingClientRect().top <= window.innerHeight * .85
        : false;
      setIsPastTop(
        !atPageEnd && (revealTarget
          ? revealTarget.getBoundingClientRect().bottom <= 96
          : window.scrollY > 80),
      );
      const readingLine = window.innerHeight * 0.34;
      const current =
        [...targets]
          .reverse()
          .find((target) => target.getBoundingClientRect().top <= readingLine) ??
        targets[0];

      if (current) {
        setActiveId(current.id);
      }
    }

    let animationFrame = 0;
    function scheduleUpdate() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    }

    const hashId = window.location.hash.slice(1);
    if (items.some((item) => item.id === hashId)) {
      animationFrame = window.requestAnimationFrame(() => setActiveId(hashId));
    } else {
      scheduleUpdate();
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      targets.forEach((target) => target.removeAttribute("data-page-section-anchor"));
    };
  }, [items, revealAfterId]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function closeFromOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeNavigation();
      }
    }

    document.addEventListener("pointerdown", closeFromOutside);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [isOpen]);

  function closeNavigation(returnFocus = false) {
    setIsOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeNavigation(true);
    }
  }

  function navigateToSection(
    event: MouseEvent<HTMLAnchorElement>,
    item: PageSectionNavigationItem,
  ) {
    const target = document.getElementById(item.id);
    if (!target) {
      return;
    }

    event.preventDefault();
    setActiveId(item.id);
    closeNavigation();
    window.history.replaceState(null, "", `#${item.id}`);
    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  const activeLabel =
    items.find((item) => item.id === activeId)?.label ?? items[0]?.label ?? "";
  const visibleActiveLabel = activeLabel === "Back to top" ? "" : activeLabel;

  return (
    <div
      className={[
        "page-section-navigation",
        isOpen ? "is-open" : "",
        isPastTop ? "is-past-top" : "",
        visibleActiveLabel ? "" : "is-top-section",
      ].filter(Boolean).join(" ")}
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      <button
        className="page-section-navigation-trigger"
        type="button"
        aria-label="Open on this page navigation"
        aria-expanded={isOpen}
        aria-controls="page-section-navigation-panel"
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
      >
        <span>On this page</span>
        {visibleActiveLabel ? <small>{visibleActiveLabel}</small> : null}
        <i aria-hidden="true" />
      </button>

      <button
        className="page-section-navigation-backdrop"
        type="button"
        aria-label="Close page navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => closeNavigation(true)}
      />

      <aside
        className="page-section-navigation-panel"
        id="page-section-navigation-panel"
        aria-label="On this page"
        aria-hidden={isOpen ? undefined : "true"}
        ref={panelRef}
      >
        <header>
          <div>
            <span>On this page</span>
            {visibleActiveLabel ? <small>{visibleActiveLabel}</small> : null}
          </div>
          <button
            type="button"
            aria-label="Close page navigation"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => closeNavigation(true)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <nav aria-label="Page sections">
          <ol>
            {items.map((item, index) => (
              <li
                className={[
                  item.id === activeId ? "is-active" : "",
                  item.label === "Back to top" ? "is-back-to-top" : "",
                ].filter(Boolean).join(" ") || undefined}
                key={item.id}
              >
                <a
                  href={`#${item.id}`}
                  aria-current={item.id === activeId ? "location" : undefined}
                  onClick={(event) => navigateToSection(event, item)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span>
                    {item.label === "Back to top"
                      ? "↑︎"
                      : String(
                          index +
                            (items[0]?.label === "Back to top" ? 0 : 1),
                        ).padStart(2, "0")}
                  </span>
                  <strong>{item.label}</strong>
                  <i aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </div>
  );
}
