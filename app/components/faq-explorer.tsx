"use client";

import { useEffect, useState } from "react";
import { faqCategories } from "../faq/faq-content";
import { FaqAccordion } from "./faq-accordion";

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(faqCategories[0].id);
  const terms = searchable(query).trim().split(/\s+/).filter(Boolean);
  const categories = faqCategories.map((category) => ({
    ...category,
    items: category.items.filter((item) => {
      const text = searchable([
        category.title, category.description, item.question, item.answer,
        ...item.links.map((link) => link.label),
      ].join(" "));
      return terms.every((term) => text.includes(term));
    }),
  }));
  const answerCount = categories.reduce((total, category) => total + category.items.length, 0);
  const topicCount = categories.filter((category) => category.items.length > 0).length;

  useEffect(() => {
    let frame = 0;
    function updateActiveTopic() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const readingLine = (document.querySelector(".foundation-header")?.getBoundingClientRect().bottom ?? 100) + 60;
        const visibleSections = Array.from(document.querySelectorAll<HTMLElement>(".faq-editorial-topic:not([hidden])"));
        const current = visibleSections.findLast((section) => section.getBoundingClientRect().top <= readingLine) ?? visibleSections[0];
        if (current) setActiveId(current.id);
      });
    }
    updateActiveTopic();
    window.addEventListener("scroll", updateActiveTopic, { passive: true });
    window.addEventListener("resize", updateActiveTopic);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveTopic);
      window.removeEventListener("resize", updateActiveTopic);
    };
  }, [query]);

  useEffect(() => {
    function revealLinkedAnswer() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ block: "start" });
      }
    }
    revealLinkedAnswer();
    window.addEventListener("hashchange", revealLinkedAnswer);
    return () => window.removeEventListener("hashchange", revealLinkedAnswer);
  }, []);

  function goToTopic(id: string) {
    setQuery("");
    setActiveId(id);
    requestAnimationFrame(() => {
      window.history.replaceState(null, "", `#${id}`);
      const target = document.getElementById(id);
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      target?.focus({ preventScroll: true });
    });
  }

  return (
    <div className="faq-editorial-explorer">
      <div className="faq-editorial-search">
        <label htmlFor="faq-search">Search frequently asked questions</label>
        <div className="faq-editorial-search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          <input id="faq-search" type="search" placeholder="Search frequently asked questions…" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" aria-controls="faq-answers" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear FAQ search">×</button> : null}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true">
          {terms.length ? `${answerCount} ${answerCount === 1 ? "answer" : "answers"} across ${topicCount} ${topicCount === 1 ? "topic" : "topics"}` : "14 topics. A little help with every detail."}
        </p>
      </div>
      <div className="faq-editorial-layout">
        <aside className="faq-editorial-sidebar">
          <nav aria-label="Browse FAQ topics">
            <p className="faq-editorial-browse-label">Browse Topics</p>
            <ol>
              {faqCategories.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} aria-current={activeId === category.id ? "location" : undefined} onClick={(event) => { event.preventDefault(); goToTopic(category.id); }}>
                    <span>{category.number}</span>{category.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="faq-editorial-mobile-topics">
          <label htmlFor="faq-topic-select">Browse Topics</label>
          <select id="faq-topic-select" value={activeId} onChange={(event) => goToTopic(event.target.value)}>
            {faqCategories.map((category) => <option key={category.id} value={category.id}>{category.number} / {category.title}</option>)}
          </select>
        </div>
        <div id="faq-answers" className="faq-editorial-answers">
          {categories.map((category) => (
            <section className="faq-editorial-topic" id={category.id} key={category.id} hidden={category.items.length === 0} tabIndex={-1} aria-labelledby={`${category.id}-title`} data-evidence-source="client-intake-and-approved-policy" {...(category.id === "setup-logistics" ? { "data-measurement-section": "logistics", "data-section-id": "shared-setup-logistics" } : {})}>
              <header>
                <p className="faq-editorial-topic-label">{category.number} / {category.title}</p>
                <h2 id={`${category.id}-title`}>{category.title}</h2>
                <p>{category.description}</p>
              </header>
              <FaqAccordion items={category.items} showNumbers={false} indicatorElement="i" />
            </section>
          ))}
          {answerCount === 0 ? <div className="faq-editorial-empty"><h2>No answers found just yet.</h2><p>Try a different word or browse all our topics.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div> : null}
        </div>
      </div>
    </div>
  );
}
