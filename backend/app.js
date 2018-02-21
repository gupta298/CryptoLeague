var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var request = require("request");

//Requiring Routes
var index = require('./routes/index');
var auth = require('./routes/auth');
var user = require('./routes/user');
var all_users = require('./routes/all_users');
var market = require('./routes/market');
var newsapi = require('./routes/newsapi');
var validateUser = require('./routes/validateUser');

var config = require('./config/config')
const passport = require('passport');

require('./config/passport');
var config = require('./config/config')

var app = express();

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Defining Routes
app.use('/', index);
app.use('/user', user);
app.use('/all_users', passport.authenticate(['jwt'], { session: false }), all_users);
app.use('/auth', auth);
app.use('/news', passport.authenticate(['jwt'], { session: false }), newsapi);
app.use('/market', passport.authenticate(['jwt'], { session: false }), market);
app.use('/validateUser', passport.authenticate(['jwt'], { session: false }), validateUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlera
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Success");
module.exports = app;