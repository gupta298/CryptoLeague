var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

const config = require('../config/config');
const passport = require('passport');

require('../config/passport');
var token = require('../utils/token');
var router = express.Router();

/**
 * @api {GET} /auth/facebook Login using Facebook
 * @apiName Authentication_Facebook
 * @apiGroup User
 *
 * @apiSuccess {Redirect} User Redirects the user to Facebook for login.
*/
router.get('/facebook/',
  passport.authenticate('facebook', {scope: ['email', 'public_profile'], session: false }));

/**
 * @api {GET} /auth/facebook/callback Callback route from Facebook Login
 * @apiName Authentication_Facebook_Callback
 * @apiGroup User
 *
 * @apiParam {Facebook_Profile} Profile Profile for the user.
 *
 * @apiSuccess {JWT} JWT Returns the JWT token for the current user.
*/
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  generateUserToken);

/**
 * @api {GET} /auth/google Login using Google
 * @apiName Authentication_Google
 * @apiGroup User
 *
 * @apiSuccess {Redirect} User Redirects the user to Google for login.
*/
router.get('/google/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'], session: false }));

/**
 * @api {GET} /auth/google/callback Callback route from Google Login
 * @apiName Authentication_Google_Callback
 * @apiGroup User
 *
 * @apiParam {Google_Profile} Profile Profile for the user.
 *
 * @apiSuccess {JWT} JWT Returns the JWT token for the current user.
*/
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  generateUserToken);

function generateUserToken(req, res) {
  	const accessToken = token.generateAccessToken(req.user);
  	console.log("accessToken", accessToken);
  	res.redirect(config.APP_URL + "/verify?token=" + accessToken);
}

module.exports = router;