import Link from "next/link";

export function HomeCaseStudy() {
  return (
    <section
      id="combinations"
      className="home-case-study"
      aria-labelledby="home-case-study-title"
      data-content-status="illustrative-placeholder"
    >
      <header className="home-case-study-heading">
        <p className="foundation-label">A Luxe occasion / Preview</p>
        <h2 id="home-case-study-title">Your event. Your way.</h2>
        <div className="home-case-study-icons" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 27h31v12a14 14 0 0 1-28 0V27Zm31 2h4a7 7 0 0 1 0 14h-5M10 55h42M23 21c-5-5 5-7 0-12m9 12c-5-5 5-7 0-12m9 12c-5-5 5-7 0-12" />
          </svg>
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 35h30l-5 22H22l-5-22Zm9 5 2 12m10-12-2 12M16 35a7 7 0 0 1-1-13 9 9 0 0 1 9-11c3-5 11-5 14 0a9 9 0 0 1 11 11 7 7 0 0 1-1 13M30 7c-1-4 2-5 5-5" />
          </svg>
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 34V12q15-7 30 0v22M18 17h28M23 20v12m9-12v12m9-12v12M14 35h36v7H14Zm5 7-3 16m29-16 3 16M20 51h24" />
          </svg>
        </div>
      </header>
      <div className="home-case-study-copy">
        <dl className="home-case-study-story">
          <div>
            <dt><span aria-hidden="true">01</span>Client request</dt>
            <dd>[placeholder]</dd>
          </div>
          <div>
            <dt><span aria-hidden="true">02</span>We recommended</dt>
            <dd>[placeholder]</dd>
          </div>
          <div>
            <dt><span aria-hidden="true">03</span>The result</dt>
            <dd>[placeholder]</dd>
          </div>
        </dl>
        <figure className="home-case-study-quote" id="review-coffee-dessert" data-content-status="placeholder">
          <div className="home-case-study-quote-label">client quote</div>
          <blockquote>
            <p>insert quote here</p>
          </blockquote>
          <figcaption>[client name]</figcaption>
        </figure>
        <Link href="/blog" className="home-case-study-action">
          See How It Came Together <span aria-hidden="true">↗︎</span>
        </Link>
      </div>
    </section>
  );
}
