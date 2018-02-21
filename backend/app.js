var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var request = require("request");

//Routes
var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var market = require('./routes/market');
var newsapi = require('./routes/newsapi');

var config = require('./config/config')
const passport = require('passport');

require('./config/passport');
var config = require('./config/config')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var mongodbUrl = config.mongoDBHost;

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
app.use('/auth', auth);
app.use('/news', passport.authenticate(['jwt'], { session: false }), newsapi);
app.use('/market', passport.authenticate(['jwt'], { session: false }), market);

//Test secure api endpoint
app.get('/api/secure',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user));
  }
);


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

app.post('/app/all_users',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    var page = 1;
    if (req.body.page) {
      page = req.body.page;
    }

    var start = (page - 1) * 25;
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).limit(25).skip(start).toArray(function(err, result) {
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
    //console.log(req);
    console.log("Updating the user information of: " + req.body.id);
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("test");
      
      dbo.collection("Users").findOneAndUpdate({'id': req.body.id}, {$set: {id: req.body.id, email: req.body.email, lastname: req.body.lastname, 
        firstname: req.body.firstname, username: req.body.username, profilePicture: req.body.profilePicture}}, function(err, res) {
        if (err) {
          res.send("Failure");
          throw err;
        }
        console.log("User updated");
        db.close();
      });

      res.send(token.generateAccessToken(req.body));
    });
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

console.log("Success");
module.exports = app;