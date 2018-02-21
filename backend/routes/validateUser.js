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
<<<<<<< HEAD
	    mongo.getUserViaUsername(req.body.username, function(error, response) {
	    	res.send(response);
=======
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
>>>>>>> de3a30aff7bc44d670c5d63a11987e656b6ee589
	    });
	}
  }
);

module.exports = router;