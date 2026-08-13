(function () {
  if (window.__acmNavBound) return;
  window.__acmNavBound = true;

  function navFromEvent(event) {
    var toggle = event.target && event.target.closest && event.target.closest(".nav-toggle");
    if (!toggle) return null;
    return toggle.closest("nav.nav");
  }

  function closeNav(nav) {
    if (!nav) return;
    nav.classList.remove("is-open");
    var toggle = nav.querySelector(".nav-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openNav(nav) {
    nav.classList.add("is-open");
    var toggle = nav.querySelector(".nav-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
  }

  document.addEventListener("click", function (event) {
    var nav = navFromEvent(event);
    if (nav) {
      event.preventDefault();
      if (nav.classList.contains("is-open")) closeNav(nav);
      else openNav(nav);
      return;
    }
    if (event.target.closest && event.target.closest(".nav-links a")) {
      var open = document.querySelector("nav.nav.is-open");
      if (open) closeNav(open);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var open = document.querySelector("nav.nav.is-open");
    if (!open) return;
    var toggle = open.querySelector(".nav-toggle");
    closeNav(open);
    if (toggle) toggle.focus();
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(min-width: 901px)").matches) return;
    document.querySelectorAll("nav.nav.is-open").forEach(closeNav);
  });
})();
