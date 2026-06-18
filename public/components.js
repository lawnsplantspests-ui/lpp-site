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
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">3506 High St.<br>Harrisburg, PA 17109<br><br><a href="tel:7173793248" style="color:#fff;font-weight:bold;">717-379-3248</a><br><a href="mailto:Lawnsplantspests@gmail.com" style="color:rgba(255,255,255,0.8);">Lawnsplantspests@gmail.com</a></p>
    </div>
    <div class="footer-col">
      <h4>Hours</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">Phone &amp; text: 7 days<br>Service visits: Mon–Sat by appointment<br>Same-day emergency response for active stinging nests &amp; wildlife in living spaces</p>
    </div>
    <div class="footer-col">
      <h4>Credentials</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">PA Licensed Pesticide Applicator since 2005<br>8 License Categories<br>PA Certified NWCO<br>Fully Insured · BBB Accredited<br>Working Beekeepers</p>
    </div>
    <div class="footer-col">
      <h4>Family of Businesses</h4>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;"><a href="https://www.allemanapiary.com" target="_blank" rel="noopener" style="color:#fff;">The Alleman Apiary</a><br>Honey stand at 3502 High St.<br>Harrisburg, PA 17109</p>
    </div>
  </div>
  <div class="footer-bottom">
    <span>©2026 Lawns Plants &amp; Pests LLC · Pennsylvania LLC · Licensed &amp; Insured</span>
    <span><a href="https://www.lawnsplantspests.com">lawnsplantspests.com</a></span>
  </div>
</footer>`;

  // Inject after DOM is parsed, so they end up at the BOTTOM of the page
  // (not right after the script tag, which is near the top of body)
  function injectChrome() {
    document.body.insertAdjacentHTML('beforeend', bottomBar + footer);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChrome);
  } else {
    injectChrome();
  }
})();
