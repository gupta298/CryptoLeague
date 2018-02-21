var fetch = require('isomorphic-fetch');
var Request = require('request');
var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
var key = config.newsapikey;
var url = 'https://newsapi.org/v2/everything?language=en&q=cryptocurrency&sortBy=publishedAt&apiKey=' + key;

var tempNews = [];

router.get('/', function(req, res, next) {
 var req = new Request(url);
 //res.send(req.json());
  //res.send(callNewsOrgAPI());
  if(tempNews.length < 1){
    callNewsOrgAPI(res);
  } else {
    res.send(JSON.stringify(tempNews));
  }
});

function callNewsOrgAPI(res) {
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error) {
          var data = JSON.parse(JSON.stringify(body));
          tempNews = [];
          var counter = 0;
          while(counter < 16)
          {
              tempNews.push(response.body.articles[counter]);
              //console.log(response.body.articles[counter]);
              counter++;
          }
          if(res)
            res.send(JSON.stringify(tempNews));
      } else {
        console.log("Error updating the news data");
        if(res)
          res.send("Error updating the news data");
      }

  });
};

setInterval( function() {
  callNewsOrgAPI(null);
}, 150000);

module.exports = router;
