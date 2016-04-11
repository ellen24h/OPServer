/**
 * Created by Naver on 2016. 4. 5..
 */

var async = require('async');
var ytdl = require('ytdl-core');
var sPlaylist = require('./model/sPlaylist');

var playlists = [
    {
        playlistNumber: 0,
        artist: '꽃잠프로젝트',
        track1Title: 'Home',
        track1URL: 'https://www.youtube.com/watch?v=p6TqfcflQPg',
        track2Title: 'Mr.McClain',
        track2URL: 'https://www.youtube.com/watch?v=w9a6dvdUNxU',
        track3Title: 'HeyBoy',
        track3URL: 'https://www.youtube.com/watch?v=nlNz5KckfI4'
    },
    {
        playlistNumber: 1,
        artist: '뷰렛',
        track1Title: '거짓말',
        track1URL: 'https://www.youtube.com/watch?v=FKaNCN8Uq4c',
        track2Title: 'Violet',
        track2URL: 'https://www.youtube.com/watch?v=oy76IpRXfX4',
        track3Title: 'Everything',
        track3URL: 'https://www.youtube.com/watch?v=6yloLILf0qU'
    },
    {
        playlistNumber: 2,
        artist: '이채언루트',
        track1Title: 'Uneasy Romance',
        track1URL: 'https://www.youtube.com/watch?v=giO_7BiqDNM',
        track2Title: 'Run',
        track2URL: 'https://www.youtube.com/watch?v=nZtR2qYISwE',
        track3Title: 'Get Into',
        track3URL: 'https://www.youtube.com/watch?v=5DxeKF8mh40'
    },
    {
        playlistNumber: 3,
        artist: '루시아',
        track1Title: '꽃처럼 한 철만 사랑해 줄 건가요',
        track1URL: 'https://www.youtube.com/watch?v=MJZbbvU9L1M',
        track2Title: '연극이 끝나기 전에',
        track2URL: 'https://www.youtube.com/watch?v=lqVE1JdniL8',
        track3Title: '부디',
        track3URL: 'https://www.youtube.com/watch?v=TkjISsbhYsA'
    },
    {
        playlistNumber: 4,
        artist: '김사월',
        track1Title: '접속',
        track1URL: 'https://www.youtube.com/watch?v=F4TSIBAug8c',
        track2Title: '머리맡',
        track2URL: 'https://www.youtube.com/watch?v=3Q-9lDIYkFo',
        track3Title: '악취',
        track3URL: 'https://www.youtube.com/watch?v=yAwpMLKQ8IU'
    },
    {
        playlistNumber: 5,
        artist: '자우림',
        track1Title: '스물다섯, 스물하나',
        track1URL: 'https://www.youtube.com/watch?v=-WGVPYY-Rhg',
        track2Title: '낙화',
        track2URL: 'https://www.youtube.com/watch?v=PdKU_Xw3-_E',
        track3Title: '미안해 널 미워해',
        track3URL: 'https://www.youtube.com/watch?v=PdKU_Xw3-_E'
    },
    {
        playlistNumber: 6,
        artist: '짙은',
        track1Title: '곁에',
        track1URL: 'https://www.youtube.com/watch?v=9762n5yiiKI',
        track2Title: '나비섬',
        track2URL: 'https://www.youtube.com/watch?v=g3aN3POUepM',
        track3Title: 'save',
        track3URL: 'https://www.youtube.com/watch?v=QQRqHulewTQ'
    },
    {
        playlistNumber: 7,
        artist: '우리는 속옷도 생겼고 여자도 늘었다네',
        track1Title: '멕시코행 고속열차',
        track1URL: 'https://www.youtube.com/watch?v=h2iTudkNUiw',
        track2Title: '이 무서운 왕뱀을 향해 화살통 하나가 다 빌 때까지',
        track2URL: 'https://www.youtube.com/watch?v=FJEoWazTX4U',
        track3Title: 'Bluemoon',
        track3URL: 'https://www.youtube.com/watch?v=TNi40AO8G5w'
    },
    {
        playlistNumber: 8,
        artist: '언니네 이발관',
        track1Title: '아름다운 것',
        track1URL: 'https://www.youtube.com/watch?v=MYYXLw8jRD0',
        track2Title: '나를 잊었나요?',
        track2URL: 'https://www.youtube.com/watch?v=2KS8BmVHOt8',
        track3Title: '의외의 사실',
        track3URL: 'https://www.youtube.com/watch?v=2Ffax2LhhN0'
    },
    {
        playlistNumber: 9,
        artist: '불독맨션',
        track1Title: 'Destiny',
        track1URL: 'https://www.youtube.com/watch?v=VeAHTQFO-J8',
        track2Title: '알듯말듯',
        track2URL: 'https://www.youtube.com/watch?v=I80uiaoreEE',
        track3Title: '봐라 달이 뒤를 쫒는다',
        track3URL: 'https://www.youtube.com/watch?v=8JmCk6pyDaU'
    },
    {
        playlistNumber: 10,
        artist: '브로콜리너마저',
        track1Title: '변두리 소년 소녀',
        track1URL: 'https://www.youtube.com/watch?v=Z8hDamt8rlA',
        track2Title: '환절기',
        track2URL: 'https://www.youtube.com/watch?v=0JJsKRE_p-M',
        track3Title: '할머니',
        track3URL: 'https://www.youtube.com/watch?v=qP0u8rWqI1w'
    },
    {
        playlistNumber: 11,
        artist: '프렐류드',
        track1Title: 'Merry Go Round Of Life',
        track1URL: 'https://www.youtube.com/watch?v=SBxvAA0T9sg',
        track2Title: 'Funky Shake',
        track2URL: 'https://www.youtube.com/watch?v=sEsZlrt04sQ',
        track3Title: 'Piccadilly Circus (Vocal Ver)',
        track3URL: 'https://www.youtube.com/watch?v=CgucF5p1o9E'
    },
    {
        playlistNumber: 12,
        artist: '프롬',
        track1Title: '좋아해',
        track1URL: 'https://www.youtube.com/watch?v=VHHhym_KuY8',
        track2Title: '너와 나의',
        track2URL: 'https://www.youtube.com/watch?v=zZp4v_1tGSY',
        track3Title: '마중가는 길',
        track3URL: 'https://www.youtube.com/watch?v=zvA0XGokhgc'
    },
    {
        playlistNumber: 13,
        artist: '루시드 폴',
        track1Title: '오 사랑',
        track1URL: 'https://www.youtube.com/watch?v=DKDVhCWsgP4',
        track2Title: '불',
        track2URL: 'https://www.youtube.com/watch?v=2bNJ4k6lEYA',
        track3Title: '햇살은 따뜻',
        track3URL: 'https://www.youtube.com/watch?v=UICE0qynpGs'
    },
    {
        playlistNumber: 14,
        artist: '10cm',
        track1Title: 'Corona',
        track1URL: 'https://www.youtube.com/watch?v=trnPvTs_2Qg',
        track2Title: 'Good Night',
        track2URL: 'https://www.youtube.com/watch?v=OvPfW5wNcro',
        track3Title: '냄새나는 여자',
        track3URL: 'https://www.youtube.com/watch?v=3zW7cIPLFYU'
    },
    {
        playlistNumber: 15,
        artist: '강아솔',
        track1Title: '4년전 5월 그때의 우리',
        track1URL: 'https://www.youtube.com/watch?v=Qq_xUCY3-uo',
        track2Title: '어느 봄날 & 들꽃',
        track2URL: 'https://www.youtube.com/watch?v=MA7enO_XN-I',
        track3Title: '그대에게',
        track3URL: 'https://www.youtube.com/watch?v=i-XwbvBhoDw'
    }
];

/* Create Options for getting playURL */

var ytdlOptions = {};
ytdlOptions.quality = undefined;
ytdlOptions.range = undefined;

var filters = [];

ytdlOptions.filter = function(format) {
    return filters.every(function(filter) {
        return filter(format);
    });
};

/* Get playURL with pageURL */

var getPlayUrl = function(index, youtubeURL, callback) {
    // console.log("getPlayUrl");
    ytdl.getInfo(youtubeURL, {
        downloadURL: true,
        debug: null
    }, function (err, info) {
        var coreUtil = require('ytdl-core/lib/util');
        var format = coreUtil.chooseFormat(info.formats, ytdlOptions);
        if (format instanceof Error) {
            console.error(format.message);
            process.exit(1);
            return;
        }

        if (typeof callback === "function") {
            callback(index, format.url);
        }
    });
};

/* Get playlists4updateDB */

var updateDB = function(callback) {
    console.log("updateDB");
    var playlists4updateDB = JSON.parse(JSON.stringify(playlists));
    var count = 0;

    // TODO: 하....우아하지 못하다 ㅠㅠ 하 ......나중에 리팩토링 하기...
    for (var i = 0 ; i < playlists4updateDB.length ; i++) {
        var urls = [playlists[i].track1URL, playlists[i].track2URL, playlists[i].track3URL];

        getPlayUrl(i, urls[0], function (index, playURL) {
            playlists4updateDB[index].track1URL = playURL;
            count ++;
            if (count === playlists4updateDB.length * 3) {
                console.log(count);
                console.log("UpdateDB callback is working");
                callback(playlists4updateDB);
            }
        });

        getPlayUrl(i, urls[1], function (index, playURL) {
            playlists4updateDB[index].track2URL = playURL;
            count ++;
            if (count === playlists4updateDB.length * 3) {
                console.log(count);
                console.log("UpdateDB callback is working");
                callback(playlists4updateDB);
            }
        });

        getPlayUrl(i, urls[2], function (index, playURL) {
            playlists4updateDB[index].track3URL = playURL;
            count ++;
            if (count === playlists4updateDB.length * 3) {
                console.log(count);
                console.log("UpdateDB callback is working");
                callback(playlists4updateDB);
            }
        });
    }

    if (count >= playlists4updateDB * 3) {
        console.log(count);
        console.log("UpdateDB callback is working");
        callback(playlists4updateDB);
    }
};

function update() {
    // console.log("update");
    updateDB(function(updatedPlaylists) {
        for (var i = 0; i < updatedPlaylists.length ; i++) {
            var query = {playlistNumber : i};
            var update = updatedPlaylists[i];
            var options = { upsert: true};
            sPlaylist.findOneAndUpdate(query, update, options, function (err, result) {
                if (err) { return console.log(new Error(err)); }
            });
        }
    });

    setTimeout(update, 180000);
}

module.exports = update;
