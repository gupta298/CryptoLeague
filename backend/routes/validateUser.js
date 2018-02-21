var express = require('express');
var router = express.Router();
require('../config/passport');

var config = require('../config/config');
var token = require('../utils/token');
const passport = require('passport');
var mongo = require('../utils/mongoDBCalls');

router.post('/',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    // console.log(req.body);
    if (!req.body.username) {
    	res.send({'exists': null});
    } else {
	    mongo.getUserViaUsername(req.body.username, function(error, response) {
	    	res.send({ 'exists' : response });
	    });
	}
  }
);

module.exports = router;