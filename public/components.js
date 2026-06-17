// Shared nav + footer injected on every page
// Usage: <script src="../components.js"></script> or <script src="components.js"></script>

(function () {
  const NAV_LINKS = [
    { href: 'pest-control.html',         label: 'Pest Control' },
    { href: 'stinging-insects.html',     label: 'Stinging Insects' },
    { href: 'lawn-care.html',            label: 'Lawn Care' },
    { href: 'honey-bee-removal.html',    label: 'Honey Bee Removal' },
    { href: 'pollinator-restoration.html', label: 'Pollinators' },
    { href: 'mosquito-tick-control.html',label: 'Mosquito & Tick' },
    { href: 'plant-health-care.html',    label: 'Plant Health Care' },
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

  const header = `
<header>
  <div class="header-inner">
    <a href="index.html" class="logo">Lawns Plants &amp; Pests LLC<br><span>Harrisburg, PA</span></a>
    <button class="menu-toggle" aria-label="Open menu" onclick="this.nextElementSibling.classList.toggle('open')">
      <span></span><span></span><span></span>
    </button>
    <nav>${navHtml}</nav>
  </div>
</header>`;

  const footer = `
<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4>Lawns Plants &amp; Pests LLC</h4>
      <p style="color:rgba(255,255,255,0.55);line-height:1.6;">Licensed PA Pesticide Applicator &amp; NWCO<br>Serving Central PA since 2005<br>717-379-3248</p>
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
      <a href="stinging-insects.html">Stinging Insects</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="about.html">About</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact</a>
      <a href="https://www.allemanapiary.com" target="_blank" rel="noopener">The Alleman Apiary ↗</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>©2026 Lawns Plants &amp; Pests LLC · Pennsylvania LLC · Licensed &amp; Insured</span>
    <span><a href="https://www.lawnsplantspests.com">lawnsplantspests.com</a></span>
  </div>
</footer>`;

  // Inject
  document.currentScript.insertAdjacentHTML('beforebegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
})();
