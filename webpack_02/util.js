
var Util = {
    /**
     * @description 异步加载脚本或css
     * @method loader
     * @demo 链式调用:loader.load(a.js,b.js,c.css...).wait(callback()).load(d.js....).wait(callback());
     *
     * */
    loader : (function(){
        var group_queue  = [];
        var
            isFunc = function(obj) {
                return Object.prototype.toString.call(obj) == "[object Function]";
            },
            isAnyStart = function(url_items) {
                for (var idx = 0, l = url_items.length; idx < l; ++ idx) {
                    if (url_items[idx].start == true )
                        return true;
                }
                return false;
            },
            isAllFinished = function(url_items) {
                for (var idx = 0, l = url_items.length; idx < l; ++idx) {
                    if (url_items[idx].finished == false )
                        return false;
                }
                return true;
            },
            loadFinished = function() {
                nextGroup();
            },
            nextGroup = function() {
                while (group_queue.length > 0) {
                    if (isFunc(group_queue[0])) {
                        group_queue[0]();
                        group_queue.shift();
                        continue;
                    } else if (isAllFinished(group_queue[0])) {
                        group_queue.shift();
                        continue;
                    } else if (!isAnyStart(group_queue[0])) {
                        loadGroup();
                        break;
                    } else {
                        break;
                    }
                }
            },
            loadError = function(oError) {
                console.error("The script " + oError.target.src + " is not accessible.");
            },
            loadUrl = function(url_item) {
                var elem = null;
                var url = url_item.url;
                url_item.start = true;
                if(url.indexOf(".js") > -1){
                    elem = document.createElement('script');
                    elem.type='text/javascript';
                    elem.src = url;
                }
                if(url.indexOf(".css") > -1){
                    elem = document.createElement('link');
                    elem.rel='stylesheet';
                    elem.href = url;
                }
                if (elem.readyState){  //IE
                    elem.onreadystatechange = function() {
                        if (elem.readyState == "loaded" ||
                            elem.readyState == "complete") {
                            elem.onreadystatechange = null;
                            url_item.finished = true;
                            loadFinished();
                        }
                    };
                } else {  //Others
                    elem.onload = function(){
                        url_item.finished = true;
                        loadFinished();
                    };
                }
                elem.onerror = loadError;
                document.getElementsByTagName("head")[0].appendChild(elem);
            },
            loadGroup = function() {
                for (var idx = 0, l = group_queue[0].length; idx < l; idx++) {
                    loadUrl(group_queue[0][idx]);
                }
            },
            addGroup = function(url_array) {
                if (url_array.length > 0) {
                    var group = [];
                    for (var idx = 0, l = url_array.length; idx < l; idx ++) {
                        var url_item = {
                            url: url_array[idx],
                            start: false,
                            finished: false,
                        };
                        group.push(url_item);
                    }
                    group_queue.push(group);
                }
                nextGroup();
            },
            addFunc = function(callback) {
                callback && isFunc(callback) &&  group_queue.push(callback);
                nextGroup();
            },
            instanceAPI = {
                load : function() {
                    addGroup([].slice.call(arguments));
                    return instanceAPI;
                },
                wait : function(callback) {
                    addFunc(callback);
                    return instanceAPI;
                }
            };
        return instanceAPI;
    })()
    
}
module.exports = Util;
