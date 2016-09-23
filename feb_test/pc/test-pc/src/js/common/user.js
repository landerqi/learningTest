var $ = require('jquery');
var Util = require('./util');


var isLogin = function () {
    return !!Util.getCookie("username");
};


var getUid = function(){
    return Util.getCookie("yyuid") || 0;
};

var createLoginIframe = function(ticket,fn){
    var curPath = location.pathname.substring(0,location.pathname.lastIndexOf("/"));
    var busiUrl = encodeURIComponent(location.protocol+"//"+location.host+curPath+"/loginsuccess.html");
    var url = 'http://lgn.yy.com/lgn/jump/authentication.do?action=authenticate&appid=5060&direct=1&busiUrl='+busiUrl+'&src=1&reqDomainList=lgn.yy.com&ticket='+ticket;
    var ifr = $('<iframe src="'+url+'" style="display:none" frameborder="0"></iframe>');
    ifr.on("load",function(){
        fn && fn();
    });
    ifr.appendTo("body");
};


module.exports = {
    createLoginIframe: createLoginIframe,
    isLogin: isLogin,
    getUid: getUid
};