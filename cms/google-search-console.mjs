import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";

async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error?.code === "ENOENT") return fallback; throw error; }
}
async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
}
function base64Url(buffer) { return Buffer.from(buffer).toString("base64url"); }

export class GoogleSearchConsole {
  constructor({ registry, runtimePort }) {
    this.registry = registry;
    this.runtimePort = runtimePort;
    this.file = registry.localFile("google-oauth.json");
  }

  async state() { return readJson(this.file, { pending: {}, tokens: null }); }

  async authorizationUrl(projectId) {
    const settings = await this.registry.globalSettings();
    if (!settings.googleOAuthClientId) throw Object.assign(new Error("Add a Google OAuth client ID in Settings first."), { status: 412 });
    const state = await this.state();
    const requestState = crypto.randomBytes(24).toString("hex");
    const verifier = base64Url(crypto.randomBytes(48));
    const challenge = base64Url(crypto.createHash("sha256").update(verifier).digest());
    state.pending[requestState] = { projectId, verifier, expiresAt: Date.now() + 10 * 60 * 1000 };
    await writeJson(this.file, state);
    const callback = `http://127.0.0.1:${this.runtimePort}/api/google/oauth/callback`;
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.search = new URLSearchParams({ client_id: settings.googleOAuthClientId, redirect_uri: callback, response_type: "code", scope: "https://www.googleapis.com/auth/webmasters.readonly", access_type: "offline", prompt: "consent", state: requestState, code_challenge: challenge, code_challenge_method: "S256" }).toString();
    return { url: url.toString(), callback };
  }

  async callback({ code, requestState }) {
    const local = await this.state();
    const pending = local.pending[requestState];
    if (!pending || pending.expiresAt < Date.now()) throw Object.assign(new Error("Google authorization request expired. Start the connection again."), { status: 400 });
    const settings = await this.registry.globalSettings();
    const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: settings.googleOAuthClientId, ...(settings.googleOAuthClientSecret ? { client_secret: settings.googleOAuthClientSecret } : {}), redirect_uri: `http://127.0.0.1:${this.runtimePort}/api/google/oauth/callback`, grant_type: "authorization_code", code_verifier: pending.verifier }) });
    const token = await response.json();
    if (!response.ok) throw Object.assign(new Error(token.error_description || token.error || "Google authorization failed."), { status: 502 });
    local.tokens = { ...token, refresh_token: token.refresh_token || local.tokens?.refresh_token, expiresAt: Date.now() + ((token.expires_in || 3600) * 1000), connectedAt: new Date().toISOString() };
    delete local.pending[requestState];
    await writeJson(this.file, local);
    return pending.projectId;
  }

  async accessToken() {
    const local = await this.state();
    if (!local.tokens) throw Object.assign(new Error("Connect Google Search Console first."), { status: 412 });
    if (local.tokens.access_token && local.tokens.expiresAt > Date.now() + 60_000) return local.tokens.access_token;
    if (!local.tokens.refresh_token) throw Object.assign(new Error("Google authorization expired. Reconnect Search Console."), { status: 401 });
    const settings = await this.registry.globalSettings();
    const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: settings.googleOAuthClientId, ...(settings.googleOAuthClientSecret ? { client_secret: settings.googleOAuthClientSecret } : {}), refresh_token: local.tokens.refresh_token, grant_type: "refresh_token" }) });
    const token = await response.json();
    if (!response.ok) throw Object.assign(new Error(token.error_description || token.error || "Google token refresh failed."), { status: response.status });
    local.tokens = { ...local.tokens, ...token, expiresAt: Date.now() + ((token.expires_in || 3600) * 1000) };
    await writeJson(this.file, local);
    return local.tokens.access_token;
  }

  async sites() {
    const response = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers: { authorization: `Bearer ${await this.accessToken()}` } });
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error?.message || "Could not read Search Console properties."), { status: response.status });
    return data.siteEntry || [];
  }

  async searchAnalytics(siteUrl, { startDate, endDate }) {
    const token = await this.accessToken();
    const rows = [];
    for (let startRow = 0; ; startRow += 25_000) {
      const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ startDate, endDate, dimensions: ["date", "query", "page", "device", "country"], type: "web", rowLimit: 25_000, startRow, aggregationType: "auto", dataState: "final" }) });
      const data = await response.json();
      if (!response.ok) throw Object.assign(new Error(data.error?.message || "Search Console synchronization failed."), { status: response.status });
      const batch = data.rows || [];
      rows.push(...batch);
      if (batch.length < 25_000) break;
    }
    return rows;
  }

  async disconnect() {
    const local = await this.state();
    if (local.tokens?.access_token) await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(local.tokens.access_token)}`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" } }).catch(() => null);
    await writeJson(this.file, { pending: {}, tokens: null });
    return { disconnected: true };
  }
}
