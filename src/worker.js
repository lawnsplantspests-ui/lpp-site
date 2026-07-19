// Visitor notifications for lawnsplantspests.com
// Serves the static site as before, and pings Devon's phone (via ntfy.sh)
// when a real person views a page. City/state comes from Cloudflare's
// built-in geolocation — no visitor data is stored anywhere.

const NTFY_TOPIC = "lpp-visits-vrea2cug9p";

// Skip search engines, crawlers, link previews, and monitoring tools
const BOT_RE = /bot|crawl|spider|slurp|bing|yandex|duckduck|baidu|facebookexternalhit|whatsapp|telegram|preview|curl|wget|python|java|go-http|headless|lighthouse|pingdom|uptime|monitor|scan|validator/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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
      const userAgent = request.headers.get("user-agent") || "";
      const cookies = request.headers.get("cookie") || "";
      if (
        request.method === "GET" &&
        response.status === 200 &&
        contentType.includes("text/html") &&
        userAgent &&
        !BOT_RE.test(userAgent) &&
        !cookies.includes("lpp_owner=1")
      ) {
        ctx.waitUntil(notifyVisit(request, url));
      }
    } catch (e) {
      // Notification problems must never affect serving the site
    }

    return response;
  },
};

async function notifyVisit(request, url) {
  try {
    // One notification per visitor per 30 minutes, so a person browsing
    // several pages doesn't fire a ping for every click
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const cache = caches.default;
    const dedupeKey = new Request(
      "https://visit-dedupe.lpp-internal.example/" + encodeURIComponent(ip)
    );
    if (await cache.match(dedupeKey)) return;
    await cache.put(
      dedupeKey,
      new Response("1", { headers: { "Cache-Control": "max-age=1800" } })
    );

    const cf = request.cf || {};
    const city = cf.city || "Somewhere";
    const region = cf.regionCode || cf.region || "";
    const country = cf.country || "";
    const place =
      country === "US"
        ? region
          ? `${city}, ${region}`
          : city
        : `${city}, ${country}`;
    const page = url.pathname === "/" ? "home page" : url.pathname;

    await fetch("https://ntfy.sh/" + NTFY_TOPIC, {
      method: "POST",
      headers: {
        Title: "Lawns Plants & Pests site visitor",
        Tags: "eyes",
      },
      body: `Someone from ${place} is viewing the site (${page})`,
    });
  } catch (e) {
    // Never let a failed ping break anything
  }
}
