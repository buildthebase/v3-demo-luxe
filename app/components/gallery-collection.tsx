"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  galleryFilters,
  galleryGroups,
  type GalleryFilter,
  type GalleryGroup,
  type GalleryMedia,
} from "../gallery/gallery-content";
import { isPublishableImage } from "../image-system";
import { ResponsiveImage } from "./responsive-image";
import { GalleryPhotoViewer, galleryPhotoAlt } from "./gallery-photo-viewer";

function GalleryMediaFrame({
  item,
  tone,
  onOpen,
}: {
  item: GalleryMedia;
  tone: GalleryGroup["tone"];
  onOpen: (id: string, trigger: HTMLButtonElement) => void;
}) {
  return (
    <figure
      className={`gallery-media gallery-media-${tone}`}
      data-asset-status={item.status}
    >
      <div className="gallery-media-frame">
        {item.video ? (
          <video controls playsInline muted preload="none" poster={item.src ?? undefined} aria-label={item.alt}>
            {item.video.sources.map(source => <source key={source.src} src={source.src} type={source.type} />)}
            Your browser does not support video playback.
          </video>
        ) : isPublishableImage(item) ? (
          <button type="button" className="gallery-photo-open" aria-haspopup="dialog" aria-label={`Open photo: ${item.caption}`} onClick={event => onOpen(item.id, event.currentTarget)}>
            <ResponsiveImage asset={{ ...item, alt: galleryPhotoAlt(item) }} fill />
            <span className="gallery-photo-expand" aria-hidden="true">⤢</span>
          </button>
        ) : (
          <div className="gallery-media-reserved" aria-hidden="true">
            <i /><i /><i />
            <span>Reserved for verified Luxe photography</span>
          </div>
        )}
      </div>
    </figure>
  );
}

export function GalleryCollection() {
  const [activeFilters, setActiveFilters] = useState<GalleryFilter[]>([]);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photoTrigger = useRef<HTMLButtonElement | null>(null);
  const visibleGroups = galleryGroups.filter(
    (group) =>
      activeFilters.length === 0 ||
      activeFilters.some((filter) => group.tags.includes(filter)),
  );
  const selectableFilters = galleryFilters.filter((filter) => filter.value !== "all");
  const photos = visibleGroups.flatMap(group => group.media.filter(item => !item.video && isPublishableImage(item)));

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
        <details className="gallery-filter-dropdown">
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
        {visibleGroups.map((group) => {
          const open = openGroups.has(group.id);
          return (
            <article
              className={`gallery-group gallery-group-collapsible gallery-group-${group.tone}`}
              data-gallery-group={group.id}
              key={group.id}
            >
              <header>
                <p>{group.context}</p>
                <h2 className="foundation-wide-heading">
                  <button type="button" className="gallery-group-toggle" aria-expanded={open} aria-controls={`gallery-content-${group.id}`}
                    onClick={() => setOpenGroups(current => {
                      const next = new Set(current);
                      if (next.has(group.id)) next.delete(group.id);
                      else next.add(group.id);
                      return next;
                    })}>
                    <span>{group.title}</span>
                    <span className="gallery-group-toggle-symbol" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                </h2>
              </header>
              <div className="gallery-group-content" id={`gallery-content-${group.id}`} hidden={!open}>
              {open ? <>
              <p className="gallery-group-description">{group.description}</p>
              {group.media.length > 0 ? (
                <div className="gallery-group-media">
                  {group.media.map((item) => (
                    <GalleryMediaFrame item={item} tone={group.tone} key={item.id} onOpen={(id, trigger) => {
                      photoTrigger.current = trigger;
                      setSelectedPhoto(id);
                    }} />
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
                    {link.label}
                  </Link>
                ))}
              </nav>
              </> : null}
              </div>
            </article>
          );
        })}
      </section>
      {selectedPhoto ? <GalleryPhotoViewer photos={photos} initialId={selectedPhoto} onClose={() => {
        setSelectedPhoto(null);
        photoTrigger.current?.focus({ preventScroll: true });
      }} /> : null}
    </>
  );
}
