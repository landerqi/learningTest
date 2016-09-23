var Mock = require("../lib/mock");

Mock.mock(/get_week_star_detail_billboardillboard/, {
    "status" : 0,
    "remainTime" : 375409098,
    "darkHorseCount" : 6,
    "lastCompereCount" : 6,
    "lastUserCount" : 6,
    "darkHorseInfo|6" :[
        {
            "uid|50014431-50014440" : 1,
            "nick" : "交友昵称交友昵称交友昵称",
            "avatar" : "http://downhdlogo.yy.com/hdlogo/144144/144/144/75/0966753907/u966753907bgjLTZSu.png",
            "propId|20050-20056" : 4,
            "recvCount|100-200" : 10,
            "sid" : 108,
            "ssid" : 109
        }
    ],
    "lastCompereWeekStar|6" :[
        {
            "uid|50014431-50014440" : 1,
            "nick" : "交友昵称交友昵称交友昵称",
            "avatar" : "http://downhdlogo.yy.com/hdlogo/144144/144/144/75/0966753907/u966753907bgjLTZSu.png",
            "propId|20050-20056" : 4,
            "recvCount|100-200" : 10,
            "sid" : 108,
            "ssid" : 109
        }
    ],
    "lastUserWeekStar|6":[
        {
            "uid|50014431-50014440" : 1,
            "nick" : "交友昵称交友昵称交友昵称",
            "avatar" : "http://downhdlogo.yy.com/hdlogo/144144/144/144/75/0966753907/u966753907bgjLTZSu.png",
            "propId|20050-20056" : 4,
            "sendCount|100-200" : 10
        }
    ]
});

Mock.mock(/get_week_star_billboard/, {
    "status" : 0,
    "weekStar|6" :[{
        "propId|20050-20056" : 4,
        "compereCount" : 6,
        "userCount" : 6,
        "compereWeekStar|3" :[
            {
                "uid|50014431-50014440" : 1,
                "nick" : "交友昵称交友昵称交友昵称",
                "avatar" : "http://downhdlogo.yy.com/hdlogo/144144/144/144/75/0966753907/u966753907bgjLTZSu.png",
                "propId|20050-20056" : 4,
                "recvCount|100-200" : 10,
                "sid" : 108,
                "ssid" : 109
            }
        ],
        "userWeekStar|3":[
            {
                "uid|50014431-50014440" : 1,
                "nick" : "交友昵称交友昵称交友昵称",
                "avatar" : "http://downhdlogo.yy.com/hdlogo/144144/144/144/75/0966753907/u966753907bgjLTZSu.png",
                "sendCount|100-200" : 10
            }
        ]
    }

    ]
});

Mock.mock(/compere_list/, {
    "status": 0,
    "onlineList|3": [{
        "uid|50014431-50014435": 1244027581,
        "sid": 10725517,
        "ssid": 2405744376,
        "nick": "澶�  娌�",
        "avatar": "http://makefriends.bs2dl.yy.com/flashhead_90570cd5b4086a2867084c83bc0dfafe.jpg",
        "duration": 6177,
        "fansCount": 3690
    }],
    "offlineList|3": [{
        "uid|50014436-50014440": 821133098,
        "nick": "璁告効",
        "avatar": "http://makefriends.bs2dl.yy.com/flashhead_ff4f20129b47723a1359c89ac58c247f.jpg",
        "fansCount": 1093
    }]
});

