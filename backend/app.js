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
var userRank = require('./routes/userRank');
var totalUsers = require('./routes/totalUsers');
var league = require('./routes/league');
var league_types = require('./routes/leagueTypes');

const config = require('./config/config')
const passport = require('passport');

require('./config/passport');

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

// User
app.use('/auth', auth);
app.use('/user', user);
app.use('/validate_user', passport.authenticate(['jwt'], { session: false }), validateUser);
app.use('/user_rank', passport.authenticate(['jwt'], { session: false }), userRank);
app.use('/total_users', passport.authenticate(['jwt'], { session: false }), totalUsers); 
app.use('/all_users', passport.authenticate(['jwt'], { session: false }), all_users);

// News
app.use('/news', passport.authenticate(['jwt'], { session: false }), newsapi);

// Market
app.use(market.router);
// app.use('/market', passport.authenticate(['jwt'], { session: false }), market);

// League
app.use('/league_types', passport.authenticate(['jwt'], { session: false }), league_types);
app.use('/league', passport.authenticate(['jwt'], { session: false }), league);
app.use('/league/:league_id', passport.authenticate(['jwt'], { session: false }), league);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
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