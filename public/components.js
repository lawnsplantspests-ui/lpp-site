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
