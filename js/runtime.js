var now = new Date();
var year, month, week, date, dates, weekStr, monthStr;
var asideTime, asideDay, asideDayNum;
var animalYear, ganzhiYear, lunarMon, lunarDay;
cardTimes();
// 刷新时钟时间
function cardRefreshTimes() {
    var a_t_r = document.getElementById("aside-time-right");
    if(a_t_r)a_t_r.innerHTML = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
    cardRefreshTimes();
}, 1000);


