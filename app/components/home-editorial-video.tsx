"use client";

import { useEffect, useRef, useState } from "react";
import { MediaControlIcon } from "./media-control-icon";
import { optimizedPosterSource, responsiveImageSources } from "../responsive-image-sources";

export function HomeEditorialVideo({
  mp4,
  webm,
  poster,
  label,
  fadeIn = false,
  playOnce = false,
  autoPlayEnabled = true,
  onPlaybackStart,
  onPlaybackEnd,
  disabled = false,
}: {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
  fadeIn?: boolean;
  playOnce?: boolean;
  autoPlayEnabled?: boolean;
  onPlaybackStart?: () => void;
  onPlaybackEnd?: () => void;
  disabled?: boolean;
}) {
  const posterImage = responsiveImageSources(poster);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);
  const hasEndedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!autoPlayEnabled) video.pause();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoadedRef.current) {
            video.load();
            hasLoadedRef.current = true;
          }

          if (autoPlayEnabled && !hasEndedRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            void video.play().catch(() => undefined);
          }
        } else {
          if (!playOnce) setHasStarted(false);
          video.pause();
          if (!playOnce) video.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [playOnce, autoPlayEnabled]);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      if (hasEndedRef.current) {
        video.currentTime = 0;
        hasEndedRef.current = false;
        setHasEnded(false);
      }
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
        loop={!playOnce}
        muted
        onEnded={() => {
          hasEndedRef.current = true;
          setHasEnded(true);
          setIsPlaying(false);
          setHasStarted(false);
          onPlaybackEnd?.();
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => {
          setIsPlaying(true);
          onPlaybackStart?.();
        }}
        onPlaying={() => setHasStarted(true)}
        playsInline
        poster={optimizedPosterSource(poster)}
        preload="none"
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      {fadeIn ? (
        // Native srcset uses the same pre-generated renditions as site photography.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          aria-hidden="true"
          className="home-editorial-video-poster"
          data-video-started={hasStarted}
          decoding="async"
          loading="lazy"
          width={posterImage?.width}
          height={posterImage?.height}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          sizes="(max-width: 700px) calc(100vw - 2rem), 50vw"
          src={posterImage?.src ?? poster}
          srcSet={posterImage?.srcSet}
        />
      ) : null}
      <button
        type="button"
        disabled={disabled}
        className={`home-editorial-video-control${hasEnded ? " home-editorial-video-replay" : ""}`}
        aria-label={hasEnded ? `Replay ${label}` : isPlaying ? `Pause ${label}` : `Play ${label}`}
        onClick={togglePlayback}
      >
        <span aria-hidden="true"><MediaControlIcon action={hasEnded ? "replay" : isPlaying ? "pause" : "play"} />{hasEnded ? " Replay" : null}</span>
      </button>
    </>
  );
}
