<table class="Inner-rankTable">
    <thead>
    <tr>
        <th colspan="2" width="80">排名123</th>
        <th width="186">昵称</th>
        <th style="text-indent: 4px">荣誉值</th>
    </tr>
    </thead>
    <tbody>
    {{each rankList as value index}}
    <tr>
        <td>
            {{if value.rank === 1}}
            <span class="Inner-place Inner-place--first">{{value.rank}}</span>
            {{else if value.rank === 2}}
            <span class="Inner-place Inner-place--second">{{value.rank}}</span>
            {{else if value.rank === 3}}
            <span class="Inner-place Inner-place--third">{{value.rank}}</span>
            {{else}}
            <span class="Inner-place Inner-place--other">{{value.rank}}</span>
            {{/if}}
        </td>
        <td><span class="Inner-status {{value.hourRankChange}}"></span></td>
        <td>
            {{if value.jyFirstKingDarkHorse}}
            <span class="Inner-rankName is-extra" title="{{value.uname}}">
                {{value.uname}}
            </span>
            <span class="Inner-rankExtra" title="错过2015年星光盛典首王资格，本次活动豪刷250万荣誉值进场的黑马选手！"></span>
            {{else}}
            <span class="Inner-rankName" title="{{value.uname}}">
                {{value.uname}}
            </span>
            {{/if}}
        </td>
        <td class="Inner-rankValue">{{value.value}}</td>
    </tr>
    {{/each}}
    </tbody>
</table>
<div class="Inner-footer">
    {{if yourRank}}
    <p class="Inner-yourRank">你当前的排名：{{yourRank}}</p>
    {{else}}
    <p class="Inner-yourRank">你当前的排名：暂无</p>
    {{/if}}
</div>