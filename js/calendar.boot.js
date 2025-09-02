(function () {
  // 等待依赖与目标节点就绪
  function ready() {
    const hasDeps = !!window.chineseLunar;
    const hasNodes =
      document.getElementById("card-widget-calendar") &&
      document.getElementById("card-widget-schedule");
    if (!hasDeps || !hasNodes) {
      // 依赖或节点未就绪就稍后再试（PJAX 切换/侧栏渲染有时会延后）
      setTimeout(ready, 80);
      return;
    }
    // 你的两个入口函数来自 calendar.min.js
    try {
      // 可选：先做一次“清理”，防止重复状态（你的 min 文件里没暴露 destroy，就直接重算覆盖）
      cardTimes();
      cardRefreshTimes();
    } catch (err) {
      console.error("calendar boot init error:", err);
    }
  }

  // 首次完整加载
  document.addEventListener("DOMContentLoaded", ready);

  // PJAX：Butterfly 常见事件名
  window.addEventListener("pjax:complete", ready);
  window.addEventListener("pjax:success", ready); // 部分版本/插件触发这个
  // 如果你用的是新版 pjax 插件，也可以兜底监听页面替换后的自定义事件

  // 可选：在发送请求时做些清理，避免内存泄漏（如果你在日历里有定时器/监听）
  window.addEventListener("pjax:send", () => {
    // 这里可以清 interval、移除事件等；你的现有代码没开启 timer 就略过
  });
})();
