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
<<<<<<< HEAD
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
            res.send(token);
          }
        });
      }
=======
    //console.log(req);
    console.log("Updating the user information of: " + req.body.id);
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("test");
      
      dbo.collection("Users").findOneAndUpdate({'id': req.body.id}, {$set: {email: req.body.email, lastname: req.body.lastname, 
        firstname: req.body.firstname, username: req.body.username, profilePicture: req.body.profilePicture}}, function(err, res) {
        if (err) {
          res.send("Failure");
          throw err;
        }
        console.log("User updated: ",token.generateAccessToken(req.body));
        db.close();
      });

      res.send({ 'jwt' : token.generateAccessToken(req.body)});
>>>>>>> de3a30aff7bc44d670c5d63a11987e656b6ee589
    });
  }
);

module.exports = router;
