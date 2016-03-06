var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var url = require('url');


// sentiment library 추가
var sentiment = require('sentiment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    console.log(req.body);
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// http request 받아서 sentiment value 반환하는 부분 
app.get('/sentiment', function(req, res){
  var sentence = req.query.sentence;
  var sentimentResult = sentiment(sentence);
  var sentimentValue = sentimentResult.score;
  var playlist = {
    "p1": ["http://r1---sn-oajvo-5hnl.googlevideo.com/videoplayback?mm=31&mn=sn-oajvo-5hnl&upn=DmVXeAjpY6w&mime=video%2Fmp4&key=yt6&expire=1457268483&signature=98452C4E62AC45DA00667C0D4F4108FDD3FB5EEA.49DD37C3C89EDDD3D8B6F03A4B3D3599C0341861&ipbits=0&ratebypass=yes&ms=au&mt=1457246785&mv=m&initcwndbps=2345000&itag=22&lmt=1440169550762962&ip=213.197.20.136&dur=311.472&sver=3&source=youtube&fexp=9416126%2C9416231%2C9420452%2C9422571%2C9422596%2C9423661%2C9423662%2C9427413%2C9428103%2C9429237%2C9429544%2C9429563%2C9429885%2C9430941&id=o-ABgkqETGqUcZmW76xnlEQNXA7rn4qowZz6EM7GnIkj8U&pl=18&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&title=%5B%EC%98%A8%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%A7%80%5D+248.+%EC%86%8D%EC%98%B7%EB%B0%B4%EB%93%9C+-+%EB%A9%95%EC%8B%9C%EC%BD%94%ED%96%89+%EA%B3%A0%EC%86%8D%EC%97%B4%EC%B0%A8"],
    "p2": ["http://r2---sn-aiglln6l.googlevideo.com/videoplayback?source=youtube&mv=m&mt=1457245162&ms=au&mn=sn-aiglln6l&mm=31&mime=video%2Fmp4&key=yt6&lmt=1389759308197404&initcwndbps=13216250&upn=e6hPz9-miYg&id=o-AOi8BwN_RL4YOHsfH-RjcMSdVfYrBgIEMdPacd9TsJxy&fexp=9408214%2C9410705%2C9416126%2C9417827%2C9419451%2C9420452%2C9422596%2C9423661%2C9423662%2C9424490%2C9424823%2C9426720%2C9427919%2C9428246%2C9429593%2C9429820&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&ip=146.185.29.12&pl=22&sver=3&expire=1457266821&dur=273.113&ratebypass=yes&nh=IgpwcjAyLmxocjE0KgkxMjcuMC4wLjE&itag=18&ipbits=0&signature=1C8EFEA01B69C607BB02423DAD1C0D401CF0C50B.6FD62B40BB092CC8A26DABE3296C7263013FFB81&title=Autumn+leaves+-+eddie+higgins"]
  };

  if (sentimentValue < 0) {
    var result1 = {score: sentimentValue, playlist: playlist.p1};
    res.json(result1);
  } else {
    var result2 = {score: sentimentValue, playlist: playlist.p2};
    res.json(result2);
  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
