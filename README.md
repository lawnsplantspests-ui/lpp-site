# Lawns Plants & Pests — your new website

This folder is a complete, working website for LPP. It's already built and
tested. Below is everything you need, in plain English. You do **not** need to
understand the code to use it.

---

## What you have

A fast, search-friendly website with:

- A homepage, About page, and Contact/quote page
- A page for each service (lawn care, pest control, plant health care, honeybee removal)
- A **separate page for every town you serve** — this is what helps you show up
  when someone Googles "lawn care [town] PA"
- Full control over the page titles and descriptions Google shows (the thing
  Google Sites wouldn't let you change)

---

## The only files you'll ever need to edit

Everything you'd want to change lives in three plain files in `src/data/`:

1. **`site.js`** — your phone number, email, business name. Change it here and
   it updates across the whole site.
2. **`services.js`** — your list of services.
3. **`towns.js`** — your list of towns. **This is the important one.** Add a
   town here and a brand-new page is created for it automatically.

Each file has notes inside (lines starting with `//`) telling you what to do.
Lines marked `✏️ EDIT` are spots to put your own words. Lines marked `⚠️` are
decisions to make (like whether to keep the honeybee removal page).

> **The one rule that matters for Google:** when you add a town, give it its own
> real description and real neighborhoods. Don't just copy another town and swap
> the name — Google ignores copy-paste pages.

---

## How to get it live (do this with Claude Code)

When you're ready, open Claude Code on your computer and tell it:

> "Here's my Astro site. Help me preview it locally, then deploy it to
> Cloudflare Pages and point my domain at it."

Claude Code can run these for you, but for reference the basic commands are:

```
npm install      # one-time setup
npm run dev      # preview the site on your own computer
npm run build    # produce the final files
```

Deploying to Cloudflare Pages and pointing your domain is the step where the
Cloudflare connection (MCP) helps — Claude Code can handle the upload and DNS
once you've authorized it to your Cloudflare account.

---

## After it's live

- Add your real domain to Cloudflare and re-point it from Google Sites.
- Submit your sitemap in Google Search Console so Google finds the new pages.
- Make sure your phone number and town here match your Google Business Profile
  exactly — consistency helps local ranking.

That's it. Edit three files, deploy once, and you've left Google Sites behind.
