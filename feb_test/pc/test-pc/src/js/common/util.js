var getUrlVar = function (key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && decodeURI(result[1]) || "";
};

var getCookie = function (name) {
    var arr,
      RE = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(RE)) {
        return unescape(arr[2]);
    } else {
        return ''
    }
};

var isEmbed = (function(){

    var ret = false;
    try{
        window.external.sendCommand("getMyUid");
        ret =  true;
    }catch(e){
        ret= false;
    }
    return ret;

})();

var formatNum = function (num) {
    return num.toString().replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
};


var isMob = (function (W) {
    var ua = W.navigator.userAgent.toLowerCase();
    if (/iphone|ios|android|mobile/i.test(ua)) {
        return true;
    }
})(window);

module.exports = {
    getUrlVar: getUrlVar,
    getCookie: getCookie,
    isEmbed: isEmbed,
    isMob: isMob,
    formatNum: formatNum
};