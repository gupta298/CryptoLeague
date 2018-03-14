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
					mongo.createLeague(req.body.league_type_id, req.user._id, function(error, response) {
						req.user.currentLeague_id = response._id;
						mongo.updateUserLeague(req.user, function(error, response) {
							res.send(response);
						});
					});
				} else {
					res.send({'message': "No league type found!!"});
				}
		    });
	  	}
	}
});

module.exports = router;