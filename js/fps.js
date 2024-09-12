if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            if (fps <= 15) {
                var kd = `<span style="color:#39c5bb">卡成ppt😭</span>`
            } else if (fps <= 30) {
                var kd = `<span style="color:#39c5bb">电竞级帧率😓</span>`
            } else if (fps <= 60) {
                var kd = `<span style="color:#39c5bb">有点难受😨</span>`
            } else if (fps < 90) {
                var kd = `<span style="color:#39c5bb">不太流畅😥</span>`
            } else if (fps <= 144) {
                var kd = `<span style="color:#39c5bb">还不错哦😀</span>`
            } else {
                var kd = `<span style="color:#39c5bb">十分流畅😆</span>`
            }
            document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
} else {
    document.getElementById("fps").style = "display:none!important"
}