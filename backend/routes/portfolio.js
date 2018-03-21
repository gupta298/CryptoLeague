
var express = require('express');
var router = express.Router();

const passport = require('passport');
const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

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
		res.send({'message' : "Not in a league"})
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
	// Follow the below logic please:
		// 1. check if the user is in a league
		// 2. check the status of the league (it has to be "Waiting" or "Waiting_Locked" or "Locked" to make any changes to the portfolio)
		// 3. Check to see of the portfolio is valid
		// 4. update the portfolio and return the final updated portfolio
});

module.exports = router;