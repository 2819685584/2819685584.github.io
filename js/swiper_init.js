// /source/js/swiper_init.js
(function () {
  var el = document.querySelector(".blog-slider");
  if (!el) return; // ← 当前页没有轮播，直接退出。不要 new Swiper。

  var swiper = new Swiper(el, {
    passiveListeners: true,
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: { disableOnInteraction: true, delay: 3000 },
    mousewheel: true,
    pagination: { el: ".blog-slider__pagination", clickable: true },
  });

  // 变量拼写错误：把 comtainer → container
  var container = document.getElementById("swiper_container");
  if (container) {
    container.addEventListener("mouseenter", () => swiper.autoplay.stop());
    container.addEventListener("mouseleave", () => swiper.autoplay.start());
  }
})();
