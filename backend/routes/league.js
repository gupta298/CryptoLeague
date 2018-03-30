var express = require('express');
var router = express.Router();

const passport = require('passport');
const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {GET} /league/:league_id Request to get the league
 * @apiName Get_League_With_LeagueId
 * @apiGroup League
 *
 * @apiParam {Number} league_id ID of the requested league.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} League Returns the league object that is requested.
*/
router.get('/:league_id', passport.authenticate(['jwt'], { session: false }), (req, res) => {
    mongo.getLeague(req.params.league_id, req.user._id, function(error, response) {
    	if (error) {
    		res.send(400, {"message" : error});
    	} else {
    		res.send(response);
    	}
    });
});

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
		mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
			if (error) {
				res.send(400, {"message" : error});
	    	} else {
	    		res.send(response);
	    	}
	    });
	} else {
		res.send(400, {'message' : "Not in a league!"})
	}
});

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
	  		res.send(400, {'message': "League type id is required for joining a league. No league type id found in the request body!"});
	  	} else {
	  		mongo.checkLeagueType(req.body.league_type_id, req.user._id, function(error, response) {
				if (!error && response) {
					mongo.createLeague(response.league_type, response.user, function(error, response_league) {
						if (error) {
							res.send(400, {'message': error});
						} else {
							req.user.currentLeague_id = response_league.league_id;
							req.user.tokens -=  response.league_type.buy_in;
							mongo.updateUserLeague(req.user, function(err, resp) {
								if (error) {
									res.send(400, {'message': "User joined the league, but there was an error updating there current league and tokens left."});
								} else {
									res.send(response_league);
								}
							});
						}
					});
				} else {
					res.send(400, {'message': error});
				}
		    });
	  	}
	} else {
		res.send(400, {'message' : "Already in a league. You can only be in one league at a time."});
	}
});

module.exports = router;