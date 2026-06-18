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
    { href: 'honey-bee-removal.html',    label: 'Honey Bee Removal' },
    { href: 'pollinator-restoration.html', label: 'Pollinators' },
    { href: 'mosquito-tick-control.html',label: 'Mosquito & Tick' },
    { href: 'plant-health-care.html',    label: 'Plant Health Care' },
    { href: 'deer-damage.html',          label: 'Deer Damage' },
    { href: 'nuisance-wildlife.html',    label: 'Wildlife' },
    { href: 'agricultural-pest-service.html', label: 'Agricultural' },
    { href: 'aquatic-service.html',      label: 'Aquatic' },
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
    <a href="index.html" class="logo"><img src="images/lpp-logo-mark.png" alt="Lawns Plants & Pests LLC" /></a>
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
      <p style="color:rgba(255,255,255,0.55);line-height:1.6;">Licensed PA Pesticide Applicator &amp; NWCO<br>Serving Central PA since 2005<br><a href="tel:7173793248" style="color:rgba(255,255,255,0.8);">717-379-3248</a></p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <a href="pest-control.html">Pest Control</a>
      <a href="lawn-care.html">Lawn Care</a>
      <a href="honey-bee-removal.html">Honey Bee Removal</a>
      <a href="mosquito-tick-control.html">Mosquito &amp; Tick Control</a>
      <a href="plant-health-care.html">Plant Health Care</a>
      <a href="nuisance-wildlife.html">Nuisance Wildlife</a>
    </div>
    <div class="footer-col">
      <h4>More Services</h4>
      <a href="pollinator-restoration.html">Pollinator Restoration</a>
      <a href="agricultural-pest-service.html">Agricultural Pest</a>
      <a href="aquatic-service.html">Aquatic Service</a>
      <a href="deer-damage.html">Deer Damage</a>
      <a href="pest-control.html#stinging-insects">Stinging Insects</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="about.html">About</a>
      <a href="faq.html">FAQ</a>
      <a href="articles.html">Articles</a>
      <a href="contact.html">Contact</a>
      <a href="https://www.allemanapiary.com" target="_blank" rel="noopener">The Alleman Apiary</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>©2026 Lawns Plants &amp; Pests LLC · Pennsylvania LLC · Licensed &amp; Insured · BBB Accredited</span>
    <span><a href="https://www.lawnsplantspests.com">lawnsplantspests.com</a></span>
  </div>
</footer>`;

  // Inject: bottom nav bar then footer at end of body (no top header)
  document.body.insertAdjacentHTML('beforeend', bottomBar + footer);
})();
