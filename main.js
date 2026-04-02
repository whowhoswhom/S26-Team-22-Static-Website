/* ============================================================
   Capstone Project — S26-Team22
   main.js — AOS, smooth scroll, active nav, mobile collapse
   ============================================================ */

// ── AOS (Animate On Scroll) Init ───────────────────────────────
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
  disable: function () {
    return window.innerWidth < 400;
  }
});

// ── Active Nav Link Highlighting ───────────────────────────────
(function () {
  var nav = document.getElementById('mainNav');
  var navLinks = document.querySelectorAll('#mainNav .nav-link[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var current = '';

    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// ── Smooth Scroll with Nav Offset ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    if (targetId === '#') return;
    var target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    var navHeight = document.getElementById('mainNav').offsetHeight;
    var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

// ── Mobile Collapse: Close on Link Click ───────────────────────
(function () {
  var navCollapse = document.getElementById('navbarNav');
  if (!navCollapse) return;

  document.querySelectorAll('#navbarNav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });
})();

// ── Current Year in Footer ─────────────────────────────────────
(function () {
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
