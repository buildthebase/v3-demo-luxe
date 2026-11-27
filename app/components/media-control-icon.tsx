type MediaControl = "play" | "pause" | "replay" | "previous" | "next";

/** Drawn controls stay monochrome instead of inheriting a device's emoji font. */
export function MediaControlIcon({ action }: { action: MediaControl }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
      {action === "play" ? <path d="m9 5 11 7-11 7Z" /> : null}
      {action === "pause" ? <path d="M8 5v14M16 5v14" /> : null}
      {action === "replay" ? <path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /> : null}
      {action === "previous" ? <path d="M20 12H4m7-7-7 7 7 7" /> : null}
      {action === "next" ? <path d="M4 12h16m-7-7 7 7-7 7" /> : null}
    </svg>
  );
}
