var express = require('express');
var router = express.Router();
require('../config/passport');

var config = require('../config/config');
var token = require('../utils/token');
const passport = require('passport');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var mongodbUrl = config.mongoDBHost;

router.post('/',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    // console.log(req.body);
    if (!req.body.username) {
    	res.send({'exists': null});
    } else {
	    //res.send('Secure response from ' + JSON.stringify(req.user));
	    MongoClient.connect(mongodbUrl, function (err, db) {
	    if (err) throw err;
	      var dbo = db.db("test");
	      dbo.collection("Users").findOne({'username' : req.body.username}, function(err, result) {
	        if (err) throw err;

	        if (result != null) {
	          res.send({'exists': true});
	        } else  {
	          res.send({'exists': false});
	        }

	        db.close();
	      });
	    });
	}
  }
);

module.exports = router;