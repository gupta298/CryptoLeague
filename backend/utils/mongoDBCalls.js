var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var config = require('../config/config');
var mongodbUrl = config.mongoDBHost;
var token = require('../utils/token');

module.exports = {
  getUserViaID:
  function getUserViaID(userID, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("Users").findOne({'id' : userID}, function(err, result) {
          if (err) throw err;

          if (result != null) {
            callback(null, JSON.parse(JSON.stringify(result)));
          } else  {
            callback(null, false);
          }

          db.close();
        });
      });
  },

  getUserViaUsername:
  function getUserViaUsername(username, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'username' : username}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          callback(null, true);
        } else  {
          callback(null, false);
        }

        db.close();
      });
    });
  },

  updateUser:
  function updateUser(user, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("test");
      dbo.collection("Users").findOneAndUpdate({'id': user.id}, {$set: {email: user.email, lastname: user.lastname, 
        firstname: user.firstname, username: user.username, profilePicture: user.profilePicture}}, function(err, res) {
        if (err) {
          throw err;
        }
        console.log("User updated");
        db.close();
      });

      callback(null, token.generateAccessToken(JSON.parse(user)));
    });
  },

  getAllUsers:
  function getAllUsers(page, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).limit(25).skip(page).toArray(function(err, result) {
        console.log("result: " + JSON.stringify(result));
        if (err) throw err;

        if (result != null) {
          callback(null, JSON.parse(JSON.stringify(result)));
        } else  {
          callback(null, false);
        }

        db.close();
      });
    });
  }
};