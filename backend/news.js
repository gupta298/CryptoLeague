var fetch = require( "isomorphic-fetch");
var Request = require('request');


var config = require('./config/config.js');
var key = config.newsapikey;
var url = "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=" + key;
var req = new Request(url);
var jResponse = [];

function newsFunc(callback){
    fetch(req)
    .then(callback/*function(response) {
        jResponse = response;
        //console.log(response.json());
        console.log(response.status());
    }*/);
  };
exports.jResponse = newsFunc;

//console.log(response.status())
