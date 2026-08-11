"use client";

import { useEffect, useRef, useState } from "react";

export function HomeEditorialVideo({
  mp4,
  webm,
  poster,
  label,
}: {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoadedRef.current) {
            video.load();
            hasLoadedRef.current = true;
          }

          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            void video.play().catch(() => undefined);
          }
        } else {
          video.pause();
          video.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        aria-label={label}
        className="home-editorial-video"
        loop
        muted
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={poster}
        preload="none"
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        className="home-editorial-video-control"
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        onClick={togglePlayback}
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
      </button>
    </>
  );
}
