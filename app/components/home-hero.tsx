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
  const [introReady, setIntroReady] = useState(false);
  const [mobileClip, setMobileClip] = useState(0);
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

    const introVideos = videos.current.slice(0, finalPhase).flatMap(layers => layers[0] ? [layers[0]] : []);
    let started = false;
    const startWhenReady = () => {
      if (started || introVideos.some(video => video.readyState < 3 && !video.error)) return;
      started = true;
      setIntroReady(true);
      timers.current = homeHeroTimeline.phaseStartsMs.slice(1).map((start, index) =>
        window.setTimeout(() => setPhase(index + 1), start),
      );
    };
    introVideos.forEach(video => {
      video.addEventListener("canplay", startWhenReady);
      video.addEventListener("error", startWhenReady);
    });
    startWhenReady();

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      introVideos.forEach(video => {
        video.removeEventListener("canplay", startWhenReady);
        video.removeEventListener("error", startWhenReady);
      });
    };
  }, [finalPhase]);

  useEffect(() => {
    if (!introReady && phase !== finalPhase) return;
    const connection = (navigator as NavigatorWithConnection).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType || "")) return;

    let disposed = false;
    let frame = 0;
    const desktopQuery = window.matchMedia("(min-width: 821px)");
    const groups = videos.current.slice(0, finalPhase).flatMap((layers, mediaIndex) => {
      const [primary, secondary] = layers;
      return primary && secondary ? [{ primary, secondary, mediaIndex }] : [];
    });
    const play = (video: HTMLVideoElement, mediaIndex: number) => {
      void video.play().catch(() => {
        if (!disposed) setFailedMedia(current => new Set(current).add(homeHeroMedia[mediaIndex].id));
      });
    };
    const clearTimers = () => {
      loopTimers.current.forEach(window.clearTimeout);
      loopTimers.current = [];
      window.cancelAnimationFrame(frame);
    };
    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        loopTimers.current = loopTimers.current.filter(item => item !== timer);
        if (!disposed) callback();
      }, delay);
      loopTimers.current.push(timer);
    };
    const prepare = (video: HTMLVideoElement, visible: boolean) => {
      video.pause();
      video.style.transitionDuration = "0ms";
      video.style.zIndex = "2";
      video.style.opacity = visible ? "1" : "0";
      video.currentTime = 0;
    };
    const configure = () => {
      clearTimers();
      if (phase !== finalPhase) {
        const group = groups.find(item => item.mediaIndex === phase);
        if (group) {
          prepare(group.primary, true);
          prepare(group.secondary, false);
          play(group.primary, phase);
        }
        // Keep the outgoing clip moving until its panel fade finishes.
        later(() => groups.forEach(item => {
          if (item.mediaIndex !== phase) item.primary.pause();
        }), homeHeroTimeline.crossfadeMs);
        return;
      }
      if (!groups.length || groups.some(item => !Number.isFinite(item.primary.duration) || item.primary.duration <= 0)) return;
      const durationMs = Math.min(...groups.map(item => item.primary.duration)) * 1000;
      const fadeMs = homeHeroTimeline.loopCrossfadeMs;
      if (!desktopQuery.matches) {
        groups.forEach(item => {
          prepare(item.primary, true);
          prepare(item.secondary, false);
        });
        let index = 0;
        const showNext = () => {
          const item = groups[index];
          prepare(item.primary, true);
          play(item.primary, item.mediaIndex);
          setMobileClip(item.mediaIndex);
          later(() => {
            groups.forEach(other => {
              if (other !== item) other.primary.pause();
            });
          }, fadeMs);
          index = (index + 1) % groups.length;
          later(showNext, durationMs);
        };
        showNext();
        return;
      }
      groups.forEach(item => {
        // The secondary layer is already cued at frame zero during the intro.
        // Reveal it before rewinding the primary layer so no seek is visible
        // as Sip and Indulge fade into the final three-panel view.
        item.secondary.style.transitionDuration = "0ms";
        item.secondary.style.zIndex = "3";
        item.secondary.style.opacity = "1";
        play(item.secondary, item.mediaIndex);
        prepare(item.primary, false);
      });
      let primaryOutgoing = false;
      const startedAt = performance.now();
      let cycle = 1;
      const crossfade = () => {
        const outgoingPrimary = primaryOutgoing;
        groups.forEach(item => {
          const incoming = outgoingPrimary ? item.secondary : item.primary;
          const outgoing = outgoingPrimary ? item.primary : item.secondary;
          // Explicitly reorder both layers on every turn. Otherwise the later
          // sibling can cover the incoming frame on alternate loops.
          outgoing.style.transitionDuration = "0ms";
          outgoing.style.zIndex = "2";
          outgoing.style.opacity = "1";
          // Incoming layers have already been reset while hidden.
          incoming.style.transitionDuration = "0ms";
          incoming.style.zIndex = "3";
          incoming.style.opacity = "0";
          play(incoming, item.mediaIndex);
        });
        frame = window.requestAnimationFrame(() => {
          groups.forEach(item => {
            const incoming = outgoingPrimary ? item.secondary : item.primary;
            const blendMs = homeHeroMedia[item.mediaIndex].id === "seating"
              ? homeHeroTimeline.gatherLoopCrossfadeMs
              : fadeMs;
            incoming.style.transitionDuration = `${blendMs}ms`;
            incoming.style.transitionTimingFunction = "ease-in-out";
            incoming.style.opacity = "1";
            later(() => {
              const outgoing = outgoingPrimary ? item.primary : item.secondary;
              prepare(outgoing, false);
            }, blendMs);
          });
        });
        primaryOutgoing = !primaryOutgoing;
        cycle += 1;
        // Every group shares one fixed cadence, independent of fade length.
        later(crossfade, Math.max(0, startedAt + cycle * durationMs - performance.now()));
      };
      later(crossfade, durationMs);
    };
    configure();
    groups.forEach(item => item.primary.addEventListener("loadeddata", configure));
    desktopQuery.addEventListener("change", configure);
    return () => {
      disposed = true;
      clearTimers();
      groups.forEach(item => item.primary.removeEventListener("loadeddata", configure));
      desktopQuery.removeEventListener("change", configure);
    };
  }, [finalPhase, introReady, phase]);
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
      data-mobile-clip={homeHeroMedia[mobileClip].id}
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
                      loop={!finalState}
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
