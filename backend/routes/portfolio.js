var express = require('express');
 var router = express.Router();
 var market = require('./market');

 const passport = require('passport');
 const config = require('../config/config');
 const mongo = require('../utils/mongoDBCalls');
 var asyncLoop = require('node-async-loop');

 /**
  * @api {GET} /portfolio/:league_id/:user_id Request to get the portfolio in a specific league of a specific user
  * @apiName Get_Portfolio_With_LeagueId_With_UserId
  * @apiGroup Portfolio
  *
  * @apiParam {Number} league_id ID of the requested league portfolio.
  * @apiParam {Number} user_id ID of the requested user.
  * @apiHeader {String} JWT JWT token of the user.
  *
  * @apiSuccess {JSON} League Returns the portfolio in a specific league of a specific user.
 */
 router.get('/:league_id/:user_id', passport.authenticate(['jwt'], { session: false }), (req, res) => {
  mongo.getPortfolio(req.params.league_id, req.params.user_id, req.user._id, function(error, response) {
    if (error) {
      res.send(400, { "message" : error });
    } else {
      res.send(response);
    }
  });
 });

 /**
  * @api {GET} /portfolio/:league_id Request to get the portfolio in this league
  * @apiName Get_Portfolio_With_LeagueId
  * @apiGroup Portfolio
  *
  * @apiParam {Number} league_id ID of the requested league portfolio.
  * @apiHeader {String} JWT JWT token of the user.
  *
  * @apiSuccess {JSON} League Returns the portfolio of the league that is requested.
 */
 router.get('/:league_id', passport.authenticate(['jwt'], { session: false }), (req, res) => {
  mongo.getPortfolio(req.params.league_id, req.user._id, req.user._id, function(error, response) {
    if (error) {
      res.send(400, { "message" : error });
    } else {
      res.send(response);
    }
  });
 });

 /**
  * @api {GET} /portfolio/ Request to get the portfolio of the current league
  * @apiName Get_Portfolio
  * @apiGroup Portfolio
  *
  * @apiHeader {String} JWT JWT token of the user.
  *
  * @apiSuccess {JSON} League Returns the portfolio of the current league.
 */
 router.get('/', passport.authenticate(['jwt'], { session: false }), (req, res) => {
 	if (req.user.currentLeague_id) {
 		mongo.getPortfolio(req.user.currentLeague_id, req.user._id, req.user._id, function(error, response) {
      if (error) {
        res.send(400, { "message" : error });
      } else {
        res.send(response);
      }
    });
 	} else {
 		res.send(400, {'message' : "Not in any league"})
 	}
 });

 /**
  * @api {PUT} /portfolio Request to update the portfolio a league
  * @apiName Update_portfolio
  * @apiGroup Portfolio
  *
  * @apiParam {Json} Portfolio_Object Updated portfolio object.
  * @apiHeader {String} JWT JWT token of the user.
  *
  * @apiSuccess {JSON} Portfolio_Object Returns the final updated portfolio object.
 */
 router.put('/', passport.authenticate(['jwt'], { session: false }), (req, res) => {
 	if (req.user.currentLeague_id && req.body && req.body.holdings && req.body.captain_coin !== undefined) {
 		if(req.body.holdings.length < 3 || req.body.holdings.length > 6) {
 			res.send(400, {'message' : "You should have a minimum of 3 coins and a maximum of 6 (both inclusive)"});
 		} else {
      var temp_holdings = [];
      for (var i = 0; i < req.body.holdings.length; i++) {
        if (temp_holdings.includes(req.body.holdings[i].coin_symbol)) {
          res.send(400, {'message' : "Portfolio coins can not repeat"});
          return;
        } else {
          temp_holdings.push(req.body.holdings[i].coin_symbol);
        }
      }

      var counter = 0;
      var capcoinFlag = 1;
      if (!req.body.captain_coin) {
        capcoinFlag = 0;
      }

      var coins = market.getCoinTickers();
      asyncLoop(req.body.holdings, function (item, next) {
        counter += item.percentage;
        if(item.percentage <= 0) {
          res.send(400, {'message' : "Coins can not have percentage less than or equal to 0"}); 
          return;
        }

        if(item.percentage > 35) {
          res.send(400, {'message' : "Coins can not make up more than 35% of your portfolio"}); 
          return;
        }

        if(!coins.includes(item.coin_symbol.toString())) {
          res.send(400, {'message' : "Please select a valid coin"}); 
          return;
        }

        if(req.body.captain_coin && item.coin_symbol.toString() == req.body.captain_coin.toString()) {
          capcoinFlag = 0;
        }

        next();
      }, function () {
          if(counter != 100){
            res.send(400, {'message' : "Total percentage is not equal to 100"});
          } else if(capcoinFlag != 0){
            res.send(400, {'message' : "Captain Coin must be a coin that you've chosen in your portfolio. It can not be a new coin"});
          } else {
            mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
              if (error) {
                res.send(400, {"message" : error});
                return;
              }

              if (response.status.toString() == "0" || response.status.toString() == "1" || response.status.toString() == "2") {
                var portfolio_id_user = null;
                for (var i = 0; i < response.portfolio_ids.length; i++) {
                  if (req.user._id.toString() === response.portfolio_ids[i].user_id.toString()) {
                    portfolio_id_user = response.portfolio_ids[i].portfolio_id;
                    break;
                  }
                }

                if (portfolio_id_user) {
                  mongo.updatePortfolioWithID(portfolio_id_user, req.body.holdings, req.body.captain_coin, function(error, result) {
                    if (error) {
                      res.send(400, {'message' : "Error updating the portfolio! Please try again later."});
                    } else {
                      res.send({'message' : "success"});
                    }
                  });
                } else {
                  res.send(400, {'message' : "Can not edit someone else's portfolio."});
                }
              } else {
                res.send(400, {'message' : "League Locked"});
              }
            });
          }
      });
		}
	} else {
		res.send(400, {'message' : "Not in any league or invalid body"});
	}
 });

 module.exports = router;
