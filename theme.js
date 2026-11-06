/* מעבר יום/לילה משותף לכל הדפים — מעגל שנפתח מאייקון המתג (View Transitions) */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  function current() {
    return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day");
  }
  function apply(next) {
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  }
  btn.addEventListener("click", function () {
    var next = current() === "night" ? "day" : "night";
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { apply(next); return; }
    var r = btn.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var t = document.startViewTransition(function () { apply(next); });
    t.ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + end + "px at " + x + "px " + y + "px)"] },
        { duration: 700, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(function () {});
  });
})();
