(function () {
  var bound = false;

  function closeNav(nav, toggle) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openNav(nav, toggle) {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  function bind(nav) {
    if (bound) return;
    var toggle = nav.querySelector(".nav-toggle");
    var links = nav.querySelector(".nav-links");
    if (!toggle || !links) return;
    bound = true;

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav(nav, toggle);
      else openNav(nav, toggle);
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav(nav, toggle);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav(nav, toggle);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 901px)").matches) {
        closeNav(nav, toggle);
      }
    });
  }

  function findAndBind() {
    var nav = document.querySelector("nav.nav");
    if (nav) {
      bind(nav);
      return true;
    }
    return false;
  }

  if (findAndBind()) return;

  var observer = new MutationObserver(function () {
    if (findAndBind()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
