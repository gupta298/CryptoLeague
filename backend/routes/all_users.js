var express = require('express');
var router = express.Router();

const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

/**
 * @api {POST} /all_users/:page Request the User information for the leader board
 * @apiName Get_All_Users
 * @apiGroup User
 *
 * @apiParam {Number} Page Page number of the list.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} User[] Returns an array of user object for a particular page.
*/
router.post('/', (req, res) => {
    console.log("userid: " + req.user.id);
    var page = 1;
    if (req.body.page) {
      page = req.body.page;
    }

    var start = (page - 1) * 25;

    mongo.getAllUsers(start, function(error, response) {
      if (error) {
        res.send(400, { "message" : error });
      } else {
        res.send(response);
      }
    });
  }
);

module.exports = router;