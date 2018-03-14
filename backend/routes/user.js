var express = require('express');
var router = express.Router();
require('../config/passport');

const config = require('../config/config');
const passport = require('passport');
const mongo = require('../utils/mongoDBCalls');

var token = require('../utils/token');

/**
 * @api {GET} /user Request the user information
 * @apiName Get_User_Information
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.get('/', (req, res) => {
  console.log(req);
  mongo.getUserViaID(req.user.id, function(error, result) {
    if (error) {
      res.send(null);
    } else {
      res.send({ 'jwt' : token.generateAccessToken(result) });
    }
  });
});

/**
 * @api {PUT} /user Request to update the user's information
 * @apiName Update_User_Information
 * @apiGroup User
 *
 * @apiParam {User_Object} User User object with updated information.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.put('/', (req, res) => {
  mongo.getUserViaID(req.user.id, function(error, result) {
    if (error) {
      res.send("User does not exists");
    } else {
      if (req.body.email) result.email = req.body.email;
      if (req.body.username) result.username = req.body.username;
      if (req.body.profilePicture) result.profilePicture = req.body.profilePicture;

      mongo.updateUser(result, function(error, token) {
        if (error) {
          res.send("Could not update user");
        } else {
          res.send({ 'jwt' : token });
        }
      });
    }
  });
});

module.exports = router;