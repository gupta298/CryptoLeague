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
       res.send(response);
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
       res.send(response);
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
 	      res.send(response);
 	    });
 	} else {
 		res.send({'message' : "Not in any league"})
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

	console.log(req.body);
	console.log(req.body._id);

 	if (req.user.currentLeague_id && req.body && req.body.holdings) {
 		//console.log(req.body.holdings.length);
 		if(req.body.holdings.length < 3 && req.body.holdings.length > 6){
 			res.send({'message' : "Number of coins is not correct"});
      return;
 		} else {
      mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
 				if (response.status.toString() == "0" || response.status.toString() == "1" || response.status.toString() == "2") {
          var counter = 0;
          var capcoinFlag = 1;
          asyncLoop(req.body.holdings, function (item, next) {
            counter += item.percentage;
            if(item.percentage <= 0){res.send({'message' : "Coins can not have percentage less than or equal to 0"});return;}
            if(item.percentage > 35){res.send({'message' : "Coins can not make up more than 35% of your portfolio"});return;}
            if(!market.getCoinTickers().includes(item.coin_symbol.toString())){res.send({'message' : "Please select a valid coin"});return;}
            if(req.body.captain_coin && item.coin_symbol.toString() == req.body.captain_coin){capcoinFlag = 0;}
            next();
          }, function () {
              if(counter != 100){
                res.send({'message' : "Total percentage is not equal to 100"});
                return;
              }else if(capcoinFlag != 0){
                res.send({'message' : "Captain Coin must be a coin that you've chosen in your portfolio. It can not be a new coin"});
                return;
               } else{
                console.log("Portfolio is Correct");

                mongo.updatePortfolioWithID(req.body._id, req.body.holdings, req.body.captain_coin, function(error, result) {
                  if(error)
                    console.log(error);
                  console.log(result);
                  res.send({'message' : "success"});
                  return;
                });
              }
          });
				} else {
						res.send({'message' : "League Locked"});
            return;
				}
			});



		}
	} else {
		res.send({'message' : "Not in any league or invalid body"});
    return;
	}
 });

 module.exports = router;
