var version = 1.1;
var win = window;
var _hiidoDebug = win._hiidoDebug || false;
var logger = {
    log: function () {
        if (_hiidoDebug) {
            win.console && win.console.log(arguments);
        }
    }
};

var hiido = {
    domain: "ylog.hiido.com",
    ipPrefix: "183.61.2.",
    ips: [91, 92, 94, 95, 96, 97, 98],
    getServerUrl: function (host) {
        host = host || this.domain;
        var ptl = location.protocol;
        var path = "j.gif?";
        return ptl + "//" + host + "/" + path;
    },
    randomIp: function () {
        var Rand = Math.random();
        var index = Math.round(Rand * (this.ips.length - 1));
        var suff = this.ips[index];
        return this.ipPrefix + suff;
    },
    getParam: function (opt) {
        var obj = opt;
        var param = [];
        obj.time = parseInt(1 * new Date() / 1000);
        obj.ui = this.getCookie("hiido_ui");
        obj.username = this.getCookie("username");
        for (var h in obj) {
            if (obj.hasOwnProperty(h)) {
                param.push(encodeURIComponent(h) + "=" + (obj[h] === undefined || obj[h] === null ? "" : encodeURIComponent(obj[h])))
            }
        }
        return param.join("&");
    },
    send: function (url, backurl, times) {
        var reties = times || 0;
        var img = new Image();
        var self = this;
        img.onerror = function () {
            if (reties <= 1) {
                self.send(url, backurl, ++reties);
            } else if (reties == 2) {
                self.send(backurl, backurl, ++reties);
            }
        }
        img.src = url;
    },
    getCookie: function (name) {
        var arr,
          RE = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(RE)) {
            return unescape(arr[2]);
        } else {
            return ''
        }
        ;
    },
    stat: function (o) {
        if (!o) return;
        var svr = hiido.getServerUrl();
        var param = hiido.getParam(o);
        var url = svr + param
        var backurl = hiido.getServerUrl(hiido.randomIp()) + param;
        hiido.send(url, backurl)
    }
};

/***
 *对外提供的方法
 */
var iface = {
    ver: version,
    stat: function (opt) {
        if (!opt) {
            return false;
        }
        opt = this.extend(opt);
        var svr = hiido.getServerUrl();
        var param = hiido.getParam(opt);
        var url = svr + param
        var backurl = hiido.getServerUrl(hiido.randomIp()) + param;
        hiido.send(url, backurl)
    },
    defaultOpts: {
        act: 'webevent',
        uid: window.uid || 0,
        eventid: '',
        value: 1,
        class1: 'wonderful',
        class2: '',
        eventype: '1'
    },
    extend: function (opt) {
        var ret = {};
        for (var key in this.defaultOpts) {
            ret[key] = this.defaultOpts[key];
        }
        for (var key in opt) {
            ret[key] = opt[key];
        }
        return ret;
    }
};


module.exports = iface;
window.appHiido = iface;


