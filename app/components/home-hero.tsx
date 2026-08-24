"use client";

import { useEffect, useRef, useState } from "react";
import { homeHeroMedia, homeHeroTimeline } from "../home-hero-media";
import { CredibilityStrip } from "./signature-elements";

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

export function HomeHero() {
  const [phase, setPhase] = useState(0);
  const [sequenceSkipped, setSequenceSkipped] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [failedMedia, setFailedMedia] = useState<Set<string>>(() => new Set());
  const timers = useRef<number[]>([]);
  const loopTimers = useRef<number[]>([]);
  const videos = useRef<Array<Array<HTMLVideoElement | null>>>([]);
  const quoteDialog = useRef<HTMLDialogElement>(null);
  const finalPhase = homeHeroTimeline.finalPhaseIndex;
  const finalState = phase === finalPhase;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const saveData = connection?.saveData === true;
    const constrainedNetwork =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (reducedMotion || saveData || constrainedNetwork) {
      const fallbackTimer = window.setTimeout(() => {
        setSequenceSkipped(true);
        setPhase(finalPhase);
      }, 0);

      return () => window.clearTimeout(fallbackTimer);
    }

    timers.current = homeHeroTimeline.phaseStartsMs.slice(1).map((start, index) =>
      window.setTimeout(() => setPhase(index + 1), start),
    );

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [finalPhase]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const playbackDisabled =
      reducedMotion ||
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    const desktopQuery = window.matchMedia("(min-width: 821px)");

    const clearLoopTimers = () => {
      loopTimers.current.forEach(window.clearTimeout);
      loopTimers.current = [];
    };

    const scheduleLoopTimer = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        loopTimers.current = loopTimers.current.filter((item) => item !== timer);
        callback();
      }, delay);

      loopTimers.current.push(timer);
    };

    const resetVideoLayers = () => {
      videos.current.forEach((layers) => {
        layers.forEach((video, layerIndex) => {
          if (!video) {
            return;
          }

          video.pause();
          video.style.opacity = layerIndex === 0 ? "1" : "0";
          video.style.transitionDuration = "";
        });
      });
    };

    const playVideo = (video: HTMLVideoElement, mediaIndex: number) => {
      void video.play().catch(() => {
        setFailedMedia((current) =>
          new Set(current).add(homeHeroMedia[mediaIndex].id),
        );
      });
    };

    const startSeamlessLoop = (mediaIndex: number) => {
      const layers = videos.current[mediaIndex];
      const primary = layers?.[0];
      const secondary = layers?.[1];

      if (!primary || !secondary) {
        return;
      }

      const crossfadeMs = homeHeroTimeline.loopCrossfadeMs;

      primary.currentTime = 0;
      secondary.currentTime = 0;
      primary.style.opacity = "1";
      secondary.style.opacity = "0";
      primary.style.transitionDuration = `${crossfadeMs}ms`;
      secondary.style.transitionDuration = `${crossfadeMs}ms`;
      playVideo(primary, mediaIndex);

      const scheduleCrossfade = (
        outgoing: HTMLVideoElement,
        incoming: HTMLVideoElement,
      ) => {
        const outgoingDuration =
          Number.isFinite(outgoing.duration) && outgoing.duration > 0
            ? outgoing.duration
            : homeHeroTimeline.finalClipDurationMs / 1000;
        const timeUntilFade = Math.max(
          250,
          (outgoingDuration - outgoing.currentTime) * 1000 - crossfadeMs,
        );

        scheduleLoopTimer(() => {
          incoming.currentTime = 0;
          incoming.style.opacity = "0";
          playVideo(incoming, mediaIndex);

          window.requestAnimationFrame(() => {
            incoming.style.opacity = "1";
            outgoing.style.opacity = "0";
          });

          scheduleLoopTimer(() => {
            outgoing.pause();
            outgoing.currentTime = 0;
            scheduleCrossfade(incoming, outgoing);
          }, crossfadeMs);
        }, timeUntilFade);
      };

      scheduleCrossfade(primary, secondary);
    };

    const configurePlayback = () => {
      clearLoopTimers();
      resetVideoLayers();

      if (playbackDisabled) {
        return;
      }

      if (phase === finalPhase && desktopQuery.matches) {
        for (let index = 0; index < finalPhase; index += 1) {
          startSeamlessLoop(index);
        }
        return;
      }

      videos.current.forEach((layers, index) => {
        const primary = layers[0];
        if (!primary) {
          return;
        }

        const shouldPlay =
          index === phase || (phase === finalPhase && index < finalPhase);

        if (shouldPlay) {
          primary.currentTime = 0;
          playVideo(primary, index);
        }
      });
    };

    configurePlayback();
    desktopQuery.addEventListener("change", configurePlayback);

    return () => {
      desktopQuery.removeEventListener("change", configurePlayback);
      clearLoopTimers();
      resetVideoLayers();
    };
  }, [finalPhase, phase]);

  useEffect(() => {
    const dialog = quoteDialog.current;

    if (!dialog) {
      return;
    }

    if (quoteModalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!quoteModalOpen && dialog.open) {
      dialog.close();
    }
  }, [quoteModalOpen]);

  function skipIntro() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setSequenceSkipped(true);
    setPhase(finalPhase);
  }

  function markMediaFailed(id: string) {
    setFailedMedia((current) => new Set(current).add(id));
  }

  return (
    <section
      id="page-overview"
      className="home-hero home-cinematic-hero"
      aria-labelledby="home-title"
      data-phase={homeHeroMedia[phase].id}
      data-sequence-skipped={sequenceSkipped ? "true" : "false"}
    >
      <p className="home-cinematic-media-alternative">
        Luxe Event Co. brings together crafted coffee service, a live dessert
        experience, and intentional seating and event rentals. The muted hero films
        provide atmosphere only; this page contains the complete service information.
      </p>
      <div className="home-cinematic-stage">
        <div className="home-cinematic-media-grid" aria-hidden="true">
          {homeHeroMedia.map((media, index) => {
            const hasVideo = media.sources.length > 0 && !failedMedia.has(media.id);
            const active = index === phase;

            return (
              <div
                className={`home-cinematic-panel home-cinematic-panel-${media.id}${
                  active ? " is-active" : ""
                }`}
                data-placement={media.placement}
                key={media.id}
              >
                <div className="home-cinematic-placeholder">
                  {media.label ? <span>{media.label}</span> : null}
                  <i />
                  <i />
                  <i />
                </div>
                {hasVideo ? (
                  [0, 1].map((layerIndex) => (
                    <video
                      className={`home-cinematic-video home-cinematic-video-${
                        layerIndex === 0 ? "primary" : "secondary"
                      }`}
                      ref={(node) => {
                        videos.current[index] ??= [];
                        videos.current[index][layerIndex] = node;
                      }}
                      muted
                      loop
                      playsInline
                      preload={index < 3 ? "auto" : "none"}
                      poster={media.poster ?? undefined}
                      onError={() => markMediaFailed(media.id)}
                      key={`${media.id}-${layerIndex}`}
                    >
                      {media.sources.map((source) => (
                        <source src={source.src} type={source.type} key={source.src} />
                      ))}
                    </video>
                  ))
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="home-cinematic-copy">
          <h1 id="home-title" aria-label="Sip, Indulge, Gather.">
            <span className="home-cinematic-title-accessible">Sip, Indulge, Gather.</span>
            {homeHeroMedia.slice(0, 3).map((media, index) => (
              <span
                className={`home-cinematic-word home-cinematic-word-${media.id}${
                  phase >= index ? " is-visible" : ""
                }`}
                aria-hidden="true"
                key={media.id}
              >
                {media.word}
              </span>
            ))}
          </h1>
          <div
            className={`home-cinematic-description${finalState ? " is-visible" : ""}`}
            aria-hidden={finalState ? undefined : "true"}
          >
            <h2 className="foundation-wide-heading" id="home-hero-seo-title">
              Luxury event experiences, elegantly composed with mobile coffee bars,
              live dessert carts &amp; event rentals across Toronto &amp; Southern Ontario.
            </h2>
            <p>
              Staffed service, refined presentation, and thoughtful guest flow from
              first setup to final service.
            </p>
          </div>
        </div>

        <div
          className={`home-hero-actions home-cinematic-actions${
            finalState ? " is-visible" : ""
          }`}
          aria-hidden={finalState ? undefined : "true"}
        >
          <button
            type="button"
            className="home-button home-button-primary"
            data-event-name="inquiry_start"
            tabIndex={finalState ? 0 : -1}
            onClick={() => setQuoteModalOpen(true)}
            aria-haspopup="dialog"
          >
            PLAN YOUR EVENT
            <span aria-hidden="true">↗︎</span>
          </button>
        </div>

        {!finalState ? (
          <button className="home-cinematic-skip" type="button" onClick={skipIntro}>
            Skip intro
          </button>
        ) : null}
      </div>

      <CredibilityStrip variant="hero" />

      <dialog
        className="home-quote-modal"
        ref={quoteDialog}
        aria-labelledby="home-quote-modal-title"
        onClose={() => setQuoteModalOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setQuoteModalOpen(false);
          }
        }}
      >
        <div className="home-quote-modal-inner">
          <button
            className="home-quote-modal-close"
            type="button"
            aria-label="Close quote form placeholder"
            onClick={() => setQuoteModalOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="foundation-label">Plan your event</p>
          <h2 id="home-quote-modal-title">Your quote will begin here.</h2>
          <p>
            This popup will contain the Flashquotes quote form, or a similar quote
            platform, once the final provider is selected and connected.
          </p>
          <div className="home-quote-modal-placeholder">
            <span aria-hidden="true">↗︎</span>
            <strong>Quote form integration placeholder</strong>
            <small>No information is collected or submitted yet.</small>
          </div>
        </div>
      </dialog>
    </section>
  );
}
