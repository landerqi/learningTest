
var $ = require("jquery");
var $body = $('body');
var $mask = $('<div class="Modal-mask js-modalBtnClose"></div>');

$body.append($mask);

function Modal ($elem) {

    this.$elem = $elem;

    var _this = this;

    $elem.css({
        marginTop: - ($elem.outerHeight() / 2),
        marginLeft: - ($elem.outerWidth() / 2)
    });

    $body.on('click', '.js-modalBtnClose', function (e) {
        e.preventDefault();
        _this.hide();
    });
}

Modal.prototype.hide = function () {
    this.$elem.hide();
    $mask.hide();
    return this;
};

Modal.prototype.show = function () {
    $mask.show();
    this.$elem.show();
    return this;
};

//Modal.prototype.text = function (content) {
//    this.$elem.find('.js-modalText').html(content);
//    return this;
//};

var init = function ($elem) {
    return new Modal($elem);
};

module.exports = {
    init: init
};

