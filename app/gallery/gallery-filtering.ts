import { isPublishableImage } from "../image-system";
import type { GalleryFilter, GalleryGroup, GalleryMedia } from "./gallery-content";

export const serviceFilters: readonly GalleryFilter[] = ["coffee-bar", "sweet-cart", "seating-rentals"];

export function matchesGalleryFilters(item: GalleryMedia, filters: readonly GalleryFilter[]) {
  const services = filters.filter(filter => serviceFilters.includes(filter));
  const occasions = filters.filter(filter => filter !== "all" && !serviceFilters.includes(filter));
  return (!services.length || services.some(filter => item.tags.includes(filter))) &&
    (!occasions.length || occasions.some(filter => item.tags.includes(filter)));
}

export function filterGalleryGroups(groups: readonly GalleryGroup[], filters: readonly GalleryFilter[]) {
  return groups.map(group => ({ ...group, media: group.media.filter(item => matchesGalleryFilters(item, filters)) }))
    .filter(group => group.media.length > 0);
}

// Keep the first editorial occurrence as the stable popup record. Detail
// collections reuse these sources and never create a second viewer slide.
export function galleryPhotosForGroups(groups: readonly GalleryGroup[]): GalleryMedia[] {
  const seen = new Set<string>();
  return groups.flatMap(group => group.media.filter(item => {
    if (item.video || !isPublishableImage(item) || seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  }));
}
