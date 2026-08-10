import Link from "next/link";

export function BlogJournalInquiry() {
  return (
    <section className="blog-journal-inquiry" aria-labelledby="blog-inquiry-title">
      <div>
        <p>Planning something of your own?</p>
        <h2 id="blog-inquiry-title">Bring the conversation to your event.</h2>
      </div>
      <Link href="/contact" data-event-name="inquiry_start">
        Plan Your Event <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}
