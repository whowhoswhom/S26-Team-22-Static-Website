AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
  disable: function () {
    return window.innerWidth < 400;
  }
});

(function () {
  var nav = document.getElementById("mainNav");
  var navLinks = document.querySelectorAll('#mainNav .nav-link[href^="#"]');
  var sections = document.querySelectorAll("section[id]");

  function syncNavState() {
    if (!nav) {
      return;
    }

    var scrollY = window.scrollY;
    var current = "";

    nav.classList.toggle("scrolled", scrollY > 18);

    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", syncNavState, { passive: true });
  window.addEventListener("load", syncNavState);
  syncNavState();
})();

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (event) {
    var targetId = this.getAttribute("href");
    if (targetId === "#") {
      return;
    }

    var target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();

    var navHeight = document.getElementById("mainNav").offsetHeight;
    var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

(function () {
  var navCollapse = document.getElementById("navbarNav");
  if (!navCollapse) {
    return;
  }

  document.querySelectorAll("#navbarNav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });
})();

(function () {
  var yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
