var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');


var config = require('../config/config');
var token = require('../utils/token');
require('../config/passport');

var router = express.Router();
const passport = require('passport');

/*
app.post("/api/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = usersArr[_.findIndex(usersArr, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id}; //TODO: Add user object here instead

    var jwtToken = token.generateAccessToken(payload);
    res.json({message: "ok", token: jwtToken});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});
*/

router.get('/facebook/',
  passport.authenticate('facebook', {scope: ['email', 'public_profile', 'user_photos', 'user_friends', 'user_about_me'], session: false }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  generateUserToken);

router.get('/google/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'], session: false }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  generateUserToken);

function generateUserToken(req, res) {
  	const accessToken = token.generateAccessToken(req.user);
  	console.log("accessToken",accessToken);
  	res.redirect(config.APP_URL + "/verify?token=" + accessToken);
}

module.exports = router;
