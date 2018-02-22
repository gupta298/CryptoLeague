var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var config = require('../config/config');
var mongodbUrl = config.mongoDBHost;
var token = require('../utils/token');
var asyncLoop = require('node-async-loop');

module.exports = {
  connectToMongo:
  function connectToMongo(callback) {
    MongoClient.connect(mongodbUrl, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to database");
      db.close();

      callback(null, true);
    });
  },

  checkUserExists:
  function checkUserExists(jwt_payload, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("Users").findOne({'id' : jwt_payload.id}, function(err, result) {
          if (err) throw err;
          // console.log("Found user in DB");

          if (result != null) {
            // console.log("USERNAME ALREADY EXISTS:", result.id);
            callback(null, result);
          } else  {
            // console.log("USERNAME DOES NOT ALREADY EXISTS");
            callback(null, false);
          }

          db.close();
      });
    });
  },

  addUser:
  function addUser(user, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : user.id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          console.log("USERNAME ALREADY EXISTS:", result.id);
          callback(null, result);
        } else  {
          console.log("CREATING USER:", user);
          dbo.collection("Users").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("User created!!");
            db.close();
          });
          // console.log('user', user);
          callback(null, user);
        }

        db.close();
      });
    });
  },

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

      callback(null, token.generateAccessToken(user));
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
  },

  getUserRank:
  function getUserRank(id, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).toArray(function(err, result) {
        if (err) throw err;

        if (result != null) {
          var resultIndex = 0;
          var counter = 1;
          asyncLoop(result, function (item, next) {
            if (item._id.equals(id)) {
              resultIndex = counter;
            }
            counter++;
            next();
          }, function () {
            var object = { "rank" : resultIndex };
            callback(null, JSON.parse(JSON.stringify(object)));
          });
        } else  {
          callback(null, false);
        }
        db.close();
      });
    });
  },

  getTotalUsers:
  function getTotalUsers(callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).toArray(function(err, result) {
        if (err) throw err;

        if (result != null) {
          var object = { "totalUsers" : result.length };
          callback(null, JSON.parse(JSON.stringify(object)));
        } else  {
          callback(null, false);
        }
        db.close();
      });
    });
  }
};