var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , ObjectId = require('mongodb').ObjectID;

const config = require('../config/config');
const mongodbUrl = config.mongoDBHost;

var token = require('../utils/token');
var asyncLoop = require('node-async-loop');

const league_schema = require('./../models/league');

function findLeagueType(league_Types_id, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("League_Types").findOne({'league_type_id' : league_Types_id}, function(err, result) {
      if (err) throw err;

      if (result) {
        callback(null, JSON.parse(JSON.stringify(result)));
      } else  {
        callback(null, false);
      }

      db.close();
    });
  });
}

function findWaitingLeague(league_type, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Leagues").findOne({ $and : [ {'league_type' : league_type},
                                                    { $or : [
                                                        { 'status' : "Waiting" }, { 'status' : "Waiting_Locked" }
                                                      ] }
                                                  ] }, function(err, result) {
        if (err) throw err;

        if (result) {
          callback(null, JSON.parse(JSON.stringify(result)));
        } else  {
          callback(null, false);
        }

        db.close();
    });
  });
}

function getNextSequenceValue(callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("League_Counter").findOneAndUpdate({'_id': 'Leagues' }, {$inc: { 'sequence_value': 1 }}, function(error, result) {
      callback(null, result.value.sequence_value);
     });
  });
}

function getRankOfUser(id, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("Users").find({}).sort( { tokens: -1 } ).toArray(function(err, result) {
      if (err) throw err;

      if (result) {
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
}

function getUserObject(user_id, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("Users").findOne({'_id' : ObjectId(user_id)}, function(err, result) {
      if (err) throw err;

      if (result) {
        var object = {
          'username' : result.username,
          'tokens' : result.tokens,
          'profilePicture' : result.profilePicture,
          'user_id' : result._id
        };
        callback(null, JSON.parse(JSON.stringify(object)));
      } else  {
        callback(null, null);
      }

      db.close();
    });
  });
}

function updateUserInLeagues(user) {
  var all_leagues = user.past_leagues;
  all_leagues.push(user.currentLeague_id);

  asyncLoop(all_leagues, function (item, next) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Leagues").findOne({'league_id' : item}, function(err, result) {
        if (err) throw err;

        asyncLoop(result.portfolio_ids, function (portfolio, next_portfolio) {
          if (portfolio.user_id == user._id) {
            portfolio.username = user.username;
            portfolio.profilePicture = user.profilePicture;
          }
          next_portfolio();
        }, function () {
          dbo.collection("Leagues").findOneAndUpdate({'league_id': item}, {$set: {'portfolio_ids': result.portfolio_ids}});
        });

        db.close();
        next();
      });
    });
  }, function () {
  });  
}

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
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOne({'id' : jwt_payload.id}, function(err, result) {
        if (err) throw err;

        if (result) {
          callback(null, result);
        } else  {
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
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOne({'id' : user.id}, function(err, result) {
        if (err) throw err;

        if (result) {
          callback(null, result);
        } else  {
          dbo.collection("Users").insertOne(user, function(err, res) {
            if (err) throw err;
            db.close();
          });
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
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOne({'_id' : ObjectId(userID)}, function(err, result) {
        if (err) throw err;

        if (result) {
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
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOne({'username' : username}, function(err, result) {
        if (err) throw err;

        if (result) {
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

      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOneAndUpdate({'_id': ObjectId(user._id)}, {$set: {email: user.email, username: user.username, 
        profilePicture: user.profilePicture}}, function(err, res) {
        if (err) {
          throw err;
        }

        res.value.email = user.email;
        res.value.username = user.username;
        res.value.profilePicture = user.profilePicture;
        updateUserInLeagues(res.value);

        callback(null, token.generateAccessToken(user));

        db.close();
      });
    });
  },

  updateUserLeague:
  function updateUserLeague(user, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOneAndUpdate({'_id': ObjectId(user._id)}, {$set: {currentLeague_id: user.currentLeague_id, tokens: user.tokens}}, 
        function(err, res) {
          if (err) {
            throw err;
          }

          callback(null, token.generateAccessToken(user));
          db.close();
      });
    });
  },

  getAllUsers:
  function getAllUsers(page, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).limit(25).skip(page).toArray(function(err, result) {
        if (err) throw err;

        if (result) {
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
    getRankOfUser(id, function(error, result) {
      callback(error, result);
    });
  },

  getTotalUsers:
  function getTotalUsers(callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").find({}).toArray(function(err, result) {
        if (err) throw err;

        if (result) {
          var object = { "totalUsers" : result.length };
          callback(null, JSON.parse(JSON.stringify(object)));
        } else  {
          callback(null, false);
        }
        db.close();
      });
    });
  },

  getLeagueTypes:
  function getLeagueTypes(callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("League_Types").find({}).toArray(function(err, result) {
        if (err) throw err;

        if (result) {
          callback(null, JSON.parse(JSON.stringify(result)));
        } else  {
          callback(null, false);
        }
        db.close();
      });
    });
  },

  checkLeagueType:
  function checkLeagueType(league_Types_id, user_id, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("League_Types").findOne({'league_type_id' : league_Types_id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          dbo.collection("Users").findOne({'_id' : ObjectId(user_id)}, function(err, result_user) {
            if (result_user.tokens < result.buy_in) {
              callback('No enough tokens', null);
            } else {
              callback(null, {'league_type' : result, 'user' : result_user});
            }
          });
        } else  {
          callback('League does not exist', null);
        }

        db.close();
      });
    });
  },

  createLeague:
  function createLeague(league_Type, user, callback) {
    findWaitingLeague(league_Type.title, function(error, league_result) {
      if (league_result == false) {
        getNextSequenceValue(function(error, next_number) {

          var league = new league_schema();
          league.league_id = next_number;
          league.league_type =  league_Type.title;
          league.status = "Waiting";
          league.portfolio_ids.push({
            "username": user.username,
            "tokens": user.tokens,
            "profilePicture": user.profilePicture,
            "user_id": user._id,
            "portfolio_id" : null
          });
          league.start_time = null;

          MongoClient.connect(mongodbUrl, function (err, db) {
            if (err) throw err;
            var dbo = db.db("cryptoleague_database");
            dbo.collection("Leagues").insertOne(league, function(err, res) {
              if (err) throw err;

              callback(null, JSON.parse(JSON.stringify(league)));

              db.close();
            });
          });
        });

      } else {
        MongoClient.connect(mongodbUrl, function (err, db) {
          if (err) throw err;
          var dbo = db.db("cryptoleague_database");

          league_result.portfolio_ids.push({
            "username": user.username,
            "tokens": user.tokens,
            "profilePicture": user.profilePicture,
            "user_id": user._id,
            "portfolio_id" : null
          });

          dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result.league_id}, 
            {$push: {'portfolio_ids': {
                "username": user.username,
                "tokens": user.tokens,
                "profilePicture": user.profilePicture,
                "user_id": user._id,
                "portfolio_id" : null
              }
            }});

          console.log("current users in the league: " + league_result.portfolio_ids.length);

          if (league_result.portfolio_ids.length == 10 || league_result.portfolio_ids.length >= 100) {
            if (league_result.portfolio_ids.length >= 100) {
              league_result.status = "Locked";
            } else {
              var date = new Date();
              var date2 = new Date(date);
            
              date2.setMinutes(date.getMinutes() + (24 * 60));
              league_result.status = "Waiting_Locked";

              league_result.start_time = date2;

              // TODO Call the function that will execute when this league starts, so after 24 hours
            }

            dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result.league_id}, {$set: {status : league_result.status, start_time: date2}});
            
            callback(null, JSON.parse(JSON.stringify(league_result)));
          } else {
            callback(null, JSON.parse(JSON.stringify(league_result)));
          }

          db.close();
        });
      }
    });
  },

  getLeague:
  function getLeague(league_id, user_id, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
        var dbo = db.db("cryptoleague_database");
        dbo.collection("Leagues").findOne({'league_id' : league_id}, function(err, result) {
          if (err) throw err;

          if (result) {
            var foundUser = false;
            console.log(user_id);
            asyncLoop(result.portfolio_ids, function (item, next) {
              console.log(item);
              // console.log(item.user_id);
              if (item.user_id == user_id) {
                foundUser = true;
              } else {
                if (result.status != 'Finished') {
                  item.portfolio_id = null;
                }
              }
              next();
            }, function () {
              if (foundUser == false) {
                if (result.status == 'Finished') {
                  callback(null, JSON.parse(JSON.stringify(result)));
                } else {
                  callback(null, {'message' : "Access denied! User not in the league!"});
                }
              } else {
                callback(null, JSON.parse(JSON.stringify(result)));
              }
            });
          } else  {
            callback(null, { 'message' : "League does not exist!" });
          }

          db.close();
      });
    });
  }
};