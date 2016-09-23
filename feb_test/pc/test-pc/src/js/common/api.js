var $ = require('jquery');
var dataType = 'jsonp';
var timeout = 5000;


module.exports = {
    getDetailAll: function () {
        return $.ajax({
            dataType: dataType,
            timeout: timeout,
            url: 'http://s.fts.yy.com/weekstar/get_week_star_detail_billboardillboard'
        });
    },
    getPropAll: function () {
        return $.ajax({
            dataType: dataType,
            timeout: timeout,
            url: 'http://s.fts.yy.com/weekstar/get_week_star_billboard'
        });
    },
    getSubList: function () {
        return $.ajax({
            dataType: dataType,
            timeout: timeout,
            url: 'http://s.fts.yy.com/subscribe/get_subscribed_compere_list'
        });
    },
    subscribe: function (anchorUid) {
        return $.ajax({
            dataType: dataType,
            timeout: timeout,
            data: {
                compere_uid: anchorUid
            },
            url: 'http://s.fts.yy.com/subscribe/subscribe_compere'
        })
    }

};

