import Link from "next/link";
import { HomeEditorialVideo } from "./home-editorial-video";
import { QuoteModalTrigger } from "./quote-modal-trigger";

export function HomeCaseStudy() {
  return (
    <section id="combinations" className="home-case-study" aria-labelledby="home-case-study-title">
      <header className="home-case-study-heading">
        <p className="foundation-label">A Luxe occasion / Coffee Bar</p>
        <h2 id="home-case-study-title">Your Event. Your Way.</h2>
        <p className="home-case-study-supporting-line">Your guests enjoy the experience. You enjoy the moment.</p>
        <p className="home-case-study-description">From custom cart signage and branded cups to personalized menus and coordinated event details, we tailor each Luxe experience to complement your celebration or brand.</p>
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
      <div className="home-case-study-content-feature">
        <div>
          <h3>Real Events. Real Luxe Experiences.</h3>
          <p>The moments you see across our website and social media are captured at real Luxe events, showcasing our services, personalized details, and genuine guest experiences.</p>
        </div>
        <div>
          <h3>Your Experience, Captured.</h3>
          <p>Make the memories last beyond the event. Optional photo and video coverage is available to capture your Luxe experience, from custom details to guest interactions. Selected event content can be made available by the end of the evening, with deliverables confirmed during booking.</p>
          <QuoteModalTrigger className="home-case-study-coverage-action">
            ASK ABOUT EVENT CONTENT COVERAGE
          </QuoteModalTrigger>
        </div>
      </div>
    </section>
  );
}
