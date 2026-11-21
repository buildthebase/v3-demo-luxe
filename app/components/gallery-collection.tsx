"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  galleryFilters,
  galleryGroups,
  type GalleryFilter,
  type GalleryGroup,
  type GalleryMedia,
} from "../gallery/gallery-content";
import { filterGalleryGroups, galleryPhotosForGroups, serviceFilters } from "../gallery/gallery-filtering";
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
          <video controls playsInline muted preload="none" width={item.width} height={item.height} poster={item.src ?? undefined} aria-label={item.alt}>
            {item.video.sources.map(source => <source key={source.src} src={source.src} type={source.type} />)}
            Your browser does not support video playback.
          </video>
        ) : isPublishableImage(item) ? (
          <button type="button" className="gallery-photo-open" aria-haspopup="dialog" aria-label={`Open photo: ${item.caption}`} onClick={event => onOpen(item.id, event.currentTarget)}>
            <ResponsiveImage asset={{ ...item, alt: galleryPhotoAlt(item) }} />
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
  const filterDropdown = useRef<HTMLDivElement | null>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterLayout, setFilterLayout] = useState({ above: false, maxHeight: 0 });

  useEffect(() => {
    const dropdown = filterDropdown.current;
    if (!filterMenuOpen || !dropdown) return;
    const close = () => setFilterMenuOpen(false);
    const dismissOutside = (event: Event) => {
      if (!(event.target instanceof Node) || !dropdown.contains(event.target)) close();
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      if (dropdown.contains(document.activeElement)) dropdown.querySelector<HTMLButtonElement>(".gallery-filter-trigger")?.focus();
    };
    const dismissAfterTab = (event: KeyboardEvent) => {
      if (event.key === "Tab" && !dropdown.contains(document.activeElement)) close();
    };
    document.addEventListener("pointerdown", dismissOutside, true);
    document.addEventListener("keyup", dismissAfterTab);
    document.addEventListener("scroll", dismissOutside, true);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside, true);
      document.removeEventListener("keyup", dismissAfterTab);
      document.removeEventListener("scroll", dismissOutside, true);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [filterMenuOpen]);
  const visibleGroups = filterGalleryGroups(galleryGroups, activeFilters);
  const selectableFilters = galleryFilters.filter((filter) => filter.value !== "all");
  const photos = galleryPhotosForGroups(visibleGroups);
  const mediaCount = new Set(visibleGroups.flatMap(group => group.media.map(item => item.video ? item.id : item.src))).size;

  const toggleFilter = (filter: GalleryFilter) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  };

  return (
    <>
      <section className="gallery-filter-panel" id="gallery-collections" aria-labelledby="gallery-filter-title">
        <div>
          <h2 id="gallery-filter-title">Explore Our Collections</h2>
          <p role="status" aria-live="polite" aria-atomic="true">
            {mediaCount} {mediaCount === 1 ? "photo or film" : "photos & films"} in {visibleGroups.length} {visibleGroups.length === 1 ? "collection" : "collections"}.
          </p>
        </div>
        <div className="gallery-filter-dropdown" ref={filterDropdown}
          data-open={filterMenuOpen}
          data-placement={filterLayout.above ? "above" : "below"}
          style={filterLayout.maxHeight > 0 ? { "--gallery-filter-available-height": `${filterLayout.maxHeight}px` } as CSSProperties : undefined}
          >
          <button type="button" className="gallery-filter-trigger" aria-expanded={filterMenuOpen} aria-controls="gallery-filter-options"
            onClick={event => {
            if (filterMenuOpen) { setFilterMenuOpen(false); return; }
            const summary = event.currentTarget;
            const bounds = summary.getBoundingClientRect();
            const headerBottom = document.querySelector(".foundation-header")?.getBoundingClientRect().bottom ?? 0;
            const below = window.innerHeight - bounds.bottom - 24;
            const above = bounds.top - Math.max(16, headerBottom + 16) - 8;
            const openAbove = below < 320 && above > below;
            setFilterLayout({ above: openAbove, maxHeight: Math.max(1, openAbove ? above : below) });
            setFilterMenuOpen(true);
          }}>

            <span>Filter gallery</span>
            <small>
              {activeFilters.length === 0
                ? "All"
                : `${activeFilters.length} selected`}
            </small>
            <i aria-hidden="true">+</i>
          </button>
          <div className="gallery-filter-menu" id="gallery-filter-options" hidden={!filterMenuOpen}>
            <div className="gallery-filter-menu-heading">
              <p>Select one or more</p>
              {activeFilters.length > 0 ? (
                <button type="button" onClick={() => setActiveFilters([])}>
                  Clear
                </button>
              ) : null}
            </div>
            <p className="gallery-filter-help">Filter by service, occasion, or both.</p>
            {(["Service", "Occasion"] as const).map(category => (
              <fieldset className="gallery-filter-category" key={category}>
                <legend>{category}</legend>
                <div className="gallery-filters">
                  {selectableFilters.filter(filter => serviceFilters.includes(filter.value) === (category === "Service")).map(filter => (
                    <label key={filter.value} data-event-name="gallery_filter" data-filter-type={category.toLowerCase()} data-filter-value={filter.value}>
                      <input type="checkbox" checked={activeFilters.includes(filter.value)} onChange={() => toggleFilter(filter.value)} />
                      <span>{filter.label}</span><i aria-hidden="true" />
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
        {activeFilters.length > 0 ? <div className="gallery-active-filters" aria-label="Selected gallery filters">
          {activeFilters.map(filter => <button type="button" key={filter} onClick={() => toggleFilter(filter)} aria-label={`Remove ${galleryFilters.find(item => item.value === filter)?.label} filter`}>
            {galleryFilters.find(item => item.value === filter)?.label}<span aria-hidden="true">×</span>
          </button>)}
          <button type="button" onClick={() => setActiveFilters([])}>Clear all</button>
        </div> : null}
      </section>

      <section
        className="gallery-groups"
        id="gallery-groups"
        aria-label="Luxe event experience groups"
      >
        {visibleGroups.length === 0 && (
          <div className="gallery-empty-state" role="status">
            <h2>No photos or films match these filters.</h2>
            <p>Try a different service or occasion, or return to the complete gallery.</p>
            <button type="button" onClick={() => setActiveFilters([])}>
              Show the complete gallery
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
                <p>{group.context} <span className="gallery-collection-count">/ {group.media.length} {group.media.length === 1 ? "moment" : "moments"}</span></p>
                <h2 className="foundation-wide-heading">
                  <button type="button" className="gallery-group-toggle" aria-expanded={open} aria-controls={`gallery-content-${group.id}`}
                    onClick={() => setOpenGroups(current => {
                      const next = new Set(current);
                      if (next.has(group.id)) next.delete(group.id);
                      else next.add(group.id);
                      return next;
                    })}>
                    <span className="gallery-group-title">{group.title}</span>
                    {!open ? <span className="gallery-group-previews" aria-hidden="true">
                      {group.media.filter(item => isPublishableImage(item)).slice(0, 3).map(item => <span className="gallery-group-preview" key={item.id}>
                        <ResponsiveImage asset={{ ...item, src: item.previewSrc, unoptimized: true, alt: "", priority: false, sizes: "(max-width: 700px) 64px, 88px" }} fill />
                      </span>)}
                    </span> : null}
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
                      setSelectedPhoto(photos.find(photo => photo.id === id)?.id ?? photos.find(photo => photo.src === group.media.find(media => media.id === id)?.src)?.id ?? id);
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
