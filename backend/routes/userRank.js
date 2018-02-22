var express = require('express');
var router = express.Router();
var config = require('../config/config');
var mongo = require('../utils/mongoDBCalls');

router.post('/', (req, res) => {
    console.log("userid: " + req.user.id);
    mongo.getUserRank(req.user._id, function(error, response) {
      res.send(response);
    });
  }
);

module.exports = router;