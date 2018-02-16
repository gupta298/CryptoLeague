var express = require('express');
var router = express.Router();
var newsResponse = require('../news.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.render('news');
});


var response = newsResponse.jResponse;
router.get('/apinews', function(req, res){
  newsResponse.jResponse(function(response){
    res.send(response);
  });
});

module.exports = router;
