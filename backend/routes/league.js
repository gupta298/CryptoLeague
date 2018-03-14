var express = require('express');
var router = express.Router();

const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

router.get('/', (req, res) => {
    mongo.getLeague(function(error, response) {
      res.send(response);
    });
  }
);

router.post('/', (req, res) => {
	if (!req.user.currentLeague_id) {
		if (!req.body.league_type_id) {
	  		res.send({'message': "No league type found!!"});
	  	} else {
	  		mongo.checkLeagueType(req.body.league_type_id, function(error, response) {
				if (!error && response == true) {
					mongo.createLeague(req.body.league_type_id, req.user._id, function(error, response_league) {
						req.user.currentLeague_id = response_league._id;
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