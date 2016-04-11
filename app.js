var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var ytdl = require('ytdl-core');
var update = require('./update');

// sentiment library 추가
var sentiment = require('sentiment');

mongoose.connect('mongodb://localhost/opserver');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')));
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

var ytdlOptions = {};
ytdlOptions.quality = undefined;
ytdlOptions.range = undefined;

var filters = [];

function createFilter(field, regexpStr, negated) {
  try {
    var regexp = new RegExp(regexpStr, 'i');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  filters.push(function(format) {
    return negated !== regexp.test(format[field]);
  });
}


ytdlOptions.filter = function(format) {
  return filters.every(function(filter) {
    return filter(format);
  });
};

app.get('/sentiment', function(req, res){
  var sentence = req.query.sentence;
  var sentimentResult = sentiment(sentence);
  var sentimentValue = sentimentResult.score;
  var urls = {
    "p1": ["https://www.youtube.com/watch?v=hcGEsRqyipc&list=RDEM9E_ik5ScxhRL1c_HWNxA2A&index=22", "https://www.youtube.com/watch?v=iS1g8G_njx8&index=23&list=RDEM9E_ik5ScxhRL1c_HWNxA2A", "https://www.youtube.com/watch?v=IcrbM1l_BoI&list=RDEM9E_ik5ScxhRL1c_HWNxA2A&index=24"],
    "p2": ["https://www.youtube.com/watch?v=CGyEd0aKWZE&list=RDEM9E_ik5ScxhRL1c_HWNxA2A&index=25", "https://www.youtube.com/watch?v=7PCkvCPvDXk&index=26&list=RDEM9E_ik5ScxhRL1c_HWNxA2A", "https://www.youtube.com/watch?v=y6Sxv-sUYtM&index=27&list=RDEM9E_ik5ScxhRL1c_HWNxA2A"]
  };

  // url 변경하기 
  if (sentimentValue < 0) {

    var playlist1 = [];

    for (var i = 0 ; i < urls.p1.length ; i++) {
      ytdl.getInfo(urls.p1[i], {
        downloadURL: true,
        debug: null
      }, function(err, info) {
        var coreUtil = require('ytdl-core/lib/util');
        var format = coreUtil.chooseFormat(info.formats, ytdlOptions);
        if (format instanceof Error) {
          console.error(format.message);
          process.exit(1);
          return;
        }
        console.log(format.url);
        playlist1.push(format.url);
      });
    }
    setTimeout(function(){     
      var result1 = {score: sentimentValue, playlist: playlist1};
      res.json(result1); }, 5000);
  } else {
    var playlist2 = [];
        for (url in urls.p2) {
      playUrl = youtubedl(url, ['--format=18']);
      console.log(playUrl);
      playlist2.push(playUrl);
    }
    var result2 = {score: sentimentValue, playlist: playlist2};
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

setTimeout(update, 5000);

module.exports = app;
