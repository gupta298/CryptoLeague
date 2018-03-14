var express = require('express');
var router = express.Router();
var config = require('../config/config');
var mongo = require('../utils/mongoDBCalls');

router.get('/', (req, res) => {
    console.log("userid: " + req.user.id);
    mongo.getLeague(function(error, response) {
      res.send(response);
    });
  }
);

router.post('/', (req, res) => {

});

module.exports = router;