function scroll() {
    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

function getStyle(obj, arrt) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[arrt];
    }
    else {
        return obj.currentStyle[arrt];
    }
}

// #region 缓动动画，到指定位置
function animateEnd(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.rotate = 0;
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var arrt = k;
                var end = json[k] * 100;
                var leader = parseFloat(getStyle(obj, arrt)) * 100 || 0;
                var step = (end - leader) / 40;
                step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
                obj.style.opacity = (leader + step) / 100;
                obj.style.filter = "alpha(opacity = " + leader + step + ")";
                if (leader != end) {
                    flag = false;
                }
            }
            else if (k == "zIndex") {
                obj.style.zIndex = json[k];
            }
            else if (k == "transform") {
                var arrt = k;
                var end = json[k];
                //var leader = parseInt(getStyle(obj, arrt).replace("rotate(", "").replace("deg)", "")) || 0;
                //ar step = (end - leader) / 10;
                //step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
                var step = 9;
                obj.rotate = obj.rotate + step;
                if (end - obj.rotate > step) {
                    obj.style[arrt] = "rotate(" + obj.rotate + "deg)";
                    flag = false;
                }
                else {
                    obj.style[arrt] = "rotate(" + end + "deg)";
                }
            }


            else {
                var arrt = k;
                var end = json[k];
                var leader = parseInt(getStyle(obj, arrt)) || 0;
                var step = (end - leader) / 10;
                step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
                obj.style[arrt] = leader + step + "px";
                if (leader != end) {
                    flag = false;
                }
            }

        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
// #endregion

// #region 匀速动画，到指定位置
function animateEndAvg(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var attr = k;
                var end = json[k] * 100;
                var leader = parseFloat(getStyle(obj, attr)) * 100 || 0;
                var step = 4;
                if (leader > end) {
                    step = -step;
                }
                var distance = Math.abs(leader - end);
                if (distance > step) {
                    obj.style.opacity = (leader + step) / 100;
                    obj.style.filter = "alpha(opacity = " + leader + step + ")";
                    flag = false;
                }
                else {
                    obj.style.opacity = end / 100;
                    obj.style.filter = "alpha(opacity = " + end + ")";
                }
            }
            else if (k == "zIndex") {
                obj.style.zIndex = json[k];
            }

            else {
                var attr = k;
                var end = json[k];
                var leader = parseInt(getStyle(obj, attr)) || 0;
                var step = 10;
                if (leader > end) {
                    step = -step;
                }
                var distance = Math.abs(leader - end);
                if (distance > step) {
                    obj.style[attr] = leader + step + "px";
                    flag = false;
                }
                else {
                    obj.style[attr] = end + "px";
                }
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}
// #endregion

// #region 缓动动画，指定大小
function animateSize(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    var jsonCount = {};
    for (var count in json) {
        jsonCount[count] = 0;
    }
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {

            var attr = k;
            var distance = json[k];
            var abs = Math.abs(distance) / distance;
            var step = Math.ceil((Math.abs(distance) - jsonCount[k]) / 10);
            var leader = parseInt(getStyle(obj, k)) || 0;
            if (jsonCount[k] < Math.abs(distance)) {
                obj.style[k] = leader + (abs * step) + "px";
                jsonCount[k] += step;
                flag = false;
            }
            else {
                var d = Math.abs(distance);//要移动的距离
                var n = jsonCount[k];//已经移动的距离
                obj.style[k] = leader + abs * (d - n) + "px";
            }

        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}
// #endregion

// #region 匀速动画 指定大小
function animateSizeAvg(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    var jsonCount = {};
    for (var count in json) {
        jsonCount[count] = 0;
    }
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            var attr = k;
            var distance = json[k];
            var abs = Math.abs(distance) / distance;
            var step = 10;
            var leader = parseInt(getStyle(obj, k)) || 0;
            if (jsonCount[k] < Math.abs(distance)) {
                obj.style[k] = leader + (abs * step) + "px";
                jsonCount[k] += step;
                flag = false;
            }
            else {
                var d = Math.abs(distance);//要移动的距离
                var n = jsonCount[k];//已经移动的距离
                obj.style[k] = leader + abs * (d - n) + "px";
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}
// #endregion

function getmatrix(a, b, c, d, e, f) {
    var aa = Math.round(180 * Math.asin(a) / Math.PI);
    var bb = Math.round(180 * Math.acos(b) / Math.PI);
    var cc = Math.round(180 * Math.asin(c) / Math.PI);
    var dd = Math.round(180 * Math.acos(d) / Math.PI);
    var deg = 0;
    if (aa == bb || -aa == bb) {
        deg = dd;
    } else if (-aa + bb == 180) {
        deg = 180 + cc;
    } else if (aa + bb == 180) {
        deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;
    //return (aa+','+bb+','+cc+','+dd);  
}
