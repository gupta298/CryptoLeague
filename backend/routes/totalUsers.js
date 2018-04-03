var express = require('express');
var router = express.Router();

const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {GET} /total_users Request to get the total number of users
 * @apiName Get_Total_Number_Of_Users
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} Number Returns the total number of users in the database.
*/
router.get('/', (req, res) => {
    mongo.getTotalUsers(function(error, response) {
    	if (error) {
    		res.send(400, {"message" : error});
    	} else {
    		res.send(response);
    	}
    });
  }
);

module.exports = router;