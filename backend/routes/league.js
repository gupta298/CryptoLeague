var express = require('express');
var router = express.Router();
var Hashids = require('hashids');

const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');
var hash = new Hashids(config.hashid, 8);

router.get('/', (req, res) => {
    mongo.getLeague(function(error, response) {
      res.send(response);
    });
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
router.post('/', (req, res) => {
	if (!req.user.currentLeague_id) {
		if (!req.body.league_type_id) {
	  		res.send({'message': "No league type found!!"});
	  	} else {
	  		mongo.checkLeagueType(req.body.league_type_id, function(error, response) {
				if (!error && response == true) {
					mongo.createLeague(req.body.league_type_id, req.user._id, function(error, response_league) {
						req.user.currentLeague_id = response_league.league_id;
						mongo.updateUserLeague(req.user, function(error, response) {
							res.send(response_league);
						});
					});
				} else {
					res.send({'message': "No league type found!!"});
				}
		    });
	  	}
	} else {
		res.send({'message' : "Already in a league"});
	}
});

module.exports = router;