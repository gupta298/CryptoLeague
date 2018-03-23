var express = require('express');
var router = express.Router();
require('../config/passport');

const config = require('../config/config');
var token = require('../utils/token');
const passport = require('passport');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {POST} /validate_user Request to validate that the username does not already exists
 * @apiName Check_User_Information
 * @apiGroup User
 *
 * @apiParam {User_Object} User User object with updated information.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} Exists Returns a boolean value based on if the username already exists.
*/
router.post('/', (req, res) => {
  if (!req.body.username) {
  	res.send({'exists': null});
  } else {
    mongo.getUserViaUsername(req.body.username, function(error, response) {
    	res.send({ 'exists' : response });
    });
  }
});

module.exports = router;