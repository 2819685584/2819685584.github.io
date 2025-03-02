/**
 * 更新时钟和天气显示（保持原有逻辑不变）
 * @param {Object} e - 天气数据对象，包含 now 属性（icon、text、temp、humidity、windDir 等字段）
 * @param {string} c - 城市名称
 */
function clockUpdateTime(e, c) {
  let a = "#000";
  switch (e.now.icon) {
    case "100":
      a = "#fdcc45";
      break;
    case "101":
      a = "#fe6976";
      break;
    case "102":
    case "103":
      a = "#fe7f5b";
      break;
    case "104":
    case "150":
    case "151":
    case "152":
    case "153":
    case "154":
    case "800":
    case "801":
    case "802":
    case "803":
    case "804":
    case "805":
    case "806":
    case "807":
      a = "#2152d1";
      break;
    case "300":
    case "301":
    case "305":
    case "306":
    case "307":
    case "308":
    case "309":
    case "310":
    case "311":
    case "312":
    case "313":
    case "314":
    case "315":
    case "316":
    case "317":
    case "318":
    case "350":
    case "351":
    case "399":
      a = "#49b1f5";
      break;
    case "302":
    case "303":
    case "304":
      a = "#fdcc46";
      break;
    case "400":
    case "401":
    case "402":
    case "403":
    case "404":
    case "405":
    case "406":
    case "407":
    case "408":
    case "409":
    case "410":
    case "456":
    case "457":
    case "499":
      a = "#a3c2dc";
      break;
    case "500":
    case "501":
    case "502":
    case "503":
    case "504":
    case "507":
    case "508":
    case "509":
    case "510":
    case "511":
    case "512":
    case "513":
    case "514":
    case "515":
      a = "#97acba";
      break;
    case "900":
    case "999":
      a = "red";
      break;
    case "901":
      a = "#179fff";
      break;
  }
  var t = document.getElementById("hexo_electric_clock");
  var clock_box_html = `
  <div class="clock-row">
    <span id="card-clock-clockdate" class="card-clock-clockdate"></span>
    <span class="card-clock-weather">
      <i class="qi-${e.now.icon}-fill" style="color: ${a}"></i> ${e.now.text} <span>${e.now.temp}</span> ℃
    </span>
    <span class="card-clock-humidity">💧 ${e.now.humidity}%</span>
  </div>
  <div class="clock-row">
    <span id="card-clock-time" class="card-clock-time"></span>
  </div>
  <div class="clock-row">
    <span class="card-clock-windDir"> <i class="qi-gale"></i> ${e.now.windDir}</span>
    <span class="card-clock-location">${c}</span>
    <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
  </div>
  `;
  var s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var n = document.getElementById("card-clock-loading");

  // 定时更新时钟时间、日期和 AM/PM 信息
  function r() {
    var e,
      c = new Date();
    var a =
      o(c.getHours(), 2) +
      ":" +
      o(c.getMinutes(), 2) +
      ":" +
      o(c.getSeconds(), 2);
    var t =
      o(c.getFullYear(), 4) +
      "-" +
      o(c.getMonth() + 1, 2) +
      "-" +
      o(c.getDate(), 2) +
      " " +
      s[c.getDay()];
    var n = c.getHours();
    if (n > 12) {
      n -= 12;
      e = " P M";
    } else {
      e = " A M";
    }
    if (document.getElementById("card-clock-time")) {
      var r = document.getElementById("card-clock-time"),
        l = document.getElementById("card-clock-clockdate"),
        i = document.getElementById("card-clock-dackorlight");
      r.innerHTML = a;
      l.innerHTML = t;
      i.innerHTML = e;
    }
  }
  function o(e, c) {
    var a = "";
    for (var t = 0; t < c; t++) a += "0";
    return (a + e).slice(-c);
  }
  if (n) {
    n.innerHTML = "";
  }
  t.innerHTML = clock_box_html;
  setInterval(r, 1000);
  r();
}

/**
 * 获取地理位置信息后拼接参数请求天气数据
 */
function getIpInfo() {
  let cityName = "长沙市";
  let location = "";

  // 封装天气请求，确保 URL 始终带上 location 与 key 参数
  function fetchWeather(location) {
    let weatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${qweather_key}`;
    console.log("Fetching weather from: " + weatherUrl);
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        if (document.getElementById("hexo_electric_clock")) {
          clockUpdateTime(data, cityName);
        }
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  }

  if (clock_default_rectangle_enable === "true") {
    // 使用预设的 rectangle 坐标
    location = clock_rectangle;
    fetch(
      `https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "1") {
          const addr = data.regeocode.addressComponent;
          cityName = Array.isArray(addr.city) ? addr.province : addr.city;
        }
        fetchWeather(location);
      })
      .catch((err) => {
        console.error("Error fetching geocode:", err);
        fetchWeather(location);
      });
  } else {
    // 使用 IP 定位获取位置
    fetch(`https://restapi.amap.com/v3/ip?key=${gaud_map_key}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.rectangle) {
          // 如果 rectangle 存在，则使用其第一个坐标
          location = Array.isArray(data.rectangle)
            ? clock_rectangle
            : data.rectangle.split(";")[0];
        } else {
          location = clock_rectangle; // 备用坐标
        }
        // 如果可以通过逆地理编码获取详细地址，则获取城市名称
        if (data.rectangle && !Array.isArray(data.rectangle)) {
          fetch(
            `https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`
          )
            .then((response) => response.json())
            .then((addrData) => {
              if (addrData.status === "1") {
                const addr = addrData.regeocode.addressComponent;
                cityName = Array.isArray(addr.city) ? addr.province : addr.city;
              }
              fetchWeather(location);
            })
            .catch((err) => {
              console.error("Error fetching geocode:", err);
              fetchWeather(location);
            });
        } else {
          fetchWeather(location);
        }
      })
      .catch((err) => {
        console.error("Error fetching IP info:", err);
        fetchWeather(clock_rectangle);
      });
  }
}

getIpInfo();
