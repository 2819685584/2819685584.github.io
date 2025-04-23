/* 1.--------------------------------universe.js --------------------------------- */
function dark() {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  var n,
    e,
    i,
    h,
    t = 0.05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];
  function f() {
    (n = window.innerWidth),
      (e = window.innerHeight),
      (i = 0.216 * n),
      s.setAttribute("width", n),
      s.setAttribute("height", e);
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw();
    }
  }
  function y() {
    (this.reset = function () {
      (this.giant = m(3)),
        (this.comet = !this.giant && !o && m(10)),
        (this.x = l(0, n - 10)),
        (this.y = l(0, e)),
        (this.r = l(1.1, 2.6)),
        (this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t),
        (this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120)),
        (this.fadingOut = null),
        (this.fadingIn = !0),
        (this.opacity = 0),
        (this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet + 1 - 1))),
        (this.do = l(5e-4, 0.002) + 0.001 * (this.comet + 1 - 1));
    }),
      (this.fadeIn = function () {
        this.fadingIn &&
          ((this.fadingIn = !(this.opacity > this.opacityTresh)),
          (this.opacity += this.do));
      }),
      (this.fadeOut = function () {
        this.fadingOut &&
          ((this.fadingOut = !(this.opacity < 0)),
          (this.opacity -= this.do / 2),
          (this.x > n || this.y < 0) && ((this.fadingOut = !1), this.reset()));
      }),
      (this.draw = function () {
        if ((h.beginPath(), this.giant))
          (h.fillStyle = "rgba(" + a + "," + this.opacity + ")"),
            h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
        else if (this.comet) {
          (h.fillStyle = "rgba(" + d + "," + this.opacity + ")"),
            h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
          for (var t = 0; t < 30; t++)
            (h.fillStyle =
              "rgba(" +
              d +
              "," +
              (this.opacity - (this.opacity / 20) * t) +
              ")"),
              h.rect(
                this.x - (this.dx / 4) * t,
                this.y - (this.dy / 4) * t - 2,
                2,
                2
              ),
              h.fill();
        } else
          (h.fillStyle = "rgba(" + r + "," + this.opacity + ")"),
            h.rect(this.x, this.y, this.r, this.r);
        h.closePath(), h.fill();
      }),
      (this.move = function () {
        (this.x += this.dx),
          (this.y += this.dy),
          !1 === this.fadingOut && this.reset(),
          (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0);
      }),
      setTimeout(function () {
        o = !1;
      }, 50);
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t;
  }
  function l(t, i) {
    return Math.random() * (i - t) + t;
  }
  f(),
    window.addEventListener("resize", f, !1),
    (function () {
      h = s.getContext("2d");
      for (var t = 0; t < i; t++) (c[t] = new y()), c[t].reset();
      u();
    })(),
    (function t() {
      document.getElementsByTagName("html")[0].getAttribute("data-theme") ==
        "dark" && u(),
        window.requestAnimationFrame(t);
    })();
}
dark();
/* 1.--------------------------------universe.js --------------------------------- */


/* 2.--------------------------------fps.js --------------------------------- */
if (
  window.localStorage.getItem("fpson") == undefined ||
  window.localStorage.getItem("fpson") == "1"
) {
  var rAF = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
    var now = Date.now();
    var fs = now - lastFameTime;
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
      if (fps <= 15) {
        var kd = `<span style="color:#39c5bb">卡成ppt😭</span>`;
      } else if (fps <= 30) {
        var kd = `<span style="color:#39c5bb">电竞级帧率😓</span>`;
      } else if (fps <= 60) {
        var kd = `<span style="color:#39c5bb">有点难受😨</span>`;
      } else if (fps < 90) {
        var kd = `<span style="color:#39c5bb">不太流畅😥</span>`;
      } else if (fps <= 144) {
        var kd = `<span style="color:#39c5bb">还不错哦😀</span>`;
      } else {
        var kd = `<span style="color:#39c5bb">十分流畅😆</span>`;
      }
      document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
      frame = 0;
      lastTime = now;
    }

    rAF(loop);
  };

  loop();
} else {
  document.getElementById("fps").style = "display:none!important";
}
/* 2.--------------------------------fps.js --------------------------------- */


/* 3.--------------------------------txmap.js --------------------------------- */
function getDistance(a, e, s, c) {
  const { sin: t, cos: r, asin: n, PI: o, hypot: i } = Math;
  let b = (a, e) => (
      (a *= o / 180), { x: r((e *= o / 180)) * r(a), y: r(e) * t(a), z: t(e) }
    ),
    p = b(a, e),
    k = b(s, c),
    u = 2 * n(i(p.x - k.x, p.y - k.y, p.z - k.z) / 2) * 6371;
  return Math.round(u);
}
function showWelcome() {
  let a,
    e,
    s,
    c = getDistance(
      108.367, // 设置自己所在地的经度
      22.8163, // 设置自己所在地的纬度
      ipLoacation.result.location.lng,
      ipLoacation.result.location.lat
    ),
    t = ipLoacation.result.ad_info.nation;
  switch (ipLoacation.result.ad_info.nation) {
    case "日本":
      e = "よろしく，一起去看樱花吗";
      break;
    case "美国":
      e = "Let us live in peace!";
      break;
    case "英国":
      e = "想同你一起夜乘伦敦眼";
      break;
    case "俄罗斯":
      e = "干了这瓶伏特加！";
      break;
    case "法国":
      e = "C'est La Vie";
      break;
    case "德国":
      e = "Die Zeit verging im Fluge.";
      break;
    case "澳大利亚":
      e = "一起去大堡礁吧！";
      break;
    case "加拿大":
      e = "拾起一片枫叶赠予你";
      break;
    case "中国":
      switch (
        ((t =
          ipLoacation.result.ad_info.province +
          " " +
          ipLoacation.result.ad_info.city +
          " " +
          ipLoacation.result.ad_info.district),
        (a = ipLoacation.result.ip),
        ipLoacation.result.ad_info.province)
      ) {
        case "北京市":
          e = "京爷，带我走吧😭";
          break;
        case "天津市":
          e = "讲段相声吧。";
          break;
        case "河北省":
          e = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
          break;
        case "山西省":
          e = "展开坐具长三尺，已占山河五百余。";
          break;
        case "内蒙古自治区":
          e = "天苍苍，野茫茫，风吹草低见牛羊。";
          break;
        case "辽宁省":
          e = "山海有情 天辽地宁。";
          break;
        case "吉林省":
          e = "北国江城，雾凇之都。";
          break;
        case "黑龙江省":
          e = "很喜欢哈尔滨大剧院。";
          break;
        case "上海市":
          e = "十里洋场烟花地,风云际会上海滩。";
          break;
        case "江苏省":
          e = "上有天堂，下有苏杭。";
        case "浙江省":
          e = "东风渐绿西湖柳，雁已还人未南归。";
          break;
        case "河南省":
          e = "五千年文化中原，八百里锦绣河南。";
          break;
        case "安徽省":
          e = "蚌埠住了，芜湖起飞。";
          break;
        case "福建省":
          e = "井邑白云间，岩城远带山。";
          break;
        case "江西省":
          e = "落霞与孤鹜齐飞，秋水共长天一色。";
          break;
        case "山东省":
          e = "遥望齐州九点烟，一泓海水杯中泻。";
          break;
        case "湖北省":
          e = "九省通衢会,中南繁华京。";
          break;
        case "湖南省":
          e = "三湘四水，物华天宝，山水之间，生机勃勃。";
          break;
        case "广东省":
          e = "山河粤秀，大美广东。";
          break;
        case "广西壮族自治区":
          e = "八桂大地,源远流长。";
          break;
        case "海南省":
          e = "朝观日出逐白浪，夕看云起收霞光。";
          break;
        case "四川省":
          e = "不至巴蜀，不识中国";
          break;
        case "贵州省":
          e = "青山绿水、人杰地灵、闻名遐迩、美不胜收。";
          break;
        case "云南省":
          e = "玉龙飞舞云缠绕，万仞冰川直耸天。";
          break;
        case "西藏自治区":
          e = "躺在茫茫草原上，仰望蓝天。";
          break;
        case "陕西省":
          e = "三秦大地,物华天宝,人杰地灵。";
          break;
        case "甘肃省":
          e = "羌笛何须怨杨柳，春风不度玉门关。";
          break;
        case "青海省":
          e = "天上瑶池境，人间青海湖。";
          break;
        case "宁夏回族自治区":
          e = "大漠孤烟直，长河落日圆。";
          break;
        case "新疆维吾尔自治区":
          e = "驼铃古道丝绸路，胡马犹闻唐汉风。";
          break;
        case "台湾省":
          e = "我在这头，大陆在那头。";
          break;
        case "香港特别行政区":
          e = "东方明珠,璀璨夺目。";
          break;
        case "澳门特别行政区":
          e = "性感荷官，在线发牌。";
          break;
        default:
          e = "带我去你的城市逛逛吧！";
      }
      break;
    default:
      e = "带我去你的国家逛逛吧。";
  }
  let r = new Date();
  (s =
    r.getHours() >= 6 && r.getHours() < 11
      ? "<span>上午好，</span>一日之计在于晨!"
      : r.getHours() >= 11 && r.getHours() < 13
      ? "<span>中午好，</span>到饭点了，该吃饭了！"
      : r.getHours() >= 13 && r.getHours() < 17
      ? "<span>下午好！</span>"
      : r.getHours() >= 17 && r.getHours() < 19
      ? "<span>夕阳无限好！</span>"
      : r.getHours() >= 19 && r.getHours() < 24
      ? "<span>晚上好！</span>"
      : "夜深了，早点休息，晚安！"),
    (document.getElementById(
      "welcome-info"
    ).innerHTML = `<b><center>🎉 欢迎 🎉</center>&emsp;&emsp; 欢迎来自&nbsp;<span style="color: #f9a681;">${t}</span>&nbsp;的小伙伴。${s}<br>&nbsp; &nbsp; &nbsp; &nbsp; \n我们之间相距<span style="color: #f9a681;">&nbsp;${c}&nbsp;</span>公里，您的IP地址为：<span style="color: #f9a681;">${a}&nbsp;</span><br>&emsp;&emsp;${e}`);
}
$.ajax({
  type: "get",
  url: "https://apis.map.qq.com/ws/location/v1/ip",
  data: { key: "N7JBZ-6U4EG-ZKSQW-Q3IRQ-XZFTO-34BNZ", output: "jsonp" }, // 这里放置自己的key
  dataType: "jsonp",
  success: function (a) {
    ipLoacation = a;
  },
}),
  (window.onload = showWelcome);
document.addEventListener("pjax:complete", showWelcome);
/* 3.--------------------------------txmap.js--------------------------------- */


/* 4.--------------------------------copyPrompt.js--------------------------------- */
document.addEventListener("copy", function () {
  new Vue({
    data: function () {
      this.$notify({
        title: "复制成功",
        message: "转载请遵守CC协议",
        position: "top-left",
        offset: 50,
        showClose: true,
        type: "success",
        duration: 4000,
      });
    },
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    new Vue({
      data: function () {
        this.$notify({
          title: "逮住😜",
          message: "小兄弟，扒源请遵循GPL协议！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 4000,
        });
      },
    });
  }
});
/* 4.--------------------------------copyPrompt.js--------------------------------- */


/* 5.--------------------------------bottom_runtime.js--------------------------------- */
setInterval(() => {
  let create_time = Math.round(new Date("2024/9/5 00:00:00").getTime() / 1000); // 在此行修改建站时间
  let timestamp = Math.round(new Date().getTime() / 1000);
  let second = timestamp - create_time;
  let time = new Array(0, 0, 0, 0, 0);

  var nol = function (h) {
    return h > 9 ? h : "0" + h;
  };

  if (second >= 365 * 24 * 3600) {
    time[0] = parseInt(second / (365 * 24 * 3600));
    second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
  }
  if (second >= 3600) {
    time[2] = nol(parseInt(second / 3600));
    second %= 3600;
  }
  if (second >= 60) {
    time[3] = nol(parseInt(second / 60));
    second %= 60;
  }
  if (second >= 0) {
    time[4] = nol(second);
  }

  let currentTimeHtml = "本站已正常运行：";
  if (time[0] != 0) {
    currentTimeHtml += time[0] + "年 ";
  }
  currentTimeHtml +=
    time[1] + "天 " + time[2] + "时 " + time[3] + "分 " + time[4] + "秒";
  document.getElementById("runtime").innerHTML = currentTimeHtml;
}, 1000);
/* 5.--------------------------------bottom_runtime.js--------------------------------- */

