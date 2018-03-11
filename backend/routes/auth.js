var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

var config = require('../config/config');
var token = require('../utils/token');
require('../config/passport');

var router = express.Router();
const passport = require('passport');

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
