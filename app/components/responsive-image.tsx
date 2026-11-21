import Image from "next/image";
import type { ReactNode } from "react";
import { responsiveImageSources } from "../responsive-image-sources";
import {
  isPublishableImage,
  type ResponsiveImageAsset,
} from "../image-system";

export function ResponsiveImage({
  asset,
  className,
  fallback = null,
  fill = false,
  fullResolution = false,
}: {
  asset: ResponsiveImageAsset;
  className?: string;
  fallback?: ReactNode;
  fill?: boolean;
  fullResolution?: boolean;
}) {
  if (!isPublishableImage(asset)) {
    return fallback;
  }

  const loading = asset.priority ? "eager" : "lazy";
  const fetchPriority = asset.priority ? "high" : "auto";

  const responsive = !fullResolution && asset.src ? responsiveImageSources(asset.src) : null;
  if (responsive) {
    // Native srcset selects pre-generated files, including for assets formerly marked unoptimized.
    // eslint-disable-next-line @next/next/no-img-element
    return <img
      alt={asset.alt}
      className={className}
      decoding="async"
      fetchPriority={fetchPriority}
      height={asset.height}
      loading={loading}
      sizes={asset.sizes}
      src={responsive.src}
      srcSet={responsive.srcSet}
      width={asset.width}
      style={fill ? { height: "100%", inset: 0, objectFit: "cover", position: "absolute", width: "100%" } : undefined}
    />;
  }

  if (fill) {
    return (
      <Image
        alt={asset.alt}
        className={className}
        fetchPriority={fetchPriority}
        height={asset.height}
        loading={loading}
        quality={asset.quality}
        sizes={asset.sizes}
        src={asset.src}
        style={{
          height: "100%",
          inset: 0,
          objectFit: "cover",
          position: "absolute",
          width: "100%",
        }}
        unoptimized={fullResolution || asset.unoptimized}
        width={asset.width}
      />
    );
  }

  return (
    <Image
      alt={asset.alt}
      className={className}
      fetchPriority={fetchPriority}
      height={asset.height}
      loading={loading}
      quality={asset.quality}
      sizes={asset.sizes}
      src={asset.src}
      unoptimized={fullResolution || asset.unoptimized}
      width={asset.width}
    />
  );
}
