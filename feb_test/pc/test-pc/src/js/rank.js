var $ = require('jquery');
var Api = require('./common/api');
var Client = require("./common/yyclient");
var Modal = require('./common/modal');
var User = require('./common/user');
var Util = require('./common/util');
var Stat = require('./common/stat');
require('./tpl/template-helpers.js');

var Tpl = {
  sec1: require('./tpl/a/a.tpl'),
  sec2Tab: require('./tpl/sec2-tab.tpl'),
  sec2Content: require('./tpl/sec2-content.tpl'),
  sec3: require('./tpl/sec3.tpl')
};
var currentState = {
  propIndex: 4
};



// 测试数据
//require('common/mock-data');
//window.$ = $;


// 缓存
var $elem = {
  headerBtn: $('.js-headerBtn'),
  headerModal: $('.js-headerModal'),
  sec1List: $('.js-sec1List'),
  sec2PropTab: $('.js-sec2PropTab'),
  sec2Content: $('.js-sec2Content'),
  sec3Content: $('.js-sec3Content'),
  body: $('body'),
  remainTime: $('.js-remainTime'),
  sec3: $('.js-sec3')
};



// 兼容IE
var attachPIE = function (el) {
  if (window.PIE) {
    $(el).each(function() {
      PIE.attach(this);
    });
  }
};
var detachPIE = function (el) {
  if (window.PIE) {
    $(el).each(function() {
      PIE.detach(this);
    });
  }
};

var formatDateBySec = function (msecs) {

  var dayBySec = 3600 * 24;
  var hourBySec = 3600;
  var minBySec = 60;

  var secs = Math.floor(msecs / 1000);

  var days = Math.floor(secs / dayBySec);
  var hours = Math.floor(secs % dayBySec / hourBySec);
  var mins = Math.floor(secs % dayBySec % hourBySec / minBySec);

  return {
    days: days,
    hours: hours,
    mins: mins
  }

};

var bindEvent = function () {

  var headerModal = Modal.init($elem.headerModal);

  // 顶部按钮
  $elem.headerBtn.click(function (e) {
    e.preventDefault();
    headerModal.show();
    // 点击统计
    Stat.stat({
      uid: Util.getCookie("yyuid"),
      eventid: 10009167
    });
  });

  // 订阅按钮
  $elem.body.on('click', '.js-subBtn', function (e) {

    e.preventDefault();

    // 登录检查
    if (!User.isLogin()) {
      User.showLoginBox();
      return false;
    }

    var _$this = $(this);
    var _uid = _$this.data('uid');
    var _$subBtnAll = $('.js-subBtn[data-uid="' + _uid + '"]');

    if (_$this.hasClass('is-ing')) {
      // 直播中
      Client.enterWonderWorld(_$this.data('sid'), _$this.data('ssid'));
    } else if (_$this.hasClass('is-ed')) {
      // 已定阅
      return false;
    } else {
      // 订阅逻辑
      // Client.getTicket().done(function (ticket) {
      Api.subscribe(_uid).done(function (res) {

        if (res.status === 0) {
          _$subBtnAll.addClass('is-ed');
        }

        // 开播了
        if (_$this.data('sid') !== 0) {
          Client.enterWonderWorld(_$this.data('sid'), _$this.data('ssid'));
          _$subBtnAll.removeClass('is-ed').addClass('is-ing');
        }

      });
      // });

    }
  });

  // Sec2 订阅统计
  $elem.sec2Content.on('click', '.js-subBtn', function (e) {
    e.preventDefault();
    var _$this = $(this);
    if (!_$this.hasClass('is-ed')) {
      // 点击统计
      Stat.stat({
        uid: Util.getCookie("yyuid"),
        eventid: 10009161
      });
    }
  });

  // Sec3 订阅统计
  $elem.sec3Content.on('click', '.js-subBtn', function (e) {
    e.preventDefault();
    var _$this = $(this);
    if (!_$this.hasClass('is-ed')) {
      // 点击统计
      Stat.stat({
        uid: Util.getCookie("yyuid"),
        eventid: 10009165
      });
    }
  });

  //tips 按钮
  $elem.body.on('mouseenter', '.js-tipsBtn', function (e) {
    var _$this = $(this);
    var _position = _$this.position();
    var _$tipsPop = _$this.siblings('.js-tipsPop');

    _$tipsPop.css({
      //left: (_position.left - _$tipsPop.width() + 50) + 'px',
      right: 20 + 'px',
      top: (_position.top - _$tipsPop.height() - 35) + 'px'
    }).show();
  });
  $elem.body.on('mouseleave', '.js-tipsBtn', function (e) {
    var _$this = $(this);
    var _$tipsPop = _$this.siblings('.js-tipsPop');
    _$tipsPop.hide();
  });
};

var render = {
  sec1: function (data) {
    detachPIE('.Sec1-itemPic');
    $elem.sec1List.html(Tpl.sec1({list:[{time : 1446175992278},{time : 1446176021568}]}));
    attachPIE('.Sec1-itemPic');
  },
  sec2Tab: function (data) {
    $elem.sec2PropTab.html(Tpl.sec2Tab({data: data}));
  },
  sec2Content: function (data) {
    detachPIE('.Sec-itemPic');
    $elem.sec2Content.html(Tpl.sec2Content({data: data}));
    attachPIE('.Sec-itemPic');
  },
  sec3: function (data1, data2) {
    detachPIE('.Sec-itemPic');
    $elem.sec3Content.html(Tpl.sec3({data1: data1, data2: data2}));
    attachPIE('.Sec-itemPic');
    if (data1.length === 0 && data2.length === 0) {
      $elem.sec3.addClass('is-empty');
    } else {
      $elem.sec3.removeClass('is-empty');
    }
  }
};

// 其他
var doDetailAll = function (res) {


  if (res.status !== 0) return false;

  //console.log(res.remainTime);
  //console.log(res.darkHorseInfo);
  var _darkHorseInfo = res.darkHorseInfo || [];
  var _lastCompereWeekStar = res.lastCompereWeekStar || [];
  var _lastUserWeekStar = res.lastUserWeekStar || [];

  render.sec1(_darkHorseInfo);

  render.sec3(_lastCompereWeekStar, _lastUserWeekStar);

  // 剩余时间。。。
  var _dateObj = formatDateBySec(res.remainTime);

  if (_dateObj.days > 0 ) {
    $elem.remainTime.html(_dateObj.days + ' 天 ' + _dateObj.hours + ' 小时');

  } else {
    $elem.remainTime.html(_dateObj.hours + ' 小时 ' + _dateObj.mins + ' 分');
  }

};

// 礼物
var doPropAll = function (res) {

  //console.log(res);

  if (res.status !== 0) return false;

  var _weekStar = res.weekStar || [];

  var propArray = $.map(_weekStar, function (value, index) {
    return value.propId;
  });

  //console.log(propArray);
  render.sec2Tab(propArray);
  render.sec2Content(_weekStar);

  $elem.sec2PropTab.off().on('click', '.js-propAnchor', function (e) {
    e.preventDefault();
    var _$this = $(this);
    var _index = _$this.data('index');

    // 点击统计，只统计人工切换，不统计自动刷新
    if (_index !== currentState.propIndex) {
      Stat.stat({
        uid: Util.getCookie("yyuid"),
        eventid: 10009163
      });
    }

    currentState.propIndex = _index;

    // 礼物切换
    $elem.sec2PropTab.find('.js-propAnchor').removeClass('is-active');
    _$this.addClass('is-active');

    // tab 切换
    $elem.sec2Content.find('.js-sec2ContentTab').hide()
      .filter('[data-index="' + _index +'"]').show();
  });

  // 默认点击
  $elem.sec2PropTab.find('.js-propAnchor').eq(currentState.propIndex).click();
};

// 检查订阅
var doCheckSub = function (res) {
  //console.log(res);

  if (res.status !== 0) return false;


  var _onlineList = $.map(res.onlineList || [], function (value) {
    return value.uid;
  });

  var _offlineList = $.map(res.offlineList || [], function (value) {
    return value.uid;
  });


  $('.js-subBtn').each(function () {

    var _$this = $(this);
    var _uid = _$this.data('uid');
    var _sid = _$this.data('sid');

    _$this.removeClass('is-ing is-ed');

    if (_sid > 0 || $.inArray(_uid, _onlineList) > -1) {
      _$this.addClass('is-ing');
    } else if ($.inArray(_uid, _offlineList) > -1) {
      _$this.addClass('is-ed');
    }

  });

};

var doAll = function () {
  $.when(Api.getDetailAll(), Api.getPropAll(), Api.getSubList()).done(function (res1, res2, res3) {

    doDetailAll(res1[0]);
    doPropAll(res2[0]);
    doCheckSub(res3[0]);

    // 每10秒刷新
    setTimeout(doAll, 10 * 1000);
  });
};

// 初始化
var init = function () {

  // 精彩世界 hack
  $(window).focus();

  window.currentUid = Util.getCookie('yyuid') || 0;

  bindEvent();

  doAll();
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
