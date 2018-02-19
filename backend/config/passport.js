var passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var _ = require("lodash");

var mongoose = require('mongoose');
const userSchema = require('./../models/user');

var config = require('./config')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var mongodbUrl = config.mongoDBHost;

// Use connect method to connect to the server
MongoClient.connect(mongodbUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to database");
  db.close();
});

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;
jwtOptions.issuer = config.JWT_ISSUER;
jwtOptions.audience = config.JWT_AUDIENCE;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : jwt_payload.id}, function(err, result) {
        if (err) throw err;
        console.log("Found user in DB");

        if (result != null) {
          console.log("USERNAME ALREADY EXISTS:", result.id);
          next(null, result);
        } else  {
          console.log("USERNAME DOES NOT ALREADY EXISTS");
          next(null, false);
        }

        db.close();
    });
  });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  console.log("serializing " + user.id);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

/*  FACEBOOK AUTH  */
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = config.facebook.CLIENT_ID;
const FACEBOOK_APP_SECRET = config.facebook.CLIENT_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'email', 'name', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);

    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : profile.id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          console.log("USERNAME ALREADY EXISTS:", result.id);
          return cb(null, result);
        } else  {
          var user = new userSchema();
          user.id = profile.id;
          user.email = profile.emails[0].value;
          user.lastname = profile.name.familyName;
          user.firstname = profile.name.givenName;
          user.username = null,
          user.profilePicture = profile.photos[0].value;
          user.tokens = 25;
          user.currentLeague_id = null;

          console.log("CREATING USER:", user);

          dbo.collection("Users").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("User created!!");
            db.close();
          });

          console.log('user', user);
          return cb(null, user.toJSON());
        }

        db.close();
      });
    });
  }
));

/*  GOOGLE AUTH  */
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_APP_ID = config.google.CLIENT_ID;
const GOOGLE_APP_SECRET = config.google.CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_APP_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);

    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : profile.id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          console.log("USERNAME ALREADY EXISTS:", result.id);
          return cb(null, result);
        } else  {
          var user = new userSchema();
          user.id = profile.id;
          user.email = profile.emails[0].value;
          user.lastname = profile.name.familyName;
          user.firstname = profile.name.givenName;
          user.username = null,
          user.profilePicture = profile._json.image.url;
          user.tokens = 25;
          user.currentLeague_id = null;

          console.log("CREATING USER:", user);

          dbo.collection("Users").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("User created!!");
            db.close();
          });

          return cb(null, user);
        }

        db.close();
      });
    });
  }
));