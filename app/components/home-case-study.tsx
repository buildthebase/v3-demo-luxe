import Link from "next/link";
import { HomeEditorialVideo } from "./home-editorial-video";

export function HomeCaseStudy() {
  return (
    <section id="combinations" className="home-case-study" aria-labelledby="home-case-study-title">
      <header className="home-case-study-heading">
        <p className="foundation-label">A Luxe occasion / Coffee Bar</p>
        <h2 id="home-case-study-title">Your event. Your way.</h2>
      </header>
      <div className="home-case-study-layout" id="review-coffee-dessert">
        <figure className="home-case-study-film">
          <HomeEditorialVideo
            mp4="/videos/case-studies/baby-shower-coffee-bar-v1.mp4"
            webm="/videos/case-studies/baby-shower-coffee-bar-v1.webm"
            poster="/images/case-studies/baby-shower-coffee-bar.webp"
            label="A baby shower: the setting, custom coffee cart and personalised cup branding"
          />
        </figure>
        <div className="home-case-study-copy">
          <h3>A baby shower, down to the details.</h3>
          <dl className="home-case-study-story">
            <div>
              <dt>Client request</dt>
              <dd>A coffee cart with custom signage and cup labels to match the shower’s colours and theme.</dd>
            </div>
            <div>
              <dt>We recommended</dt>
              <dd>The Luxe Coffee Bar with a custom front panel and personalised cup labels.</dd>
            </div>
            <div>
              <dt>The result</dt>
              <dd>A coffee setup that matched the shower décor, with custom details on the cart and cups.</dd>
            </div>
          </dl>
          <Link href="/blog/baby-shower-custom-coffee-bar" className="home-case-study-action">
            See How It Came Together
          </Link>
        </div>
      </div>
    </section>
  );
}
