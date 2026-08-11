import Image from "next/image";
import type { ReactNode } from "react";
import {
  isPublishableImage,
  type ResponsiveImageAsset,
} from "../image-system";

export function ResponsiveImage({
  asset,
  className,
  fallback = null,
  fill = false,
}: {
  asset: ResponsiveImageAsset;
  className?: string;
  fallback?: ReactNode;
  fill?: boolean;
}) {
  if (!isPublishableImage(asset)) {
    return fallback;
  }

  const loading = asset.priority ? "eager" : "lazy";
  const fetchPriority = asset.priority ? "high" : "auto";

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
        unoptimized={asset.unoptimized}
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
      unoptimized={asset.unoptimized}
      width={asset.width}
    />
  );
}
