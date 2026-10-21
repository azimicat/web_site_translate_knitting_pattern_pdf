// 全ページ共通の動き：メニューの開閉と、スクロールで要素をふわっと表示する。
// JavaScript が動かない環境でも内容がすべて見えるよう、隠すのは html に .js が付いたときだけにしている。
(function () {
  document.documentElement.classList.add("js");

  var button = document.querySelector(".menu-button");
  var menu = document.getElementById("menu");
  if (button && menu) {
    var setOpen = function (open) {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };
    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  var targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
