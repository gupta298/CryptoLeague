var express = require('express');
var router = express.Router();

const passport = require('passport');
const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {GET} /league/:league_id Request to get the league
 * @apiName Get_League
 * @apiGroup League
 *
 * @apiParam {Number} league_id ID of the requested league.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} League Returns the league object that is requested.
*/
router.get('/:league_id', (req, res) => {
    mongo.getLeague(req.params.league_id, function(error, response) {
      res.send(response);
    });
  }
);

/**
 * @api {GET} /league Request to get the league
 * @apiName Get_League
 * @apiGroup League
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} League Returns the league object that the current user is in.
*/
router.get('/', passport.authenticate(['jwt'], { session: false }), (req, res) => {
	if (req.user.currentLeague_id) {
		mongo.getLeague(req.user.currentLeague_id, function(error, response) {
	      res.send(response);
	    });
	} else {
		res.send({'message' : "Not in a league"})
	}
  }
);

/**
 * @api {POST} /league Request to create or join a league
 * @apiName Join_Or_Create_League
 * @apiGroup League
 *
 * @apiParam {League_Type_ID} ID League type Id.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} League Returns the league object that the current user was added to.
*/
router.post('/', passport.authenticate(['jwt'], { session: false }), (req, res) => {
	if (!req.user.currentLeague_id) {
		if (!req.body.league_type_id) {
	  		res.send({'message': "No league type found!!"});
	  	} else {
	  		mongo.checkLeagueType(req.body.league_type_id, req.user._id, function(error, response) {
				if (!error && response) {
					mongo.createLeague(req.body.league_type_id, req.user._id, function(error, response_league) {
						req.user.currentLeague_id = response_league.league_id;
						req.user.tokens -=  response.buy_in;
						mongo.updateUserLeague(req.user, function(error, response) {
							res.send(response_league);
						});
					});
				} else {
					res.send({'message': error});
				}
		    });
	  	}
	} else {
		res.send({'message' : "Already in a league"});
	}
});

module.exports = router;