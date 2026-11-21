import type { Metadata } from "next";
import { BrandActivationsPage } from "../../components/brand-activations-page";

export const metadata: Metadata = {
  title: "Brand Activations | Condensed comparison | Experiences by Luxe",
  description: "A local comparison of a more concise Brand Activations page.",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: "/events/brand-activations" },
};

export default function BrandActivationsComparisonPage() {
  return <BrandActivationsPage comparison />;
}
