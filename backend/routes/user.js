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

router.get('/',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    console.log(req.user.id);
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").findOne({'id' : req.user.id}, function(err, result) {
        if (err) throw err;

        if (result != null) {
          res.send(JSON.stringify(result));
        } else  {
          res.send(null);
        }

        db.close();
      });
    });
  }
);

router.put('/',
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    //console.log(req);
    console.log("Updating the user information of: " + req.body.id);
    MongoClient.connect(mongodbUrl, function (err, db) {
      if (err) throw err;

      var dbo = db.db("test");
      
      dbo.collection("Users").findOneAndUpdate({'id': req.body.id}, {$set: {id: req.body.id, email: req.body.email, lastname: req.body.lastname, 
        firstname: req.body.firstname, username: req.body.username, profilePicture: req.body.profilePicture}}, function(err, res) {
        if (err) {
          res.send("Failure");
          throw err;
        }
        console.log("User updated: ",token.generateAccessToken(req.body));
        db.close();
      });

      res.send({ 'jwt' : token.generateAccessToken(req.body)});
    });
  }
);

module.exports = router;
