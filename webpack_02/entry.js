require('./style.css');
var loop = require('./test.js');
var util = require('./util.js');
var $ = require('jquery');

$('body').css('color', 'red');
$(document).ready(function(){
    $('.test-01').html('jquery works!');
});

//document.write('It works hahahah;');

//require.ensure('http://yyfinancesmall.bs2dl.yy.com/financeSearch.js', function() {
    //console.log('success')
//});

//加载股票数据
util.loader.load('http://yyfinancesmall.bs2dl.yy.com/financeSearch.js')
    .wait(function(){
        console.log(navSearchData);
    })

loop.loop();
