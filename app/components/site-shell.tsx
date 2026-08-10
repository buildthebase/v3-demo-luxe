import Link from "next/link";
import { siteConfig } from "../site-config";
import { PageBreadcrumbs } from "./breadcrumb-navigation";
import { MobileNavigation, PrimaryNavigation } from "./site-navigation";
import { InstagramLinks } from "./social-links";

export function SiteShell({
  breadcrumbPath,
  children,
}: {
  breadcrumbPath?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="foundation-shell">
      <a className="foundation-skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="foundation-header">
        <Link href="/" className="foundation-wordmark" aria-label="Luxe Event Co. home">
          <span>Luxe</span>
          <small>Event Co.</small>
        </Link>
        <div className="foundation-header-actions">
          <PrimaryNavigation variant="desktop" />
          <InstagramLinks className="foundation-header-socials" />
        </div>
        <MobileNavigation />
      </header>
      <div className="foundation-main-target" id="main-content" tabIndex={-1}>
        {breadcrumbPath && <PageBreadcrumbs path={breadcrumbPath} />}
        {children}
      </div>
      <footer className="foundation-footer">
        <div className="foundation-footer-identity">
          <span className="foundation-footer-wordmark">{siteConfig.name}</span>
          <span className="foundation-footer-location">{siteConfig.location}</span>
          <p>Coffee, dessert, and refined event settings, planned as one.</p>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Contact</span>
          <nav className="foundation-footer-contact" aria-label="Contact Luxe Event Co.">
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </nav>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Explore our experiences</span>
          <nav className="foundation-footer-experiences" aria-label="Explore Luxe experiences">
            <Link href="/experiences/coffee-bar">
              COFFEE BAR
            </Link>
            <Link href="/experiences/sweet-cart">
              SWEET CART
            </Link>
            <Link href="/experiences/seating-rentals">
              SEATING RENTALS
            </Link>
          </nav>
        </div>
        <div className="foundation-footer-actions">
          <Link className="foundation-footer-cta" href="/contact">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </Link>
          <InstagramLinks className="foundation-footer-instagram" />
        </div>
        <div className="foundation-footer-bottom">
          <p>
            Designed and built by{" "}
            <a href="https://buildthebase.io" target="_blank" rel="noreferrer">
              buildthebase.io
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

type FoundationIntroProps = {
  eyebrow: string;
  title: string;
  titleLines?: readonly [string, string];
  description: string;
};

export function FoundationIntro({ eyebrow, title, titleLines, description }: FoundationIntroProps) {
  return (
    <header className="foundation-intro">
      <p className="foundation-eyebrow">{eyebrow}</p>
      <h1
        className={titleLines ? "foundation-title-controlled" : undefined}
        aria-label={titleLines ? title : undefined}
      >
        {titleLines
          ? titleLines.map((line) => (
              <span className="foundation-title-line" aria-hidden="true" key={line}>
                {line}
              </span>
            ))
          : title}
      </h1>
      <p>{description}</p>
    </header>
  );
}

export function FoundationLabel({ children }: { children: React.ReactNode }) {
  return <p className="foundation-label">{children}</p>;
}
