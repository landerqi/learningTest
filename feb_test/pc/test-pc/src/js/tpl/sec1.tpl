{{each data as value index}}
<div class="Sec1-item">
    <div class="Sec1-itemAvatar">
        <img src="{{value.avatar}}" alt="{{value.nick}}" class="Sec1-itemPic" width="86" height="86">
    </div>
    <p class="Sec1-itemName">{{value.nick}}</p>
    <div class="Sec1-itemGift">
        <img src="http://s1.yy.com/guild/friend_icon/nstatic/p/{{value.propId}}.png" class="Sec1-giftIcon" width="28" height="28"> x {{value.recvCount}}
    </div>
</div>
{{/each}}
