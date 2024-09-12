var now = new Date(); // 当前时间
var birthDate = new Date("2000-01-07"); // 你的出生日期

function calculateDaysLived() {
  // 计算两个日期之间的差异（毫秒）
  var timeDiff = now - birthDate;
  
  // 将差异转换为天数
  var diffDays = timeDiff / (1000 * 60 * 60 * 24);
  
  // 获取整数天数
  var daysLived = Math.floor(diffDays);
  
  // 输出结果
  let content = `<div style="font-size:13px;font-weight:bold">
    从出生到现在已经活了 ${daysLived} 天
  </div>`;

  // 更新页面上的内容
  if (document.getElementById("workboard")) {
    document.getElementById("workboard").innerHTML = content;
  }
}

// 每天更新一次内容
setInterval(() => {
  now = new Date(); // 更新当前时间
  calculateDaysLived();
}, 86400000); // 86400000 毫秒 = 1 天
