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

## Photos in cards and photo strips

Card thumbnails (`class="card-thumb"`) and two-up photo strips (`<div class="photo-strip">`)
point at 1000px copies in `public/images/small/`, not the 1200–1600px originals, so
phones don't download full-size photos for small slots. After adding a page or a photo
strip, run:

```bash
python3 ~/Documents/Claude/site-tools/small_images.py public
```

It makes any missing small copies and repoints the new tags. Originals stay put for
hero backgrounds, single-photo strips and social previews.
