// Shared bottom nav bar + footer injected on every page
// Usage: <script src="components.js"></script>

(function () {
  // Google Analytics 4 (gtag.js) — injected on every page
  (function () {
    var id = 'G-HWR19LJ0DL';
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id);
  })();

  // Add favicon globally
  document.head.insertAdjacentHTML('beforeend',
    '<link rel="icon" type="image/png" href="/images/lpp-logo-mark.png">' +
    '<link rel="apple-touch-icon" href="/images/lpp-logo-mark.png">');

  const NAV_LINKS = [
    { href: '/lawn-care',            label: 'Lawn Care' },
    { href: '/plant-health-care',    label: 'Plant Health Care' },
    { href: '/pest-control',         label: 'Pest Control' },
    { href: '/mosquito-tick-control',label: 'Mosquito & Tick' },
    { href: '/deer-damage',          label: 'Deer Damage' },
    { href: '/nuisance-wildlife',    label: 'Wildlife Removal' },
    { href: '/honey-bee-removal',    label: 'Honey Bee Removal' },
    { href: '/pollinator-restoration', label: 'Pollinator Restoration' },
    { href: '/conservation-restoration', label: 'Conservation & Restoration' },
    { href: '/agricultural-pest-service', label: 'Agricultural' },
    { href: '/vegetation-management', label: 'Right-of-Way' },
    { href: '/aquatic-service',      label: 'Aquatic' },
    { href: '/pest-library',         label: 'Pest Library' },
    { href: '/wildlife-id-library',  label: 'Wildlife ID' },
    { href: '/plant-disease-library', label: 'Plant Problems' },
    { href: '/articles',             label: 'Articles' },
    { href: '/how-we-compare',       label: 'How We Compare' },
    { href: '/faq',                  label: 'FAQ' },
    { href: '/service-areas',        label: 'Service Areas' },
    { href: '/about',                label: 'About' },
    { href: '/contact',              label: 'Contact', cls: 'nav-cta' },
  ];

  const currentFile = '/' + (window.location.pathname.split('/').pop() || 'index.html');

  const navHtml = NAV_LINKS.map(l => {
    const active = currentFile === l.href ? ' active' : '';
    const cls = l.cls ? ` ${l.cls}` : '';
    return `<a href="${l.href}" class="${(active + cls).trim()}">${l.label}</a>`;
  }).join('');

  const bottomBar = `
<div class="bottom-nav">
  <div class="header-inner">
    <a href="/" class="logo"><img src="/images/lpp-logo-mark.png" alt="Lawns Plants & Pests LLC logo — locally owned pest control, lawn care, and plant health care in Harrisburg, PA" /></a>
    <button class="menu-toggle" aria-label="Open menu" onclick="this.nextElementSibling.classList.toggle('open')">
      <span></span><span></span><span></span>
    </button>
    <nav>${navHtml}</nav>
  </div>
</div>`;

  const footer = `
<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4>Lawns Plants &amp; Pests LLC</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">3506 High St.<br>Harrisburg, PA 17109<br><br><a href="tel:7173793248" style="color:#fff;font-weight:bold;">717-379-3248</a><br><a href="mailto:Lawnsplantspests@gmail.com" style="color:rgba(255,255,255,0.8);">Lawnsplantspests@gmail.com</a></p>
    </div>
    <div class="footer-col">
      <h4>Hours</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">Phone &amp; text: 7 days<br>Service visits: Mon–Fri by appointment<br>Saturdays by emergency request only<br>Same-day emergency response for active stinging nests &amp; wildlife in living spaces</p>
    </div>
    <div class="footer-col">
      <h4>Credentials</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">PA Licensed Pesticide Applicator since 2005<br>8 License Categories<br>PA Certified NWCO<br>Fully Insured · BBB A+ Rated<br>Working Beekeeper</p>
      <a id="COCBadgeURL" href="https://www.chamberofcommerce.com/business-directory/pennsylvania/harrisburg/pest-control-service/2015298459-lawns-plants-pests-llc?source=memberwebsite" target="_blank" rel="noopener" aria-label="Lawns Plants &amp; Pests on ChamberofCommerce.com"><img style="width:auto;height:150px;margin-top:12px;" id="COCBadgeIMG" src="https://coc.codes/images/badge/2015298459" alt="ChamberofCommerce.com member badge for Lawns Plants &amp; Pests LLC"></a>
    </div>
    <div class="footer-col">
      <h4>Follow</h4>
      <div class="social-icons">
        <a href="https://www.facebook.com/Lawnsplantspests/" class="social-icon social-fb" aria-label="Lawns Plants &amp; Pests on Facebook" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
        </a>
        <a href="https://www.instagram.com/Lawnsplantspests/" class="social-icon social-ig" aria-label="Lawns Plants &amp; Pests on Instagram" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38-.66.67-1.07 1.34-1.38 2.13-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@lawnsplantspests" class="social-icon social-tt" aria-label="Lawns Plants &amp; Pests on TikTok" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.6 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.64-.31z"/></svg>
        </a>
      </div>
      <a href="https://g.page/r/CU6D7DdjSKmQEBM/review" target="_blank" rel="noopener">Leave a Google review</a>
      <a href="https://allemanapiary.com" target="_blank" rel="noopener">The Alleman Apiary</a>
      <a href="https://plentyofpetalspa.com" target="_blank" rel="noopener">Plenty of Petals</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>©2026 Lawns Plants &amp; Pests LLC · Pennsylvania LLC · Licensed &amp; Insured</span>
    <span><a href="/privacy">Privacy Policy</a> · <a href="https://lawnsplantspests.com">lawnsplantspests.com</a></span>
  </div>
</footer>`;

  // Sticky call/text bar — mobile only, CSS hides it above 768px
  const callBar = `
<a href="tel:7173793248" class="call-bar" aria-label="Call or text Lawns Plants &amp; Pests at 717-379-3248">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  Call or Text 717-379-3248
</a>`;

  function injectChrome() {
    document.body.insertAdjacentHTML('afterbegin', bottomBar);
    document.body.insertAdjacentHTML('beforeend', footer);
    document.body.insertAdjacentHTML('beforeend', callBar);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChrome);
  } else {
    injectChrome();
  }
})();
