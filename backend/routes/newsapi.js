
var fetch = require('isomorphic-fetch');
var Request = require('request');
var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
var key = config.newsapikey;
var url = 'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=' + key;

router.get('/', function(req, res) {
 var req = new Request(url);
 //res.send(req.json());
  fetch(req)
      .then(function(response) {
          //console.log(response.json());
          res.send(response.json());
      });

  });

module.exports = router;
