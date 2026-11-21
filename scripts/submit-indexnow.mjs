import projectManifest from "../cms-project.json" with { type: "json" };

const endpoint = "https://api.indexnow.org/indexnow";
const canonicalOrigin = projectManifest.canonicalBaseUrl;
const canonicalHost = new URL(canonicalOrigin).hostname;
const keyPattern = /^[A-Za-z0-9-]{8,128}$/;
const args = process.argv.slice(2);
const sendIndex = args.indexOf("--send");

if (sendIndex === -1) {
  console.log(
    "IndexNow is inactive. To submit changed URLs intentionally, use: npm run indexnow:submit -- --send /path",
  );
  process.exit(0);
}

const key = process.env.INDEXNOW_KEY;
if (!key || !keyPattern.test(key)) {
  throw new Error(
    "INDEXNOW_KEY must contain 8-128 letters, numbers, or dashes before submission.",
  );
}

const requestedUrls = args
  .filter((argument, index) => index !== sendIndex && !argument.startsWith("--"))
  .map((value) => new URL(value, canonicalOrigin));

if (requestedUrls.length === 0) {
  throw new Error("Provide at least one changed URL after --send.");
}

const urlList = [...new Set(requestedUrls.map((url) => {
  if (url.protocol !== "https:" || url.hostname !== canonicalHost) {
    throw new Error(`IndexNow URL must use ${canonicalOrigin}: ${url.href}`);
  }
  url.hash = "";
  return url.href;
}))];

if (urlList.length > 10_000) {
  throw new Error("IndexNow accepts at most 10,000 URLs in one request.");
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: canonicalHost,
    key,
    keyLocation: `${canonicalOrigin}/${key}.txt`,
    urlList,
  }),
});

if (response.status !== 200 && response.status !== 202) {
  throw new Error(`IndexNow rejected the submission with HTTP ${response.status}.`);
}

console.log(
  `IndexNow accepted ${urlList.length} changed URL${urlList.length === 1 ? "" : "s"} with HTTP ${response.status}.`,
);
