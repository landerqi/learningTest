var $ = require('jquery');
var Client = require("./common/yyclient");
var User = require('./common/user');
var Util = require('./common/util');
var Stat = require('./common/stat');

// require('../common/tab');
// require('../common/nav');

// 测试数据
//var MockData = require('../common/mock-data');
//MockData.init();
//window.$ = $;



// 缓存
var $elem = {
    headerBtn: $('.js-headerBtn'),
    sec1Btn: $('.js-sec1Btn')
};


// 绑定事件
var bindEvent = function () {

    // 预约
    $elem.headerBtn.click(function (e) {
        e.preventDefault();
        Client.enterRandomChannel();

        // 点击统计
        Stat.stat({
            uid: Util.getCookie("yyuid"),
            eventid: 10009157
        });

    });


    $elem.sec1Btn.click(function (e) {

        // 点击统计
        Stat.stat({
            uid: Util.getCookie("yyuid"),
            eventid: 10009159
        });


        if (User.isLogin()) {
            return true;
        } else {
            e.preventDefault();
            UDBSDKProxy.openByFixProxy(location.href.split('/index.html')[0] + 'rank.html');
            return false;
        }
    });
};


// 初始化
var init = function () {

    // 精彩世界 hack
    $(window).focus();

    window.currentUid = Util.getCookie('yyuid') || 0;

    bindEvent();


};

// 是否精彩世界内
if (Util.isEmbed) {

    // 内部登录
    Client.getTicket().done(function (ticket) {

        User.createLoginIframe(ticket, function () {

            init();

        });
    });

} else {
    init();
}