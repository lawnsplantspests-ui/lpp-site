// Shared bottom nav bar + footer injected on every page
// Usage: <script src="components.js"></script>

(function () {
  // Add favicon globally
  document.head.insertAdjacentHTML('beforeend',
    '<link rel="icon" type="image/png" href="images/lpp-logo-mark.png">' +
    '<link rel="apple-touch-icon" href="images/lpp-logo-mark.png">');

  const NAV_LINKS = [
    { href: 'pest-control.html',         label: 'Pest Control' },
    { href: 'lawn-care.html',            label: 'Lawn Care' },
    { href: 'plant-health-care.html',    label: 'Plant Health Care' },
    { href: 'mosquito-tick-control.html',label: 'Mosquito & Tick' },
    { href: 'deer-damage.html',          label: 'Deer Damage' },
    { href: 'nuisance-wildlife.html',    label: 'Wildlife' },
    { href: 'honey-bee-removal.html',    label: 'Honey Bee Removal' },
    { href: 'pollinator-restoration.html', label: 'Pollinator Restoration' },
    { href: 'conservation-restoration.html', label: 'Conservation & Restoration' },
    { href: 'agricultural-pest-service.html', label: 'Agricultural' },
    { href: 'aquatic-service.html',      label: 'Aquatic' },
    { href: 'articles.html',             label: 'Articles' },
    { href: 'faq.html',                  label: 'FAQ' },
    { href: 'about.html',                label: 'About' },
    { href: 'contact.html',              label: 'Contact', cls: 'nav-cta' },
  ];

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  const navHtml = NAV_LINKS.map(l => {
    const active = currentFile === l.href ? ' active' : '';
    const cls = l.cls ? ` ${l.cls}` : '';
    return `<a href="${l.href}" class="${(active + cls).trim()}">${l.label}</a>`;
  }).join('');

  const bottomBar = `
<div class="bottom-nav">
  <div class="header-inner">
    <a href="index.html" class="logo"><img src="images/lpp-logo-mark.png" alt="Lawns Plants & Pests LLC logo — locally owned pest control, lawn care, and plant health care in Harrisburg, PA" /></a>
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
    </div>
  </div>
  <div class="footer-bottom">
    <span>©2026 Lawns Plants &amp; Pests LLC · Pennsylvania LLC · Licensed &amp; Insured</span>
    <span><a href="https://www.lawnsplantspests.com">lawnsplantspests.com</a></span>
  </div>
</footer>`;

  // Inject nav at the TOP of body, footer at the BOTTOM. Wait for DOM so
  // both end up in the right place (not right after the script tag).
  function injectChrome() {
    document.body.insertAdjacentHTML('afterbegin', bottomBar);
    document.body.insertAdjacentHTML('beforeend', footer);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChrome);
  } else {
    injectChrome();
  }
})();
