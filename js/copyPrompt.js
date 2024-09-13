document.addEventListener("copy", function () {
  Vue.prototype.$notify({
    title: "复制成功",
    message: "转载请遵守CC协议",
    position: "top-left",
    offset: 50,
    showClose: true,
    type: "success",
    duration: 4000,
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    Vue.prototype.$notify({
      title: "逮住😜",
      message: "小兄弟，扒源请遵循GPL协议！",
      position: "top-left",
      offset: 50,
      showClose: true,
      type: "warning",
      duration: 4000,
    });
  }
});
