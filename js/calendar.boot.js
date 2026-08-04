// /source/js/calendar.boot.js
(function () {
  // 等待选择器出现，出现就回调；超过超时就停止（默认 2s）
  function whenReady(selectors, cb, timeout = 2000) {
    const start = performance.now();
    const sel = Array.isArray(selectors)
      ? selectors.join(",")
      : String(selectors);
    (function tick() {
      if (document.querySelector(sel)) {
        cb();
        return;
      }
      if (performance.now() - start > timeout) return; // 超时停止，避免无限重试
      requestAnimationFrame(tick);
    })();
  }

  function initCalendarCards() {
    const hasSchedule = document.getElementById("card-widget-schedule");
    const hasCalendar = document.getElementById("card-widget-calendar");
    if (!hasSchedule && !hasCalendar) return; // 当前页没有相关卡片，直接跳过

    try {
      if (typeof cardTimes === "function") cardTimes();
    } catch (e) {
      console.error(e);
    }
    try {
      if (typeof cardRefreshTimes === "function") cardRefreshTimes();
    } catch (e) {
      console.error(e);
    }
  }

  function boot() {
    whenReady(
      ["#card-widget-schedule", "#card-widget-calendar"],
      initCalendarCards,
      2000
    );
  }

  document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("pjax:complete", boot);
})();
