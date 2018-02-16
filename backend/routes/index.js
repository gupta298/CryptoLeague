var express = require('express');
var router = express.Router();
var newsResponse = require('../news.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var response = newsResponse.jResponse;
router.get('/apinews', function(req, res){
  res.send(response);
});

module.exports = router;
