var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
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

        if (result != null) {
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

        if (result != null) {
          callback(null, JSON.parse(JSON.stringify(result)));
        } else  {
          callback(null, false);
        }

        db.close();
    });
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

        if (result != null) {
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

        if (result != null) {
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
      var dbo = db.db("cryptoleague_database");
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

      var dbo = db.db("cryptoleague_database");
      dbo.collection("Users").findOneAndUpdate({'id': user.id}, {$set: {email: user.email, username: user.username, 
        profilePicture: user.profilePicture}}, function(err, res) {
        if (err) {
          throw err;
        }

        console.log(res);

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
      dbo.collection("Users").findOneAndUpdate({'id': user.id}, {$set: {currentLeague_id: user.currentLeague_id}}, function(err, res) {
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
      var dbo = db.db("cryptoleague_database");
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
      var dbo = db.db("cryptoleague_database");
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
  },

  getLeagueTypes:
  function getLeagueTypes(callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("League_Types").find({}).toArray(function(err, result) {
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

  checkLeagueType:
  function checkLeagueType(league_Types_id, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
        var dbo = db.db("cryptoleague_database");
        dbo.collection("League_Types").findOne({'league_type_id' : league_Types_id}, function(err, result) {
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

  createLeague:
  function createLeague(league_Types_id, user_id, callback) {
    var user = { "user_id": user_id, "portfolio_id": null };

    findLeagueType(league_Types_id, function(err, result) {
      findWaitingLeague(result.title, function(error, league_result) {
        if (error || league_result == false) {

          var league = new league_schema();

          league.league_id = league._id;
          league.league_type =  result.title;
          league.status = "Waiting";
          league.portfolio_ids.push(user);
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

        } else {
          MongoClient.connect(mongodbUrl, function (err, db) {
            if (err) throw err;
            var dbo = db.db("cryptoleague_database");
            league_result.portfolio_ids.push(user);
            // console.log(league_result.portfolio_ids.length);

            dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result._id}, 
              {$push: {'portfolio_ids': {"user_id": user_id, "portfolio_id": null}}},
              function(err, res) {
                if (err) throw err;

                if (league_result.portfolio_ids.length == 10 || league_result.portfolio_ids.length == 100) {
                  if (league_result.portfolio_ids.length == 100) {
                    league_result.status = "Locked";
                  } else {
                    var date = new Date();
                    var date2 = new Date(date);
                  
                    date2.setMinutes(date.getMinutes() + (24 * 60));
                    league_result.status = "Waiting_Locked";

                    league_result.start_time = date2;

                    // TODO Call the function that will execute when this league starts, so after 24 hours

                  }

                  dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result._id}, {$set: {status : league_result.status, 
                    start_time: date2}}, function(err, league_result_final) {
                      callback(null, JSON.parse(JSON.stringify(league_result)));
                  });

                } else {
                  callback(null, JSON.parse(JSON.stringify(league_result)));
                }

                db.close();
            });
          });
        }
      });
    });
  }

  // getLeague:
  // function getLeague(callback) {
  //   MongoClient.connect(mongodbUrl, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("cryptoleague_database");
  //     dbo.collection("Leagues").findOne({'id' : jwt_payload.currentLeague_id}, function(err, result) {
  //       if (err) throw err;

  //       if (result != null) {
  //         callback(null, JSON.parse(JSON.stringify(result)));
  //       } else  {
  //         callback(null, false);
  //       }
  //       db.close();
  //     });
  //   });
  // },

  // getPortfolio:
  // function getPortfolio(callback) {
  //   MongoClient.connect(mongodbUrl, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("cryptoleague_database");
  //     dbo.collection("Leagues").findOne({'id' : jwt_payload.currentLeague_id}, function(err, result) {
  //       if (err) throw err;

  //       if (result != null) {
          
  //         dbo.collection("Portfolios").findOne({'id' : result.portfolio_ids[jwt_payload.id]}, function(errPorfolio, resultPortfolio) {
  //           if (errPorfolio) throw errPorfolio;

  //           if (resultPortfolio != null) {
  //             callback(null, JSON.parse(JSON.stringify(resultPortfolio)));
  //           } else  {
  //             callback(null, false);
  //           }
  //           db.close();
  //         });

  //       } else  {
  //         callback(null, false);
  //       }
  //       db.close();
  //     });
  //   });
  // }
};