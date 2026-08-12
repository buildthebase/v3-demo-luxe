"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type AnalyticsProps = {
  gaMeasurementId?: string;
  metaPixelId?: string;
};

type AnalyticsPageViewProps = AnalyticsProps & {
  gaReady: boolean;
  metaReady: boolean;
};

type AnalyticsParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
  metaEventName?: "Contact" | "Lead",
) {
  window.gtag?.("event", eventName, parameters);

  if (metaEventName) {
    window.fbq?.("track", metaEventName);
  }
}

function AnalyticsPageViews({
  gaMeasurementId,
  metaPixelId,
  gaReady,
  metaReady,
}: AnalyticsPageViewProps) {
  const pathname = usePathname();

  useEffect(() => {
    const pagePath = pathname || "/";

    if (gaMeasurementId && gaReady) {
      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }

    if (metaPixelId && metaReady) {
      window.fbq?.("track", "PageView");
    }

    const pathParts = pagePath.split("/").filter(Boolean);
    const isServicePage = pathParts[0] === "experiences" && pathParts.length === 2;
    const isEventPage = pathParts[0] === "events" && pathParts.length === 2;

    if (gaMeasurementId && gaReady && isServicePage) {
      window.gtag?.("event", "service_page_view", {
        service_slug: pathParts[1],
        page_path: pagePath,
      });
    }

    if (gaMeasurementId && gaReady && isEventPage) {
      window.gtag?.("event", "event_page_view", {
        event_type: pathParts[1],
        page_path: pagePath,
      });
    }

    if (metaPixelId && metaReady && (isServicePage || isEventPage)) {
      window.fbq?.("track", "ViewContent", {
        content_category: isServicePage ? "experience" : "event",
        content_name: pathParts[1],
      });
    }
  }, [gaMeasurementId, gaReady, metaPixelId, metaReady, pathname]);

  return null;
}

function ContactClickTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const rawHref = link.getAttribute("href");
      if (!rawHref) return;

      const sourcePath = window.location.pathname;
      const linkLocation = link.closest("header")
        ? "header"
        : link.closest("footer")
          ? "footer"
          : "page_content";

      if (rawHref.startsWith("tel:")) {
        trackAnalyticsEvent(
          "phone_click",
          { source_path: sourcePath, link_location: linkLocation },
          "Contact",
        );
        return;
      }

      if (rawHref.startsWith("mailto:")) {
        trackAnalyticsEvent(
          "email_click",
          { source_path: sourcePath, link_location: linkLocation },
          "Contact",
        );
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        ["/contact", "/inquiry", "/inquire"].includes(destination.pathname)
      ) {
        trackAnalyticsEvent(
          "inquiry_start",
          {
            source_path: sourcePath,
            cta_label: link.textContent?.trim().slice(0, 100) || "inquiry link",
          },
          "Contact",
        );
        return;
      }

      if (destination.hostname === "instagram.com" || destination.hostname.endsWith(".instagram.com")) {
        trackAnalyticsEvent("social_click", {
          platform: "instagram",
          source_path: sourcePath,
          link_location: linkLocation,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

export function Analytics({ gaMeasurementId, metaPixelId }: AnalyticsProps) {
  const [gaReady, setGaReady] = useState(false);
  const [metaReady, setMetaReady] = useState(false);

  if (!gaMeasurementId && !metaPixelId) return null;

  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script
            id="ga4-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            onReady={() => setGaReady(true)}
          >
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}',{send_page_view:false});`}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          onReady={() => setMetaReady(true)}
        >
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');`}
        </Script>
      ) : null}

      <AnalyticsPageViews
        gaMeasurementId={gaMeasurementId}
        metaPixelId={metaPixelId}
        gaReady={gaReady}
        metaReady={metaReady}
      />
      <ContactClickTracking />
    </>
  );
}
