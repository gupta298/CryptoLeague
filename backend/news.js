var fetch = require( "isomorphic-fetch");
var Request = require('request');


var config = require('./config/config.js');
var key = config.newsapi.API_KEY;
var url = 'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&' + 'apiKey=' + key;
var req = new Request(url);
var jResponse = [];

function newsFunc(){
    fetch(req)
    .then(function(response) {
        jResponse = response;
        //console.log(response.json());
        console.log(response.status());
    });
  };
exports.jResponse = jResponse;

//console.log(response.status())
