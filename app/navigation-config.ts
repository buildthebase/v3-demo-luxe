import { eventTypes, experiences } from "./site-config";

export type NavigationItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
  emphasis?: "inquiry";
};

export type BreadcrumbItem = {
  href: string;
  label: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/experiences",
    label: "Experiences",
    children: experiences.map((experience) => ({
      href: experience.landingPath,
      label: experience.label,
    })),
  },
  {
    href: "/events",
    label: "Events",
    children: eventTypes.map((event) => ({
      href: `/events/${event.slug}`,
      label: event.name,
    })),
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Plan Your Event", emphasis: "inquiry" },
];

const homeBreadcrumb = { href: "/", label: "Home" } as const;
const experiencesBreadcrumb = { href: "/experiences", label: "Experiences" } as const;
const eventsBreadcrumb = { href: "/events", label: "Events" } as const;
const blogBreadcrumb = { href: "/blog", label: "Blog" } as const;

export const breadcrumbItemsByPath: Record<string, readonly BreadcrumbItem[]> = {
  "/experiences": [homeBreadcrumb, experiencesBreadcrumb],
  ...Object.fromEntries(
    experiences.map((experience) => [
      experience.landingPath,
      [
        homeBreadcrumb,
        experiencesBreadcrumb,
        { href: experience.landingPath, label: experience.label },
      ],
    ]),
  ),
  "/events": [homeBreadcrumb, eventsBreadcrumb],
  ...Object.fromEntries(
    eventTypes.map((event) => [
      `/events/${event.slug}`,
      [
        homeBreadcrumb,
        eventsBreadcrumb,
        { href: `/events/${event.slug}`, label: event.name },
      ],
    ]),
  ),
  "/gallery": [homeBreadcrumb, { href: "/gallery", label: "Gallery" }],
  "/faq": [homeBreadcrumb, { href: "/faq", label: "FAQ" }],
  "/blog": [homeBreadcrumb, blogBreadcrumb],
  "/contact": [homeBreadcrumb, { href: "/contact", label: "Contact" }],
};

export function getBreadcrumbItems(path: string) {
  return breadcrumbItemsByPath[path] ?? [];
}
