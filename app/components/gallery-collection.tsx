"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  galleryFilters,
  galleryGroups,
  type GalleryFilter,
  type GalleryGroup,
  type GalleryMedia,
} from "../gallery/gallery-content";
import { isPublishableImage } from "../image-system";
import { ResponsiveImage } from "./responsive-image";

function GalleryMediaFrame({
  item,
  tone,
}: {
  item: GalleryMedia;
  tone: GalleryGroup["tone"];
}) {
  return (
    <figure
      className={`gallery-media gallery-media-${tone}`}
      data-asset-status={item.status}
    >
      <div className="gallery-media-frame">
        {isPublishableImage(item) ? (
          <ResponsiveImage asset={item} fill />
        ) : (
          <div className="gallery-media-reserved" aria-hidden="true">
            <i /><i /><i />
            <span>Reserved for verified Luxe photography</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{item.caption}</span>
      </figcaption>
    </figure>
  );
}

export function GalleryCollection() {
  const filterDropdownRef = useRef<HTMLDetailsElement>(null);
  const [activeFilters, setActiveFilters] = useState<GalleryFilter[]>([]);
  const visibleGroups = galleryGroups.filter(
    (group) =>
      activeFilters.length === 0 ||
      activeFilters.some((filter) => group.tags.includes(filter)),
  );
  const selectableFilters = galleryFilters.filter((filter) => filter.value !== "all");

  useEffect(() => {
    const closeFilterOnScroll = () => {
      filterDropdownRef.current?.removeAttribute("open");
    };

    window.addEventListener("scroll", closeFilterOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeFilterOnScroll);
  }, []);

  const toggleFilter = (filter: GalleryFilter) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  };

  return (
    <>
      <section className="gallery-filter-panel" aria-labelledby="gallery-filter-title">
        <div>
          <h2 id="gallery-filter-title">Explore Luxe experiences by service or occasion.</h2>
          <p role="status" aria-live="polite" aria-atomic="true">
            Showing {visibleGroups.length} {visibleGroups.length === 1 ? "group" : "groups"}.
          </p>
        </div>
        <details className="gallery-filter-dropdown" ref={filterDropdownRef}>
          <summary>
            <span>Filter gallery</span>
            <small>
              {activeFilters.length === 0
                ? "All"
                : `${activeFilters.length} selected`}
            </small>
            <i aria-hidden="true">+</i>
          </summary>
          <div className="gallery-filter-menu">
            <div className="gallery-filter-menu-heading">
              <p>Select one or more</p>
              {activeFilters.length > 0 ? (
                <button type="button" onClick={() => setActiveFilters([])}>
                  Clear
                </button>
              ) : null}
            </div>
            <div
              className="gallery-filters"
              role="group"
              aria-label="Filter gallery groups"
            >
              <label
                data-event-name="gallery_filter"
                data-filter-type="all"
                data-filter-value="all"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.length === 0}
                  onChange={() => setActiveFilters([])}
                />
                <span>All</span>
                <i aria-hidden="true" />
              </label>
              {selectableFilters.map((filter) => (
                <label
                  data-event-name="gallery_filter"
                  data-filter-type={
                    ["coffee-bar", "sweet-cart", "seating-rentals"].includes(
                      filter.value,
                    )
                      ? "experience"
                      : "event"
                  }
                  data-filter-value={filter.value}
                  key={filter.value}
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(filter.value)}
                    onChange={() => toggleFilter(filter.value)}
                  />
                  <span>{filter.label}</span>
                  <i aria-hidden="true" />
                </label>
              ))}
            </div>
          </div>
        </details>
      </section>

      <section
        className="gallery-groups"
        id="gallery-groups"
        aria-label="Luxe event experience groups"
      >
        {visibleGroups.length === 0 && (
          <div className="gallery-empty-state" role="status">
            <h2>No gallery groups match this view.</h2>
            <p>Return to the complete gallery to continue exploring Luxe events.</p>
            <button type="button" onClick={() => setActiveFilters([])}>
              Show all gallery groups
            </button>
          </div>
        )}
        {galleryGroups.map((group) => {
          const visible = visibleGroups.some((item) => item.id === group.id);
          return (
            <article
              className={`gallery-group gallery-group-${group.tone}`}
              data-gallery-group={group.id}
              hidden={!visible}
              key={group.id}
            >
              <header>
                <p>{group.context}</p>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </header>
              {group.media.length > 0 ? (
                <div className="gallery-group-media">
                  {group.media.map((item) => (
                    <GalleryMediaFrame item={item} tone={group.tone} key={item.id} />
                  ))}
                </div>
              ) : null}
              <nav aria-label={`Related pages for ${group.title}`}>
                {group.links.map((link) => (
                  <Link
                    href={link.href}
                    data-event-name="gallery_item_open"
                    data-gallery-item-id={group.id}
                    key={link.href}
                  >
                    {link.label} <span aria-hidden="true">↗︎</span>
                  </Link>
                ))}
              </nav>
            </article>
          );
        })}
      </section>
    </>
  );
}
