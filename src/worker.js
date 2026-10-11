// Visitor notifications for lawnsplantspests.com
// Serves the static site as before, and pings Devon's phone (via a
// Telegram bot) when a real person views a page. City/state comes from
// Cloudflare's built-in geolocation — no visitor data is stored anywhere.
// Telegram is used instead of ntfy because free ntfy.sh rate-limits by
// IP and blocks Cloudflare's shared egress IPs; Telegram does not.
// Credentials live in the TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets.

// Skip search engines, crawlers, link previews, and monitoring tools
const BOT_RE = /bot|crawl|spider|slurp|bing|yandex|duckduck|baidu|facebookexternalhit|whatsapp|telegram|preview|curl|wget|python|java|go-http|headless|lighthouse|pingdom|uptime|monitor|scan|validator/i;

// Data-center / cloud / crawler networks. Visits from these come from
// servers, not people — automated crawlers that spoof a browser UA to
// dodge BOT_RE. Matched against Cloudflare's asOrganization (the
// visitor's network name). Residential ISPs (Comcast, Verizon, Spectrum,
// AT&T, T-Mobile, Frontier, etc.) never match these, so real local
// visitors are unaffected.
// Akamai, Fastly and Cloudflare are deliberately NOT here: they run Apple's iCloud Private Relay,
// so matching them silently dropped iPhone/Safari visitors who have it turned on.
const HOSTING_RE = /google|amazon|\baws\b|microsoft|azure|digital\s?ocean|oracle|\bovh\b|hetzner|linode|facebook|meta platforms|censys|shodan|palo alto|leaseweb|contabo|vultr|scaleway|alibaba|tencent|huawei|datacamp|\bm247\b|choopa|quadranet|hostwinds|gcore|stackpath|sucuri|bytedance|internet archive|data\s?cent|colocat|hosting|\bcloud\b|\bvps\b|\bllc\b\s*host|\bservers?\b|\bseo\b|cogent|\bquay\b|\bpte\b|\bltd\b|\buab\b|\bidc\b|zenlayer|psychz|nforce|worldstream|constant company|dedicated|proxy|\bvpn\b|scraper|scraping|crawler/i;

// Residential-proxy / rotating-proxy networks. A scraper rents these to
// hit the site from ~20 different US cities in a few minutes (observed
// 2026-09-27: a burst on the Honey page from Oxylabs, GTT, Web2Objects,
// Aventice, Sentris, IPSwat, LA-Net, SIA Bite, "Private Customer").
const PROXY_RE = /oxylabs|bright\s?data|luminati|netnut|iproyal|smartproxy|decodo|\bsoax\b|packetstream|proxyrack|rayobyte|\bgtt\b|web2objects|aventice|sentris|ipswat|la-net|\bsia bite\b|aviation re\b|private customer/i;

// Desktop Linux (not Android, not Chromebook). Almost no real customers
// browse on it; scrapers use it constantly — the "Linux computer · Google
// search" pings in that same burst came through normal ISPs.
function isDesktopLinux(ua) {
  return /linux/i.test(ua) && !/android|cros/i.test(ua);
}

// Real customers for a Central PA business are in the US. Overseas
// "visitors" to a Harrisburg pest-control site are scrapers/bots
// essentially 100% of the time (observed: Seoul, São Paulo, Hanoi,
// Malmö, Kerkrade — all hosting networks). Skip non-US entirely.
const NOTIFY_COUNTRY = "US";

// Turn a URL path into a friendly page name, e.g.
// "/stinging-insects" -> "Stinging Insects page", "/" -> "Home page".
function friendlyPage(pathname) {
  if (!pathname || pathname === "/") return "Home page";
  const seg = pathname.replace(/\/+$/, "").replace(/\.html$/i, "").split("/").pop() || "home";
  const words = seg.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return words + " page";
}

// Rough device label from the User-Agent string.
function deviceType(ua) {
  if (/iphone/i.test(ua)) return "iPhone";
  if (/ipad/i.test(ua)) return "iPad";
  if (/android/i.test(ua)) return /mobile/i.test(ua) ? "Android phone" : "Android tablet";
  if (/windows phone/i.test(ua)) return "Windows phone";
  if (/macintosh|mac os x/i.test(ua)) return "Mac";
  if (/windows nt/i.test(ua)) return "Windows PC";
  if (/cros/i.test(ua)) return "Chromebook";
  if (/linux/i.test(ua)) return "Linux computer";
  return "";
}

// Where the visitor came from, based on the Referer header. Empty
// referer (very common — direct visits, bookmarks, privacy browsers)
// reads as "Direct". A known platform is named; any other site shows
// its domain. selfHost is this site's own hostname (internal → "").
function trafficSource(request, selfHost) {
  const ref = request.headers.get("referer") || "";
  if (!ref) return "Direct / bookmark";
  let host = "";
  try {
    host = new URL(ref).hostname.replace(/^www\./i, "").toLowerCase();
  } catch (e) {
    return "a link";
  }
  if (!host || host === selfHost) return "";
  if (/(^|\.)google\./.test(host)) return "Google search";
  if (/(^|\.)bing\./.test(host)) return "Bing search";
  if (/duckduckgo/.test(host)) return "DuckDuckGo";
  if (/(^|\.)yahoo\./.test(host)) return "Yahoo search";
  if (/facebook\.|fb\.me|fb\.com|l\.facebook/.test(host)) return "Facebook";
  if (/instagram\./.test(host)) return "Instagram";
  if (/t\.co$|twitter\.|x\.com$/.test(host)) return "X/Twitter";
  if (/linkedin\.|lnkd\.in/.test(host)) return "LinkedIn";
  if (/youtube\.|youtu\.be/.test(host)) return "YouTube";
  if (/nextdoor\./.test(host)) return "Nextdoor";
  if (/yelp\./.test(host)) return "Yelp";
  if (/reddit\./.test(host)) return "Reddit";
  if (/tiktok\./.test(host)) return "TikTok";
  if (/(^|\.)g\.co$|maps\.google/.test(host)) return "Google Maps";
  return host;
}

function canonicalUrl(url) {
  let path = url.pathname;
  if (path.endsWith("/index.html")) path = path.slice(0, -"index.html".length);
  else if (path.endsWith(".html") && path !== "/404.html") path = path.slice(0, -5);
  if (url.protocol === "https:" && path === url.pathname) return null;
  return `https://${url.host}${path}${url.search}`;
}

// Standard security headers on every response (HTTPS-only, no MIME sniffing,
// no framing by other sites, minimal referrer, no camera/mic/location access).
const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function withSecurityHeaders(response) {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!secured.headers.has(name)) secured.headers.set(name, value);
  }
  return secured;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Permanent redirects so Google consolidates: static assets only 307 .html, and http isn't upgraded
    const canonical = canonicalUrl(url);
    if (canonical) return Response.redirect(canonical, 301);

    // One-time link Devon opens on his own devices so his visits don't ping him
    if (url.pathname === "/im-devon") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie":
            "lpp_owner=1; Max-Age=31536000; Path=/; Secure; HttpOnly; SameSite=Lax",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);

    try {
      const contentType = response.headers.get("content-type") || "";
      if (
        request.method === "GET" &&
        response.status === 200 &&
        contentType.includes("text/html")
      ) {
        const userAgent = request.headers.get("user-agent") || "";
        const cookies = request.headers.get("cookie") || "";
        const org = (request.cf && request.cf.asOrganization) || "";
        const country = (request.cf && request.cf.country) || "";
        let reason = "queued";
        if (!userAgent || BOT_RE.test(userAgent)) reason = "bot";
        else if (org && HOSTING_RE.test(org)) reason = "datacenter";
        else if (org && PROXY_RE.test(org)) reason = "proxy";
        else if (isDesktopLinux(userAgent)) reason = "linux-desktop";
        else if (country && country !== NOTIFY_COUNTRY) reason = "overseas";
        else if (cookies.includes("lpp_owner=1")) reason = "owner";

        if (reason === "queued") {
          ctx.waitUntil(notifyVisit(request, url, env));
        }
      }
    } catch (e) {
      // Notification problems must never affect serving the site
    }

    return withSecurityHeaders(response);
  },
};

// Returns an outcome string:
// "sent" | "deduped" | "send-failed-<status>" | "error-..."
async function notifyVisit(request, url, env) {
  // Dedupe: one notification per visitor per 30 minutes, so a person
  // browsing several pages doesn't fire a ping for every click.
  // If the cache misbehaves, send anyway rather than staying silent.
  const cache = caches.default;
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const dedupeKey = new Request(
    "https://visit-dedupe.lpp-internal.example/" + encodeURIComponent(ip)
  );
  try {
    if (await cache.match(dedupeKey)) return "deduped";
  } catch (e) {
    // fall through and send
  }

  try {
    const cf = request.cf || {};
    const city = cf.city || "Somewhere";
    const region = cf.regionCode || cf.region || "";
    const country = cf.country || "";
    const postal = country === "US" ? (cf.postalCode || "") : "";
    let place =
      country === "US"
        ? region
          ? `${city}, ${region}`
          : city
        : `${city}, ${country}`;
    if (postal) place += " " + postal;

    const pageName = friendlyPage(url.pathname);
    const device = deviceType(request.headers.get("user-agent") || "");
    const source = trafficSource(request, url.hostname);
    // Network/ISP name — shown so you can tell a real person (residential
    // ISP) from a bot that slipped through (a hosting company).
    const org = (cf.asOrganization || "").toString().trim();

    // Assemble a scannable multi-line message, skipping any blank parts.
    const lines = ["🔔 Lawns Plants & Pests", `📍 ${place} · 📄 ${pageName}`];
    const meta = [];
    if (device) meta.push(`📱 ${device}`);
    if (source) meta.push(`↗️ ${source}`);
    if (meta.length) lines.push(meta.join(" · "));
    if (org) lines.push(`📡 ${org}`);

    // Send via the Telegram Bot API (reliable from Cloudflare's shared
    // egress IPs). Secrets: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.
    const botToken = env && env.TELEGRAM_BOT_TOKEN ? String(env.TELEGRAM_BOT_TOKEN).trim() : "";
    const chatId = env && env.TELEGRAM_CHAT_ID ? String(env.TELEGRAM_CHAT_ID).trim() : "";
    if (!botToken || !chatId) return "no-config";
    const resp = await fetch(
      "https://api.telegram.org/bot" + botToken + "/sendMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
        }),
      }
    );
    if (!resp.ok) return "send-failed-" + resp.status;

    // Only start the 30-min quiet window after a successful send,
    // so a failed send doesn't silence the next real visit
    try {
      await cache.put(
        dedupeKey,
        new Response("1", { headers: { "Cache-Control": "max-age=1800" } })
      );
    } catch (e) {}
    return "sent";
  } catch (e) {
    const msg = e && e.message ? String(e.message) : "unknown";
    return "error-" + msg.replace(/[^\x20-\x7E]/g, "").slice(0, 60);
  }
}
