{{each otherList as value index}}
<div class="Sec2-rankItem Sec2-rankItem--other">
    <div class="Sec2-rankAvatar Sec2-rankAvatar--other">
        <img class="Sec2-rankImage Sec2-rankImage--other" src="{{value.jyImg}}" alt="value.uname" width="80" height="80">
        <div class="Sec2-rankPlace Sec2-rankPlace--other"><span>{{value.rank}}</span></div>
        <div class="Sec2-rankStatus Sec2-rankStatus--other {{value.hourRankChange}}"></div>
    </div>
    <p class="Sec2-rankName">
        {{if value.jyFirstKingDarkHorse}}
        <span class="Sec2-rankExtra" title="错过2015年星光盛典首王资格，本次活动豪刷250万荣誉值进场的黑马选手！"></span>
        {{/if}}
        <span title="{{value.uname}}">
            {{value.uname}}
        </span>
    </p>
    <p class="Sec2-rankHonor">
        荣誉值：{{value.value}}
    </p>
</div>
{{/each}}