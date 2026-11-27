import { isPublishableImage } from "./image-system";
import { serviceSchemaImages } from "./service-schema-images";
import { getBreadcrumbItems } from "./navigation-config";
import type { BlogArticle } from "./blog/content";
import { approvedBusinessIdentity } from "./local-seo";
import { experiences, siteConfig } from "./site-config";

export type FaqDefinition = {
  question: string;
  answer: string;
};

export type AreaServedDefinition = {
  "@type": "City" | "AdministrativeArea" | "Place";
  name: string;
};

type ServicePageSchemaInput = {
  path: string;
  serviceId?: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  pageName: string;
  pageDescription: string;
  areaServed?: AreaServedDefinition[];
  faqs?: readonly FaqDefinition[];
};

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;
export const organizationLogoId = `${siteConfig.url}/#logo`;
export const organizationImageId = `${siteConfig.url}/#primaryimage`;
export const divisionIds = Object.fromEntries(
  experiences.map((experience) => [
    experience.slug,
    `${siteConfig.url}/#${experience.slug}-division`,
  ]),
) as Record<(typeof experiences)[number]["slug"], string>;
export const divisionServiceIds = {
  coffee: `${siteConfig.url}/#coffee-bar-service`,
  sweet: `${siteConfig.url}/#sweet-cart-service`,
  seating: `${siteConfig.url}/#seating-rentals-service`,
} as const;

export function absoluteUrl(path: string) {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function pageEntityId(path: string, fragment: string) {
  const pageUrl = absoluteUrl(path);
  return `${pageUrl}${path === "/" ? "/" : ""}#${fragment}`;
}

export function createAreaServed(
  names: readonly string[] = [
    "Toronto",
    "Greater Toronto Area",
    "Southern Ontario",
  ],
): AreaServedDefinition[] {
  return names.map((name) => ({
    "@type":
      name === "Greater Toronto Area" || name === "Southern Ontario"
        ? "AdministrativeArea"
        : name === "Toronto"
          ? "City"
          : "Place",
    name,
  }));
}

export function createBreadcrumbSchema(path: string) {
  const breadcrumbs = getBreadcrumbItems(path);

  return {
    "@type": "BreadcrumbList",
    "@id": pageEntityId(path, "breadcrumb"),
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.label,
      item: absoluteUrl(breadcrumb.href),
    })),
  };
}

export function createHomePageSchema({
  pageName,
  pageDescription,
}: {
  pageName: string;
  pageDescription: string;
}) {
  const completeAreaServed = createAreaServed([
    ...approvedBusinessIdentity.primaryServiceAreas,
    "Greater Toronto Area",
    "Southern Ontario",
  ]);
  const logoUrl = absoluteUrl(siteConfig.brandAssets.organizationLogo.src);
  const primaryImageUrl = absoluteUrl(siteConfig.brandAssets.googleThumbnail.src);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: approvedBusinessIdentity.businessName,
        url: approvedBusinessIdentity.website,
        description: approvedBusinessIdentity.publicDescription,
        image: { "@id": organizationImageId },
        logo: { "@id": organizationLogoId },
        email: approvedBusinessIdentity.email,
        telephone: approvedBusinessIdentity.phone,
        areaServed: completeAreaServed,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "event inquiries",
          email: approvedBusinessIdentity.email,
          telephone: approvedBusinessIdentity.phone,
          areaServed: completeAreaServed,
          availableLanguage: ["en"],
        },
        department: experiences.map((experience) => ({
          "@id": divisionIds[experience.slug],
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": pageEntityId("/", "webpage"),
        url: siteConfig.url,
        name: pageName,
        description: pageDescription,
        isPartOf: { "@id": websiteId },
        about: [
          { "@id": organizationId },
          ...experiences.map((experience) => ({
            "@id": divisionServiceIds[
              experience.accent === "coffee"
                ? "coffee"
                : experience.accent === "sweet"
                  ? "sweet"
                  : "seating"
            ],
          })),
        ],
        mainEntity: { "@id": organizationId },
        primaryImageOfPage: { "@id": organizationImageId },
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ImageObject",
        "@id": organizationImageId,
        url: primaryImageUrl,
        contentUrl: primaryImageUrl,
        width: siteConfig.brandAssets.googleThumbnail.width,
        height: siteConfig.brandAssets.googleThumbnail.height,
        caption: siteConfig.brandAssets.googleThumbnail.alt,
      },
      {
        "@type": "ImageObject",
        "@id": organizationLogoId,
        url: logoUrl,
        contentUrl: logoUrl,
        width: siteConfig.brandAssets.organizationLogo.width,
        height: siteConfig.brandAssets.organizationLogo.height,
        caption: siteConfig.brandAssets.organizationLogo.alt,
      },
      ...experiences.map((experience) => ({
        "@type": "Organization",
        "@id": divisionIds[experience.slug],
        name: experience.name,
        url: absoluteUrl(experience.landingPath),
        description: experience.serviceDescription,
        parentOrganization: { "@id": organizationId },
        sameAs: [experience.instagram],
      })),
      ...experiences.map((experience) => {
        const serviceId =
          divisionServiceIds[
            experience.accent === "coffee"
              ? "coffee"
              : experience.accent === "sweet"
                ? "sweet"
                : "seating"
          ];

        return {
          "@type": "Service",
          "@id": serviceId,
          name: experience.name,
          url: absoluteUrl(experience.landingPath),
          description: experience.serviceDescription,
          serviceType: experience.name,
          provider: { "@id": organizationId },
          brand: { "@id": divisionIds[experience.slug] },
          areaServed: completeAreaServed,
          mainEntityOfPage: {
            "@id": pageEntityId(experience.landingPath, "webpage"),
          },
        };
      }),
    ],
  };
}

export function createCollectionPageSchema({
  path,
  pageName,
  pageDescription,
  collectionName,
  items,
  collectionType = "CollectionPage",
}: {
  path: string;
  pageName: string;
  pageDescription: string;
  collectionName: string;
  items: readonly { name: string; path: string }[];
  collectionType?: "CollectionPage" | "Blog";
}) {
  const pageUrl = absoluteUrl(path);
  const webpageId = pageEntityId(path, "webpage");
  const listId = pageEntityId(path, "item-list");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":
          collectionType === "Blog"
            ? ["Blog", "CollectionPage"]
            : ["CollectionPage", "WebPage"],
        "@id": webpageId,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        breadcrumb: { "@id": pageEntityId(path, "breadcrumb") },
        mainEntity: { "@id": listId },
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: collectionName,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
      createBreadcrumbSchema(path),
    ],
  };
}

export function createArticlePageSchema({
  article,
  path,
}: {
  article: BlogArticle;
  path: string;
}) {
  const pageUrl = absoluteUrl(path);
  const webpageId = pageEntityId(path, "webpage");
  const articleId = pageEntityId(path, "article");
  const imageAsset = article.heroImage?.src ? article.heroImage : null;
  const imageId = `${articleId}-image`;
  const imageUrl = imageAsset ? absoluteUrl(imageAsset.src ?? "") : null;
  const logoAsset = siteConfig.brandAssets.organizationLogo;
  const logoUrl = absoluteUrl(logoAsset.src);
  const wasModified = article.modifiedDate !== article.publishDate;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": articleId,
        url: pageUrl,
        headline: article.title,
        description: article.description,
        datePublished: article.publishDate,
        ...(wasModified ? { dateModified: article.modifiedDate } : {}),
        mainEntityOfPage: { "@id": webpageId },
        author: {
          "@type": article.author.type,
          name: article.author.name,
          ...(article.author.url ? { url: article.author.url } : {}),
        },
        publisher: {
          "@type": "Organization",
          "@id": organizationId,
          name: siteConfig.name,
          url: siteConfig.url,
          logo: {
            "@type": "ImageObject",
            "@id": organizationLogoId,
            url: logoUrl,
            width: logoAsset.width,
            height: logoAsset.height,
          },
        },
        ...(imageAsset && imageUrl
          ? {
              image: {
                "@type": "ImageObject",
                "@id": imageId,
                url: imageUrl,
                width: imageAsset.width,
                height: imageAsset.height,
                caption: article.heroAlt,
              },
            }
          : {}),
        articleSection: article.category,
        inLanguage: siteConfig.language,
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name: article.seoTitle,
        description: article.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        breadcrumb: { "@id": pageEntityId(path, "breadcrumb") },
        mainEntity: { "@id": articleId },
        ...(imageAsset ? { primaryImageOfPage: { "@id": imageId } } : {}),
        inLanguage: siteConfig.language,
      },
      {
        "@type": "BreadcrumbList",
        "@id": pageEntityId(path, "breadcrumb"),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
        ],
      },
    ],
  };
}

export function createServicePageSchema({
  path,
  serviceId,
  serviceName,
  serviceType,
  serviceDescription,
  pageName,
  pageDescription,
  areaServed = createAreaServed(),
  faqs,
}: ServicePageSchemaInput) {
  const pageUrl = absoluteUrl(path);
  const resolvedServiceId = serviceId ?? pageEntityId(path, "service");
  const image = serviceSchemaImages[path];
  const imageId = pageEntityId(path, "service-image");
  const hasImage = image && isPublishableImage(image);
  const webpageId = pageEntityId(path, "webpage");
  const divisionId =
    resolvedServiceId === divisionServiceIds.coffee
      ? divisionIds["coffee-bar"]
      : resolvedServiceId === divisionServiceIds.sweet
        ? divisionIds["sweet-cart"]
        : resolvedServiceId === divisionServiceIds.seating
          ? divisionIds["seating-rentals"]
          : undefined;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": resolvedServiceId,
      name: serviceName,
      serviceType,
      description: serviceDescription,
      url: pageUrl,
      provider: { "@id": organizationId },
      areaServed,
      mainEntityOfPage: { "@id": webpageId },
      ...(hasImage ? { image: { "@id": imageId } } : {}),
      ...(divisionId ? { brand: { "@id": divisionId } } : {}),
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: pageName,
      description: pageDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      mainEntity: { "@id": resolvedServiceId },
      ...(hasImage ? { primaryImageOfPage: { "@id": imageId } } : {}),
      breadcrumb: { "@id": pageEntityId(path, "breadcrumb") },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbSchema(path),
  ];

  if (hasImage) {
    graph.push({
      "@type": "ImageObject",
      "@id": imageId,
      url: absoluteUrl(image.src!),
      contentUrl: absoluteUrl(image.src!),
      width: image.width,
      height: image.height,
      caption: image.alt,
    });
  }

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": pageEntityId(path, "faq"),
      url: pageUrl,
      isPartOf: { "@id": webpageId },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
