var express = require('express');
var router = express.Router();
const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {GET} /user_rank Request the current User's rank
 * @apiName Get_User_Rank
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} Rank Returns the rank of the user.
*/
router.get('/', (req, res) => {
    mongo.getUserRank(req.user._id, function(error, response) {
      res.send(response);
    });
  }
);

module.exports = router;