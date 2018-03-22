var express = require('express');
var router = express.Router();

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
	//console.log(req.body.holdings);
	// var doubleFlag = 0;
	// uniqueArray = req.body.holdings.length.filter(function(elem, pos) {
	// 	uniqueArray.indexOf(item) == pos;
	// 	if(uniqueArray.length != req.body.holdings.length){
	// 		doubleFlag = 1;
	// 	}
	// });
	if (req.user.currentLeague_id) {
		//console.log(req.body.holdings.length);
		if(req.body.holdings.length < 3 && req.body.holdings.length > 6){
			res.send({'message' : "Number of coins not correct"});
		}
	// else if(doubleFlag == 1){
	// 	res.send({'message' : "You can not have duplicate coins in the portfolio"});
	else{
			mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
				if (response.status.toString() === "Waiting" || response.status.toString() === "Waiting_Locked" || response.status.toString() === "Locked") {
						//res.send(response);
						var counter = 0;
						var minusFlag = 0;
						var topcapFlag = 0;
						var capcoinFlag = 0;
						asyncLoop(req.body.holdings, function (item, next) {
		          counter += item.percentage;
							if(item.percentage <= 0){minusFlag = 1;}
							if(item.percentage > 35){topcapFlag = 1;}
							if(item.coin_symbol.toString() != req.body.captain_coin){capcoinFlag = 1;}
		          next();
		        }, function () {
							//capital coin is already in there
							//have to actual coins
							//console.log(req.body);
								if(counter != 100){
									res.send({'message' : "Total percentage is not equal to 100"});
								} else if(minusFlag != 0){
									res.send({'message' : "Coins can not have percentage less than or equal to 0"});
								} else if(topcapFlag != 0){
									res.send({'message' : "Coins can not make up more than 35% of your portfolio"});
								} else if(capcoinFlag != 0){
									res.send({'message' : "Captain Coin must be a coin that you've chosen in your portfolio. It can not be a new coin"});
								} else{
									console.log("Portfolio is Correct");
								}
		        });

					} else {
						res.send({'message' : "League Locked"});
					}
			});
		}
	} else {
		res.send({'message' : "Not in any league"})
	}

		// 4. update the portfolio and return the final updated portfolio
});

module.exports = router;
