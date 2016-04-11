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
var splaylist = mongoose.model('sPlaylist');

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


app.get('/sentiment', function(req, res){
  var sentence = req.query.sentence;
  var sentimentResult = sentiment(sentence);
  var sentimentValue = sentimentResult.score;

  // url 변경하기 
  if (sentimentValue < 0) {
    splaylist.find({'playlistNumber': 14}, function(err, playlist) {
      if (err) return res.status(500).send(err);
      var result1 = {score: sentimentValue, playlist: playlist};
      res.json(result1);
    });
  } else {
    splaylist.find({'playlistNumber': 9}, function(err, playlist) {
      if (err) return res.status(500).send(err);
      var result2 = {score: sentimentValue, playlist: playlist};
      res.json(result2);
    });
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
