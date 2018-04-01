var express = require('express');
var router = express.Router();

const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {GET} /league_types Request to get all league types
 * @apiName Get_League_Types
 * @apiGroup League
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} League_Types Returns all available league types.
*/
router.get('/', function(req, res, next) {
    mongo.getLeagueTypes(function(error, response) {
    	if (error) {
    		res.send(400, {'message': error});
    	} else {
    		res.send(response);
    	}
    });
});

module.exports = router;