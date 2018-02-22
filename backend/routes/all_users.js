var express = require('express');
var router = express.Router();
var config = require('../config/config');
var mongo = require('../utils/mongoDBCalls');

router.post('/', (req, res) => {
    console.log("userid: " + req.user.id);
    var page = 1;
    if (req.body.page) {
      page = req.body.page;
    }

    var start = (page - 1) * 25;

    mongo.getAllUsers(start, function(error, response) {
      res.send(response);
    });
  }
);

module.exports = router;