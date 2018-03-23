var express = require('express');
var request = require('request');
var router = express.Router();
const passport = require('passport');
const mongo = require('../utils/mongoDBCalls');
//var league = require('../models/league.js');

const config = require('../config/config');

router.get('/', passport.authenticate(['jwt'], { session: false }), (req, res) => {
  //console.log(req.user.currentLeague_id);
  if (req.user.currentLeague_id) {
		mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
        req.user.currentLeague_id = 'null';
        mongo.updateUserLeague(req.user, function(error, result) {
          if(error)
            console.log(error);
          console.log('User is no longer in a league');
        });
	      res.send(response);
	    });
	} else {
		res.send({'message' : "Not a league"});
    return;
	}
});

module.exports = router;
