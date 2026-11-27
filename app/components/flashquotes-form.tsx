"use client";

export const flashquotesFormUrl = "https://app.flashquotes.com/forms/public/quote/cmwm8ouxk000ejn08w92we5ed";

// Isolate the provider's DOM and event listeners from React. about:srcdoc also
// avoids the provider script's localhost-only development URL override.
const embedDocument = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
html,body{margin:0;padding:0;width:100%;background:transparent}iframe{display:block;width:100%!important;min-width:0!important;max-width:100%!important;height:650px!important;min-height:650px!important;border:0}
</style></head><body><script form-id="cmwm8ouxk000ejn08w92we5ed" src="https://app.flashquotes.com/embed.js"></script></body></html>`;

export function FlashquotesEmbed({ inline = false }: { inline?: boolean }) {
  return (
    <>
      <iframe className={`flashquotes-form-frame${inline ? " flashquotes-form-frame-inline" : ""}`} title="Experiences by Luxe event inquiry form" srcDoc={embedDocument} />
      <p className="flashquotes-form-fallback">Having trouble loading the form? <a href={flashquotesFormUrl} target="_blank" rel="noopener noreferrer">Open it in a new tab</a></p>
    </>
  );
}

export function FlashquotesForm({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  return (
    <div className="home-quote-modal-inner flashquotes-modal-inner">
      <header className="flashquotes-modal-header">
        <h2 id={titleId}>Plan your event</h2>
        <button className="home-quote-modal-close" type="button" aria-label="Close quote form" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <FlashquotesEmbed />
    </div>
  );
}
