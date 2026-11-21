import type { Metadata } from "next";
import { ArchivedBrandActivationsPage } from "../../components/brand-activations-archived-page";

export const metadata: Metadata = {
  title: "Archived Brand Activations page | Experiences by Luxe",
  description: "The previous Brand Activations layout, preserved for reference.",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: "/events/brand-activations" },
};

export default function ArchivedBrandActivationsPreview() {
  return <ArchivedBrandActivationsPage />;
}
