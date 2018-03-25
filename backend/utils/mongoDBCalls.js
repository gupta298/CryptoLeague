/*
League statuses/stati number to string

0 - Waiting
1 - Waiting_Locked
2 - Locked
3 - Started
4 - Finished
*/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , ObjectId = require('mongodb').ObjectID;

const config = require('../config/config');
const mongodbUrl = config.mongoDBHost;
const portfolio_schema = require('../models/portfolio');

var token = require('../utils/token');
var market = require('../routes/market');
var asyncLoop = require('node-async-loop');
var schedule = require('node-schedule');

const league_schema = require('../models/league');

var Enum = require('enum');
const myEnum = new Enum({'Waiting' : 0, 'Waiting_Locked' : 1, 'Locked' : 2, 'Started' : 3, 'Finished' : 4}, { freez: true });

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
                                                        { 'status' : "0" }, { 'status' : "1" }
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
          if (item._id.toString() === id.toString()) {
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
          if (portfolio.user_id.toString() === user._id.toString()) {
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

function makeNewPortfolio(callback) {
  market.top3Coins(function(err, res) {
    var portfolio = new portfolio_schema;

    portfolio.captain_coin = null;
    portfolio.holdings.push({ 'coin_symbol' : res['1'], 'percentage' : 35 });
    portfolio.holdings.push({ 'coin_symbol' : res['2'], 'percentage' : 35 });
    portfolio.holdings.push({ 'coin_symbol' : res['3'], 'percentage' : 30 });

    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Portfolios").insertOne(portfolio, function(err, result) {
        if (err) throw err;
        db.close();
      });
    });

    callback(null, portfolio);
  });
}

function getPortfolioWithID(portfolio_id, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("Portfolios").findOne({ '_id' : ObjectId(portfolio_id) }, function(err, result) {
      if (err) throw err;

      callback(null, result);

      db.close();
    });
  });
}

function startLeague(league_id){
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");
    dbo.collection("Leagues").findOneAndUpdate({'league_id': league_id}, {$set: {status : '3', current_market_coin: market.getCurrentCoinPrices(), locked_prices: market.getCurrentCoinPricesMap() }});
    db.close();
  });
}

function endLeague(league_id){
  MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoleague_database");

    dbo.collection("Leagues").findOne({'league_id' : league_id}, function(err, result) {
      if (err) throw err;

      if (result) {
        calculatePortfoliosValues(result, function(){
          //Sort portfolios by value
          result.portfolio_ids.sort(function(a, b) {
            return b.portfolio_value - a.portfolio_value;
          });

          //Set rankings and payouts
          for(let i = 0; i < result.portfolio_ids.length; i++) {
              // original ranking
              result.portfolio_ids[i].rank = i + 1;
              result.portfolio_ids[i].payout = 0;
          }
          let currRank = 1;
          result.portfolio_ids[0].rank = 1;
          for(let i = 1; i < result.portfolio_ids.length; i++){
            if(result.portfolio_ids[i].portfolio_value === result.portfolio_ids[i - 1].portfolio_value){
              result.portfolio_ids[i].rank = currRank;
            } else {
              result.portfolio_ids[i].rank = ++currRank;
            }
          }

          let totalCoins = result.league_buy_in * result.portfolio_ids.length();

          //Count number of people
          let numTop25 = 0, numTop50 = 0, numTop75 = 0;
          for(let i = 0; i < result.portfolio_ids.length; i++){
            if(result.portfolio_ids[i].rank <= 25)
              numTop25++;
            if(result.portfolio_ids[i].rank <= 50)
              numTop50++;
            if(result.portfolio_ids[i].rank <= 75)
              numTop75++;
          }

          while(totalCoins > 0){
            for(let i = 0; i < result.portfolio_ids.length; i++){
              if(result.portfolio_ids[i].rank <= 25) {
                result.portfolio_ids[i].payout += (0.2 * totalCoins) / numTop25;
                totalCoins -= (0.2 * totalCoins) / numTop25;
              }
              if(result.portfolio_ids[i].rank <= 50) {
                result.portfolio_ids[i].payout += (0.3 * totalCoins) / numTop50;
                totalCoins -= (0.3 * totalCoins) / numTop50;
              }
              if(result.portfolio_ids[i].rank <= 75) {
                result.portfolio_ids[i].payout += (0.5 * totalCoins) / numTop75;
                totalCoins -= (0.5 * totalCoins) / numTop75;
              }
            }
          }
          MongoClient.connect(mongodbUrl, function (err, db) {
            if (err) throw err;
            var dbo = db.db("cryptoleague_database");

            //Update all the users
            for(let i = 0; i < result.portfolio_ids.length; i++){
              dbo.collection("Users").findOneAndUpdate({'_id': ObjectID(result.portfolio_ids[i].user_id)}, {$inc: {'tokens' : result.portfolio_ids[i].payout}});
            }

            //Update league
            dbo.collection("Leagues").findOneAndUpdate({'league_id': result.league_id}, {$set: {'portfolio_ids' : result.portfolio_ids, 'status': '4'}});
            db.close();
          });
        });
      }
      db.close();
    });
  });
}

function calculatePortfoliosValues(league, callback) {
  // All of the validations should be done before calling this function and you have to pass the entire league object to it

  var current_coin_data = market.getCurrentCoinPricesMap();
  var league_coins = league.locked_prices;

  asyncLoop(league.portfolio_ids, function (item, next) {
    getPortfolioWithID(item.portfolio_id, function(err, portfolio) {
      var overall_percentage_value = 0;
      if(portfolio && portfolio.holdings){
        for (index in portfolio.holdings) {
          //var found_current_market = current_coin_data.find( coin => coin.symbol.toString() === portfolio.holdings[index].coin_symbol.toString() );
          //var found_league_market = league_coins.find( coin => coin.symbol.toString() === portfolio.holdings[index].coin_symbol.toString() );
          var found_current_market = current_coin_data[portfolio.holdings[index].coin_symbol];
          var found_league_market = league_coins[portfolio.holdings[index].coin_symbol];
          
          var return_over_period = ((found_current_market - found_league_market) / found_league_market);
          var value = portfolio.holdings[index].percentage * return_over_period;

          if (portfolio.captain_coin && portfolio.captain_coin.toString() === portfolio.holdings[index].coin_symbol.toString()) {
            value *= 2;
          }

          overall_percentage_value += value;
        }
      }

      item.portfolio_value = overall_percentage_value;
      next();
    });
  }, callback);
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
    makeNewPortfolio(function(err, portfolio) {
      findWaitingLeague(league_Type.title, function(error, league_result) {
        if (league_result == false) {
          getNextSequenceValue(function(error, next_number) {

            var league = new league_schema();
            league.league_id = next_number;
            league.league_type =  league_Type.title;
            league.league_buy_in = league_Type.buy_in;
            league.status = "0";
            league.portfolio_ids.push({
              "username": user.username,
              "tokens": user.tokens,
              "profilePicture": user.profilePicture,
              "user_id": user._id,
              "portfolio_id" : portfolio._id,
              "portfolio_value": null
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
              "portfolio_id" : portfolio._id,
              "portfolio_value": null
            });

            dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result.league_id},
              {$push: {'portfolio_ids': {
                  "username": user.username,
                  "tokens": user.tokens,
                  "profilePicture": user.profilePicture,
                  "user_id": user._id,
                  "portfolio_id" : portfolio._id,
                  "portfolio_value": null
                }
              }});

            console.log("current users in the league: " + league_result.portfolio_ids.length);

            if (league_result.portfolio_ids.length == 10 || league_result.portfolio_ids.length >= 100) {
              if (league_result.portfolio_ids.length >= 100) {
                league_result.status = "2";
              } else {
                var date = new Date();
                var lockingDate = new Date(date);
                //lockingDate.setDate(date.getDate() + 1);
                lockingDate.setMinutes(date.getMinutes() + 1);
                var endingDate = new Date(date);
                endingDate.setDate(date.getDate() + 7);

                league_result.status = "1";
                league_result.start_time = lockingDate;

                console.log('scheduling job at ' + lockingDate);
                schedule.scheduleJob(lockingDate, startLeague.bind(null, league_result.league_id));

                console.log('scheduling job at ' + endingDate);
                schedule.scheduleJob(endingDate, endLeague.bind(null, league_result.league_id));
              }

              dbo.collection("Leagues").findOneAndUpdate({'league_id': league_result.league_id}, {$set: {status : league_result.status, start_time: lockingDate}});

              callback(null, JSON.parse(JSON.stringify(league_result)));
            } else {
              callback(null, JSON.parse(JSON.stringify(league_result)));
            }

            db.close();
          });
        }
      });
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

          if(result.status === "3"){
            calculatePortfoliosValues(result, function(){
              var foundUser = false;
              asyncLoop(result.portfolio_ids, function (item, next) {
                if (item) {
                  if (item.user_id.toString() === user_id.toString()) {
                    foundUser = true;
                  } else {
                    if (result.status.toString() !== '4') {
                      item.portfolio_id = null;
                    }
                  }
                }
                next();
              }, function () {
                var response = {
                  _id: result._id,
                  portfolio_ids: result.portfolio_ids,
                  league_id: result.league_id,
                  league_type: result.league_type,
                  status: result.status,
                  start_time: result.start_time
                };
                if (foundUser == false) {
                  if (response.status.toString() === '4') {
                    callback(null, JSON.parse(JSON.stringify(response)));
                  } else {
                    callback(null, {'message' : "Access denied! User not in the league!"});
                  }
                } else {
                  callback(null, JSON.parse(JSON.stringify(response)));
                }
              });
            });
          } else {
            var foundUser = false;
            asyncLoop(result.portfolio_ids, function (item, next) {
              if (item) {
                if (item.user_id.toString() === user_id.toString()) {
                  foundUser = true;
                } else {
                  if (result.status.toString() !== '4') {
                    item.portfolio_id = null;
                  }
                }
              }
              next();
            }, function () {
              var response = {
                _id: result._id,
                portfolio_ids: result.portfolio_ids,
                league_id: result.league_id,
                league_type: result.league_type,
                status: result.status,
                start_time: result.start_time
              };
              if (foundUser == false) {
                if (response.status.toString() === '4') {
                  callback(null, JSON.parse(JSON.stringify(response)));
                } else {
                  callback(null, {'message' : "Access denied! User not in the league!"});
                }
              } else {
                callback(null, JSON.parse(JSON.stringify(response)));
              }
            });
          }
        } else  {
          callback(null, { 'message' : "League does not exist!" });
        }

        db.close();
      });
    });
  },

  getPortfolio:
  function getPortfolio(league_id, user_id, user_actual_id, callback) {
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Leagues").findOne({'league_id' : league_id}, function(err, result) {
        if (err) throw err;

        if (result) {
          asyncLoop(result.portfolio_ids, function (item, next) {
            if (item) {
              if (item.user_id.toString() === user_id.toString()) {

                if (user_id.toString() !== user_actual_id.toString()) {

                  if (result.status.toString() === '4') {
                    getPortfolioWithID(item.portfolio_id, function(err, res) {
                      callback(null, res);
                      return;
                    });
                  } else {
                    callback(null, {'message' : 'Can not access the portfolio at this time!'});
                    return;
                  }

                } else {
                  getPortfolioWithID(item.portfolio_id, function(err, res) {
                    callback(null, res);
                    return;
                  });
                }

              } else {
                next();
              }
            } else {
              next();
            }
          }, function () {
            callback(null, { 'message' : "User not found in the league!" })
          });
        } else  {
          callback(null, { 'message' : "League does not exist!" });
        }

        db.close();
      });
    });
  },

  updatePortfolioWithID:
  function updatePortfolioWithID(portfolio_id, holding, captain_coin, callback){
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db("cryptoleague_database");
      dbo.collection("Portfolios").findOneAndUpdate({'_id': ObjectId(portfolio_id)}, {$set: {holdings : holding, captain_coin: captain_coin}}, function(err, result) {
        callback(err, result);
      });
      db.close();
    });
  }
};