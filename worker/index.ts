/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import {
  canonicalHostname,
  canonicalOrigin,
  formerCanonicalHostname,
  normalizeCanonicalPath,
} from "../app/url-policy";

interface Env {
  INDEXNOW_KEY?: string;
  ASSETS?: {
    fetch(request: Request): Promise<Response>;
  };
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const allowedImageWidths = [
  32, 48, 64, 96, 128, 256, 384,
  480, 640, 768, 1024, 1280, 1600, 1920, 2400,
] as const;

const legacyDomainDestinations: Record<string, string> = {
  "luxecoffeebar.ca": "/experiences/coffee-bar",
  "luxesweetcart.ca": "/experiences/sweet-cart",
  "luxeseatingrentals.ca": "/experiences/seating-rentals",
};

const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);
const indexNowKeyPattern = /^[A-Za-z0-9-]{8,128}$/;

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function protectNonProductionResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

function protectCanonicalHttpsResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

function protectNonIndexableResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

function internalServerErrorResponse(): Response {
  return new Response(
    `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Page Temporarily Unavailable | Experiences by Luxe</title>
  </head>
  <body>
    <main>
      <p>500 / Page temporarily unavailable</p>
      <h1>This page could not be loaded just now.</h1>
      <p>Please try again shortly, return to Experiences by Luxe, or contact us about your event.</p>
      <p><a href="/">Return Home</a> <a href="/contact">Contact Luxe</a></p>
    </main>
  </body>
</html>`,
    {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    },
  );
}

function nonProductionRobotsResponse(): Response {
  return new Response("User-agent: *\nDisallow: /\n", {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(
    request: Request,
    env: Env = {},
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const bareHostname = hostname.replace(/^www\./, "");
    const canonicalPathname = normalizeCanonicalPath(url.pathname);
    const isLocal = localHostnames.has(hostname);

    try {
      const legacyDestination = legacyDomainDestinations[bareHostname];
      const isNonProductionHost =
        !isLocal &&
        bareHostname !== canonicalHostname &&
        !legacyDestination;

      if (legacyDestination) {
        const destination = new URL(legacyDestination, canonicalOrigin);
        return Response.redirect(destination, 301);
      }

      if (
        bareHostname === formerCanonicalHostname ||
        (
          bareHostname === canonicalHostname &&
          (
            hostname !== canonicalHostname ||
            url.protocol !== "https:" ||
            canonicalPathname !== url.pathname
          )
        )
      ) {
        const destination = new URL(canonicalOrigin);
        destination.pathname = canonicalPathname;
        return url.protocol === "https:"
          ? protectCanonicalHttpsResponse(Response.redirect(destination, 301))
          : Response.redirect(destination, 301);
      }

      if (isNonProductionHost && url.pathname === "/robots.txt") {
        return nonProductionRobotsResponse();
      }

      const indexNowKey = env.INDEXNOW_KEY;
      if (
        hostname === canonicalHostname &&
        url.protocol === "https:" &&
        indexNowKey &&
        indexNowKeyPattern.test(indexNowKey) &&
        url.pathname === `/${indexNowKey}.txt`
      ) {
        return protectCanonicalHttpsResponse(
          new Response(indexNowKey, {
            headers: {
              "Cache-Control": "public, max-age=3600",
              "Content-Type": "text/plain; charset=utf-8",
              "X-Robots-Tag": "noindex",
            },
          }),
        );
      }

      if (url.pathname === "/_vinext/image") {
        const fetchAsset = (path: string) => {
          const assetRequest = new Request(new URL(path, request.url));
          return env.ASSETS?.fetch(assetRequest) ?? fetch(assetRequest);
        };

        const imageResponse = await handleImageOptimization(request, {
          fetchAsset,
          ...(env.IMAGES
            ? {
                transformImage: async (
                  body: ReadableStream,
                  { width, format, quality }: {
                    width: number;
                    format: string;
                    quality: number;
                  },
                ) => {
                  const result = await env.IMAGES!
                    .input(body)
                    .transform(width > 0 ? { width } : {})
                    .output({ format, quality });
                  return result.response();
                },
              }
            : {}),
        }, [...allowedImageWidths]);

        const protectedImageResponse = isNonProductionHost
          ? protectNonProductionResponse(imageResponse)
          : imageResponse;

        return hostname === canonicalHostname && url.protocol === "https:"
          ? protectCanonicalHttpsResponse(protectedImageResponse)
          : protectedImageResponse;
      }

      const response = await handler.fetch(request, env, ctx);
      const indexSafeResponse =
        response.status >= 400
          ? protectNonIndexableResponse(response)
          : response;
      const protectedResponse = isNonProductionHost
        ? protectNonProductionResponse(indexSafeResponse)
        : indexSafeResponse;

      return hostname === canonicalHostname && url.protocol === "https:"
        ? protectCanonicalHttpsResponse(protectedResponse)
        : protectedResponse;
    } catch (error) {
      console.error("worker_request_error", {
        method: request.method,
        pathname: url.pathname,
        requestId: request.headers.get("cf-ray"),
        error,
      });
      const errorResponse = internalServerErrorResponse();
      return hostname === canonicalHostname && url.protocol === "https:"
        ? protectCanonicalHttpsResponse(errorResponse)
        : errorResponse;
    }
  },
};

export default worker;
