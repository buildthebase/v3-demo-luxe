import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "./components/site-shell";

export const metadata: Metadata = {
  title: "Page Not Found | Experiences by Luxe",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <SiteShell>
      <main className="not-found-page">
        <p>404 / Page not found</p>
        <h1>
          <span>This page is not</span>
          <span>part of the gathering.</span>
        </h1>
        <p>
          Return to Experiences by Luxe or explore the coffee, dessert, and seating
          experiences available for your event.
        </p>
        <div>
          <Link href="/">Return Home</Link>
          <Link href="/experiences">Explore Experiences</Link>
        </div>
      </main>
    </SiteShell>
  );
}
