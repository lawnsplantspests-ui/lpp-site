// Analytics, favicon and current-page menu highlight for every page
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

  // Metricool web analytics pixel — loaded in the background, never added to the page.
  // referrerPolicy lets Metricool see which page was viewed (the site default sends only the domain).
  (function () {
    var px = new Image();
    px.referrerPolicy = 'no-referrer-when-downgrade';
    px.src = 'https://tracker.metricool.com/c3po.jpg?hash=4f37dd884475111ad3cf2dc871a61f72';
  })();

  // Add favicon globally
  document.head.insertAdjacentHTML('beforeend',
    '<link rel="icon" type="image/png" href="/images/lpp-logo-mark-nav.png">' +
    '<link rel="apple-touch-icon" href="/images/lpp-logo-mark-nav.png">');

  // The header and footer are written into each page from partials/ by
  // tools/build_chrome.py. Here we only highlight the current page's menu link.
  const currentFile = '/' + (window.location.pathname.split('/').pop() || 'index.html');

  function markActive() {
    document.querySelectorAll('a[data-nav]').forEach(function (a) {
      if (a.getAttribute('href') === currentFile) a.classList.add('active');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markActive);
  } else {
    markActive();
  }
})();
