<div class="Sec3-list">
    {{each data1 as value index}}
    <div class="Sec-item">
        <div class="Sec-itemIcon">
            <img src="http://s1.yy.com/guild/friend_icon/nstatic/p/{{value.propId}}.png" class="Sec-giftIcon" width="30" height="30">
        </div>
        <div class="Sec-itemAvatar">
            <img src="{{value.avatar}}" alt="{{value.nick}}" class="Sec-itemPic" width="56" height="56">
        </div>
        <div class="Sec-itemInfo">
            <p class="Sec-itemName">{{value.nick}}</p>
            <p class="Sec-itemGet">
                收到: <span>{{value.recvCount}}</span>
            </p>
        </div>
        <a href="javascript:;" class="Sec-itemBtn js-subBtn {{value.sid ? 'is-ing' : ''}}" data-uid="{{value.uid}}" data-sid="{{value.sid}}" data-ssid="{{value.ssid}}"></a>
    </div>
    {{/each}}
</div>
<div class="Sec3-list Sec3-list--last">
    {{each data2 as value index}}
    <div class="Sec-item">
        <div class="Sec-itemIcon">
            <img src="http://s1.yy.com/guild/friend_icon/nstatic/p/{{value.propId}}.png" class="Sec-giftIcon" width="30" height="30">
        </div>
        <div class="Sec-itemAvatar">
            <img src="{{value.avatar}}" alt="{{value.nick}}" class="Sec-itemPic" width="56" height="56">
        </div>
        <div class="Sec-itemInfo">
            <p class="Sec-itemName">{{value.nick}}</p>
            <p class="Sec-itemSend">
                送出: <span>{{value.sendCount}}</span>
            </p>
        </div>
    </div>
    {{/each}}
</div>
