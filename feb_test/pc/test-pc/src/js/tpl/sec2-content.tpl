{{each data as value index}}
<div class="Sec2-contentTab js-sec2ContentTab" data-index="{{index}}">
    <div class="Sec2-list">
        {{each value.compereWeekStar as cValue cIndex}}
        <div class="Sec-item">
            <div class="Sec-itemPlace Sec-itemPlace--{{cIndex+1}}"></div>
            <div class="Sec-itemAvatar">
                <img src="{{cValue.avatar}}" alt="{{cValue.nick}}" class="Sec-itemPic" width="56" height="56">
            </div>
            <div class="Sec-itemInfo">
                <p class="Sec-itemName">{{cValue.nick}}</p>
                <p class="Sec-itemGet">
                    收到: <span>{{cValue.recvCount}}</span>
                </p>
            </div>
            <a href="javascript:;" class="Sec-itemBtn js-subBtn {{cValue.sid ? 'is-ing' : ''}}" data-uid="{{cValue.uid}}" data-sid="{{cValue.sid}}" data-ssid="{{cValue.ssid}}"></a>
        </div>
        {{/each}}
    </div>
    <div class="Sec2-list Sec2-list--last">
        {{each value.userWeekStar as uValue uIndex}}
        <div class="Sec-item">
            <div class="Sec-itemPlace Sec-itemPlace--{{uIndex+1}}"></div>
            <div class="Sec-itemAvatar">
                <img src="{{uValue.avatar}}" alt="{{uValue.nick}}" class="Sec-itemPic" width="56" height="56">
            </div>
            <div class="Sec-itemInfo">
                <p class="Sec-itemName">{{uValue.nick}}</p>
                <p class="Sec-itemSend">
                    送出: <span>{{uValue.sendCount}}</span>
                </p>
            </div>
        </div>
        {{/each}}
    </div>
</div>
{{/each}}