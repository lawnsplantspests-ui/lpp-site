# Lawns Plants & Pests LLC — Website

Static HTML/CSS site served by a Cloudflare Worker (`src/worker.js`) with the
pages in `public/`. Push to `main` and Cloudflare redeploys.

## Menu and footer

The site menu and footer are written into every page, so search engines and
AI crawlers see the links without running JavaScript. Edit them in
`partials/header.html` and `partials/footer.html`, then run:

    python3 tools/build_chrome.py

That refreshes the copy in each page (between the `site-header` / `site-footer`
markers). `public/components.js` now only loads analytics, the favicon, and
highlights the current page in the menu.
