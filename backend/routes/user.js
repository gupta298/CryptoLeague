var express = require('express');
var router = express.Router();
require('../config/passport');

var config = require('../config/config');
var token = require('../utils/token');
const passport = require('passport');
var mongo = require('../utils/mongoDBCalls');

router.get('/',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    //res.send('Secure response from ' + JSON.stringify(req.user));
    mongo.getUserViaID(req.user.id, function(error, result) {
      if (error) {
        res.send(null);
      } else {
        res.send(result);
      }
    });
  }
);

router.put('/',
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    mongo.getUserViaID(req.user.id, function(error, result) {
      if (error) {
        res.send("User does not exists");
      } else {
        result.email = req.body.email;
        result.lastname = req.body.lastname;
        result.firstname = req.body.firstname;
        result.username = req.body.username;
        result.profilePicture = req.body.profilePicture;

        mongo.updateUser(result, function(error, token) {
          if (error) {
            res.send("Could not update user");
          } else {
            res.send({ 'jwt' : token });
          }
        });
      }
    });
  }
);

module.exports = router;
