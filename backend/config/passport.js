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
    var collection = db.collection('Users');

    //check if username is already assigned in our database
    collection.findOne({'id' : jwt_payload.id})
      .then(function (result) {
          if (result != null) {
            console.log("USERNAME ALREADY EXISTS:", result.username);
            next(null, result);
          } else  {
            console.log("USERNAME DOES NOT ALREADY EXISTS");
            next(null, false);
          }
      });
  });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
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
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      console.log(profile);
      var collection = db.collection('Users');

      collection.findOne({'id' : profile.id})
        .then(function (result) {
          if (result != null) {
            console.log("USERNAME ALREADY EXISTS:", result.username);
            cb(null, result);
          } else  {
            //next(null, false);
            var user = new userSchema.facebook();

            console.log("CREATING USER:", profile.username);

            collection.insert(user)
              .then(function () {
                db.close();
                deferred.resolve(user);
              });

            return cb(null, user);
          }
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
    MongoClient.connect(mongodbUrl, function (err, db) {
      console.log(profile);
      var collection = db.collection('Users');

      //check if username is already assigned in our database
      collection.findOne({'id' : profile.id})
        .then(function (result) {
          if (result != null) {
            console.log("USERNAME ALREADY EXISTS:", result.username);
            cb(null, result);
          } else  {
            //next(null, false);
            var user = new userSchema.google();

            console.log("CREATING USER:", profile.username);

            collection.insert(user)
              .then(function () {
                db.close();
                deferred.resolve(user);
              });

            return cb(null, user);
          }
        });
    });
  }
));