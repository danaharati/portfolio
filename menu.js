(function () {
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  var close = menu.querySelector(".mmenu__close");
  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) close.focus(); else btn.focus();
  }
  btn.addEventListener("click", function () { setOpen(true); });
  close.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false); });
  menu.addEventListener("click", function (e) { var a = e.target.closest("a[href]"); if (a && a.getAttribute("href").indexOf("#") === 0) setOpen(false); });
  matchMedia("(min-width: 801px)").addEventListener("change", function (m) { if (m.matches) { menu.classList.remove("is-open"); document.body.classList.remove("menu-open"); } });
})();
