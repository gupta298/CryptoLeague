
var fetch = require('isomorphic-fetch');
var Request = require('request');
var request = require('request');
var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
var key = config.newsapikey;
var url = 'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=' + key;

router.get('/', function(req, res) {
 var req = new Request(url);
 //res.send(req.json());
  res.send(callNewsOrgAPI());
  });

module.exports = router;

function callNewsOrgAPI() {
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error) {
          var data = JSON.parse(JSON.stringify(body));
          var tempNews = [];
          var counter = 0;
          while(counter < 16)
          {
              tempNews.push(response.body.articles[counter]);
              console.log(response.body.articles[counter]);
              counter++;
          }
          return 'Success';
      } else {
        console.log("Error updating the news data");
      }

  });
};

setInterval( function() {
  callNewsOrgAPI();
}, 150000);
