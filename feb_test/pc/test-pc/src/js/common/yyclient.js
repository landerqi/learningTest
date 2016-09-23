var $ = require("jquery");

var myUid = window.myUid = -1;
var indexId = 0;

var wait = function (callback, time) {
    setTimeout(function () {
        callback.apply(this);
    }, time || 0);
};

var nextId = function () {
    return indexId++;
}


var tkArr = [];
var checkRepeatForTicket = function (ticket) {
    for (var i in tkArr) {
        if (tkArr[i] == ticket) {
            return true;
        }
    }
    tkArr.push(ticket);
    return false;
}

var queue = [], ticketQueue = [];

var o = {
    enterChannel: function (asid, sid, subsid) {
        try {
            var params = '{\"channelId\":\"' + asid + '\",\"subId\":\"' + subsid
              + '\",\"displayId\":\"' + sid + '\"}';
            window.external.sendCommand("joinChannel", params);

        } catch (e) {
            o.goChannel(asid, sid, subsid);
        }
        return false;
    },
    enterWonderWorld: function (sid, subsid) {
        try {
            var params = '{\"channelId\":\"' + sid + '\",\"subId\":\"' + subsid + '\"}';
            window.external.sendCommand("joinTemplateWithData", params);

        } catch (e) {
            o.jumpChannel(sid, subsid);
        }
        return false;
    },
    enterWonderWorldAudio: function (sid, subsid) {
        try {
            var params = '{\"channelId\":\"' + sid + '\",\"subId\":\"' + subsid + '\",\"type\":\"' + 2 + '\"}';
            window.external.sendCommand("joinTemplateWithData", params);

        } catch (e) {
            o.goChannel(sid, sid, subsid);
        }
        return false;
    },
    openTab: function (tabPid, tabSid) {
        try {
            var params = '{\"joinInfo\":\"tabPid=' + tabPid + '&tabSid=' + tabSid + '\"}';

            window.external.sendCommand("openWonderWorldTab", params);
        } catch (e) {

        }
    },
    goChannel: function (asid, sid, subsid, uid) {
        var currentUid = uid || window.currentUid || '';
        var url = "yy://join:room_id=" + sid + "&sub_room_id=" + subsid + "&uid=" + currentUid;
        if ($("#join_frm").length <= 0) {
            $('body').append($("<iframe id='join_frm' style='display:none' ></iframe>"));
        }

        $("#join_frm").attr("src", url);
    },
    jumpChannel: function (sid, subsid, uid, opts) {
        // yy://pd -[sid=87814665&subid=0&makeFriendsCmd=openSupport]
        var currentUid = uid || window.currentUid || 0;
        var strOpts = "";
        if (typeof(opts) === "object") {
            for (var key in opts) {
                strOpts += "&" + key + "=" + opts[key];
            }
        }
        var url = "yy://pd-[sid=" + sid + "&subid=" + subsid + strOpts + "&uid=" + currentUid + "]";
        if ($("#join_frm").length <= 0) {
            $('body').append($("<iframe id='join_frm' style='display:none' ></iframe>"));
        }
        $("#join_frm").attr("src", url);
    },
    playVideo: function (pid) {
        try {
            var params = "{\"joinInfo\":\"ReviewVideoCmd:url=http:\/\/video.z.yy.com\/getVideoTapeByPid.do?programId=" + pid + "|videoFrom=popularAnchor\"}";
            window.external.sendCommand("openWonderWorldTab", params);
        } catch (e) {
        }
    },
    /**
     * 获取当前登录用户的uid参数
     */
    getUid: function () {
        var df = new $.Deferred();
        //1.有UID
        if (myUid > 0) {
            wait(function () {
                df.resolve(myUid);
            });
            return df.promise();
        }

        //2.没有UID的时候
        window.getMyUidCallBack = function (reUid) {
            myUid = reUid;
            var sdf;
            if (sdf = queue.shift()) {
                sdf.resolve(reUid);
            }
        };
        try {

            queue.push(df);
            window.external.sendCommand("getMyUid", "");

        } catch (e) {
            //从队列中删除此数据
            queue.pop();
            wait(function () {
                df.resolve("");
            }, 1);
        }
        return df.promise();
    },
    getTicket: function () {
        var df = new $.Deferred();

        // 如果回调方法未定义
        if (!window.getTicketCallBack) {
            window.getTicketCallBack = function (ticket) {
                var sdf = ticketQueue.shift();
                if (sdf) {
                    sdf.resolve(ticket);
                }
            };
        }
        try {
            //添加到数组队列
            ticketQueue.push(df);
            window.external.sendCommand("getTicket", "");
        } catch (e) {
            //从队列中删除此数据
            ticketQueue.pop();

            wait(function () {
                df.resolve("");
            }, 1);
        }

        return df.promise();
    },
    openUrl: function (uri, needTicket) {
        try {
            var nt = 0;
            if (needTicket) {
                nt = 1;
                uri = encodeURIComponent(uri);
            }
            var params = '{\"url\":\"' + uri + '\",\"needTicket\":\"' + nt + '\"}';
            window.external.sendCommand("openUrl", params);
            return true;
        } catch (e) {
            return false;
        }
    },
    enterRandomChannel: function () {
        var uid = window.currentUid || 0;
        $.ajax({
            url:'http://s.fts.yy.com/activity/random_enter',
            dataType:"jsonp",
            timeout: 5000,
            data:{
                uid : uid
            }
        }).done(function(res){

            if (res.sid && res.ssid) {
                o.enterWonderWorld(res.sid, res.ssid);
            } else {
                o.enterWonderWorld(0, 0);
            }

        }).fail(function () {
            o.enterWonderWorld(0, 0);

        });

    }
}

module.exports = o;