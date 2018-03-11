var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

var router = express.Router();

var config = require('../config/config');

var coinData = [];

router.get('/', function(req, res, next) {
 	console.log(req.user.id);
    res.send(JSON.parse(JSON.stringify(coinData)));
});

var coinMarketAPI = config.coinMarketAPI;
var coinNames = [];
function getCoinNames(callback) {
  getJsonFromUrl(coinMarketAPI, function(result) {
    var data = JSON.parse(JSON.stringify(result));
    var finalResult = new Array();

    asyncLoop(data, function (item, next) {
      var currentSymbol = item.symbol;
      var name = item.name;
      finalResult[currentSymbol] = name;
      next();
    }, function () {
      coinNames = finalResult;
      callback("Success");
    });

  });
}

var chasing_coins = config.chasing_coins;
function buildCoinData(callback) {
  getJsonFromUrl(chasing_coins.MarketCap, function(marketResult) {
    var market = JSON.parse(JSON.stringify(marketResult));
    
    getJsonFromUrl(chasing_coins.Top100Coins, function(coinsResult) {

      if(!coinsResult)
        return;

      var result = [];
      var coins = JSON.parse(JSON.stringify(coinsResult));
      
      asyncLoop(coins, function (item, next) {
        // console.log(item);
        getJsonFromUrl(chasing_coins.HighLowOfCoin + item.value.symbol, function(coinsResultHighLow) {
          coins[item.key].HighLowOfCoin = coinsResultHighLow;

          getJsonFromUrl(chasing_coins.HighLowOfLast24Hours + item.value.symbol, function(coinsResultHighLowOf24Hours) {
            coins[item.key].HighLowOfLast24Hours = coinsResultHighLowOf24Hours;
            coins[item.key].image = chasing_coins.CoinImage + item.value.symbol;
            // console.log(names[item.value.symbol]);
            if (!coinNames[item.value.symbol]) {
              // console.log(item.value.symbol);
              coins[item.key].name = "Not Found";
            } else {
              coins[item.key].name = coinNames[item.value.symbol];
            }
            // console.log(coins[item.key].name);
            result.push(coins[item.key]);
            next();
          });
        });
      }, function () {
        coinData = [];
        coinData = result;
        callback("Success");
      });
    });
  });
}

getCoinNames(function(callback) {
  buildCoinData(function(callback) {
      console.log('Got the coin data!');
  });
});

// callCoinMarketAPI();
setInterval( function() {
  buildCoinData(function(callback) {
    console.log("Updated the coin data");
  });
  // callCoinMarketAPI();
}, 300000);

function getJsonFromUrl(url, callback) {
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var result = JSON.parse(JSON.stringify(body));
          //console.log(body);
        callback(result);
      } else {
        callback(null);
      }
  });
}

module.exports = router;