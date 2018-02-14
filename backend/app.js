var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var token = require('./token');

var config = require('./config/config')
const passport = require('passport');

require('./config/passport');

//TODO: REMOVE THIS!
var usersArr = [
  {
    id: "1",
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: "2",
    name: 'test',
    password: 'test'
  },
  {
  	id: "1964124173601256",
  	name: 'Nisarg Kolhe'
  }
];

var app = express();

app.use(passport.initialize());

// app.get('/success', (req, res) => res.send("You have successfully logged in"));
// app.get('/error', (req, res) => res.send("error logging in"));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

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

app.use('/', index);
app.use('/users', users);

app.post("/api/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = usersArr[_.findIndex(usersArr, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id}; //TODO: Add user object here instead

    var jwtToken = token.generateAccessToken(payload);
    res.json({message: "ok", token: jwtToken});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

//Test secure api endpoint
app.get('/api/secure',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user));
  }
);

function generateUserToken(req, res) {
	let user = {
		id: req.user.id
	};
  	const accessToken = token.generateAccessToken(user);
  	console.log("accessToken",accessToken);
  	res.redirect(config.APP_URL + "/verify?token=" + accessToken);
}

app.get('/auth/facebook/',
  passport.authenticate('facebook', { session: false }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  generateUserToken);

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