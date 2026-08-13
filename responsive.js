(function () {
  if (window.__acmResponsiveBound) return;
  window.__acmResponsiveBound = true;

  var mq = window.matchMedia("(max-width: 900px)");
  var applying = false;

  function isGrid(el) {
    if (!el || !el.style) return false;
    if (el.classList && el.classList.contains("grid-facts")) return false;
    var cols = el.style.gridTemplateColumns;
    if (cols && cols !== "none") return true;
    var display = (el.style.display || "").toLowerCase();
    return display === "grid" && !!cols;
  }

  function stackEl(el) {
    if (!isGrid(el)) return;
    if (mq.matches) {
      if (!el.dataset.origCols) el.dataset.origCols = el.style.gridTemplateColumns;
      el.style.setProperty("grid-template-columns", "1fr", "important");
      el.classList.add("stack");
    } else if (el.dataset.origCols) {
      el.style.removeProperty("grid-template-columns");
      el.style.gridTemplateColumns = el.dataset.origCols;
      delete el.dataset.origCols;
    }
  }

  function addMore(el) {
    if (!mq.matches) return;
    if (el.dataset.moreBound) return;
    if (el.scrollHeight <= el.clientHeight + 2) return;
    el.dataset.moreBound = "1";
    var label = document.createElement("span");
    label.className = "more-label";
    label.textContent = "(more...)";
    el.insertAdjacentElement("afterend", label);
  }

  function apply(root) {
    if (applying) return;
    applying = true;
    var scope = root || document.getElementById("dc-root") || document;
    if (!scope.querySelectorAll) {
      applying = false;
      return;
    }
    scope.querySelectorAll("*").forEach(stackEl);
    if (mq.matches) {
      scope.querySelectorAll(".blueprint p, .blueprint h3, .mobile-clamp").forEach(addMore);
    } else {
      (root || document).querySelectorAll(".more-label").forEach(function (el) {
        el.remove();
      });
      scope.querySelectorAll("[data-more-bound]").forEach(function (el) {
        delete el.dataset.moreBound;
      });
    }
    applying = false;
  }

  function boot() {
    apply();
  }

  if (mq.addEventListener) mq.addEventListener("change", boot);
  else if (mq.addListener) mq.addListener(boot);

  var obs = new MutationObserver(function () {
    boot();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setTimeout(boot, 50);
  setTimeout(boot, 300);
})();
