var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var request = require("request");

var index = require('./routes/index');
var users = require('./routes/users');
var token = require('./token');

var newsapi = require('./routes/newsapi');

var config = require('./config/config')
const passport = require('passport');

require('./config/passport');
var config = require('./config/config')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var mongodbUrl = config.mongoDBHost;

function Coin(name, price, ticker){
  this.name = name;
  this.price = price;
  this.ticker = ticker;
}

var coinMarketAPI = config.coinMarketAPI;
var coinData = [];

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

app.use('/', index);
app.use('/users', users);
app.use('/news', passport.authenticate(['jwt'], { session: false }), newsapi);

/*
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
*/

//Test secure api endpoint
app.get('/api/secure',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user));
  }
);

function generateUserToken(req, res) {
  	const accessToken = token.generateAccessToken(req.user);
  	console.log("accessToken",accessToken);
  	res.redirect(config.APP_URL + "/verify?token=" + accessToken);
}

app.get('/auth/facebook/',
  passport.authenticate('facebook', {scope: ['email', 'public_profile', 'user_photos', 'user_friends', 'user_about_me'], session: false }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  generateUserToken);

app.get('/auth/google/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'], session: false }));

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  generateUserToken);

app.get('/app/user',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : req.user.id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          res.send(JSON.stringify(result));
        } else  {
          res.send(null);
        }

        db.close();
      });
    });
  }
);

app.get('/app/all_users',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).toArray(function(err, result) {
        if (err) throw err;

        if (result != null) {
          res.send(JSON.stringify(result));
        } else  {
          res.send(null);
        }

        db.close();
      });
    });
  }
);

app.put('/app/updateUser',
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log("Updating the user information of: " + req.user.id);
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("test");
      
      dbo.collection("Users").findOneAndUpdate({'id': req.user.id}, {$set: {id: req.user.id, email: req.user.email, lastname: req.user.lastname, 
        firstname: req.user.firstname, username: req.user.username, profilePicture: req.user.profilePicture, tokens: req.user.tokens, 
        currentLeague_id: req.user.currentLeague_id}}, function(err, res) {
        if (err) {
          res.send("Failure");
          throw err;
        }
        console.log("User updated");
        db.close();
      });

      res.send("Success");

    });
  }
);

app.get('/app/market',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    res.send(JSON.stringify(coinData));
  }
);

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

function callCoinMarketAPI() {
  request({
      url: coinMarketAPI,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var data = JSON.parse(JSON.stringify(body));
          var tempCoinData = [];
          for (var temp in data) {
              var tempCoin = new Coin (data[temp].name, data[temp].price_usd,data[temp].symbol);
              tempCoinData.push(tempCoin);
          }
          console.log("Updated coins");
          coinData = [];
          coinData = tempCoinData;
          // console.log(JSON.stringify(coinData));
      } else {
        console.log("Error updating the coin data");
      }
  });
}

callCoinMarketAPI();
setInterval( function() {
  callCoinMarketAPI();
}, 100000);

console.log("Success");
module.exports = app;