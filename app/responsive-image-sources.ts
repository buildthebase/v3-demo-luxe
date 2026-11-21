import imageManifest from "./generated/responsive-images.json";

type ImageVariant = { src: string; width: number; bytes: number };
type ImageEntry = { width: number; height: number; bytes: number; variants: ImageVariant[] };
const entries = imageManifest as Record<string, ImageEntry>;

/** Pre-sized local files avoid runtime transformation delays and oversized downloads. */
export function responsiveImageSources(src: string) {
  const entry = entries[src];
  if (!entry) return null;
  const variants = [...entry.variants];
  if (!variants.some((variant) => variant.width === entry.width)) {
    variants.push({ src, width: entry.width, bytes: entry.bytes });
  }
  const fallback = variants.find((variant) => variant.width >= Math.min(1280, entry.width)) ?? variants.at(-1)!;
  return {
    src: fallback.src,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    width: entry.width,
    height: entry.height,
  };
}

/** Native video posters cannot use srcset; use a crisp, bounded-size rendition. */
export function optimizedPosterSource(src: string | null | undefined) {
  return src ? responsiveImageSources(src)?.src ?? src : undefined;
}
