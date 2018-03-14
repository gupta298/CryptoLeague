var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

var router = express.Router();

const config = require('../config/config');
const coinMarketAPI = config.coinMarketAPI;
const chasing_coins = config.chasing_coins;

var coinData = [];
var coinNames = [];

/**
 * @api {GET} /market Request the market data
 * @apiName Market
 * @apiGroup Market
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} Coin_Data Returns an array of the top 100 coins based on the chasing_coin.
*/
router.get('/', function(req, res, next) {
 	console.log(req.user.id);
    res.send(JSON.parse(JSON.stringify(coinData)));
});

// Gets the coin names
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

// Helps build the coin data object
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

// helps get the coin names
getCoinNames(function(callback) {
  buildCoinData(function(callback) {
      console.log('Got the coin data!');
  });
});

// Helps update coin data every 5 mins
setInterval( function() {
  buildCoinData(function(callback) {
    console.log("Updated the coin data");
  });
  // callCoinMarketAPI();
}, 300000);

//Gets Json from a url
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