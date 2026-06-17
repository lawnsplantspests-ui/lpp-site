import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// Your live website address. Update this if your domain is different.
// It lets Astro build correct links for search engines.
export default defineConfig({
  site: 'https://lawnsplantspests.com',
  adapter: cloudflare()
});