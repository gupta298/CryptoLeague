var express = require('express');
var router = express.Router();
var config = require('../config/config');
var mongo = require('../utils/mongoDBCalls');

var leagues = ["Bronze League", "Silver League", "Gold League", "Platinum League"];


router.get('/', function(req, res, next) {
    res.send(JSON.parse(JSON.stringify(leagues)));
});

module.exports = router;
