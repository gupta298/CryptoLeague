var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

var router = express.Router();

var config = require('../config/config');

// function Coin(name, price, ticker){
//   this.name = name;
//   this.price = price;
//   this.ticker = ticker;
// }

// var coinMarketAPI = config.coinMarketAPI;
var coinData = [];

router.get('/', function(req, res, next) {
 	console.log(req.user.id);
    res.send(JSON.stringify(coinData));
});

// function callCoinMarketAPI() {
//   request({
//       url: coinMarketAPI,
//       json: true
//   }, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//           var data = JSON.parse(JSON.stringify(body));
//           var tempCoinData = [];
//           for (var temp in data) {
//               // var tempCoin = new Coin (data[temp].name, data[temp].price_usd,data[temp].symbol);
//               // tempCoinData.push(tempCoin);
//               tempCoinData.push(data[temp]);
//           }
//           console.log("Updated coins");
//           coinData = [];
//           coinData = tempCoinData;
//           // console.log(JSON.stringify(coinData));
//       } else {
//         console.log("Error updating the coin data");
//       }
//   });
// }

var coinMarketAPI = config.coinMarketAPI;
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
      callback(finalResult);
    });

  });
}

var chasing_coins = config.chasing_coins;
function buildCoinData(callback) {
  getCoinNames(function(data) {

    getJsonFromUrl(chasing_coins.MarketCap, function(marketResult) {
      var market = JSON.parse(JSON.stringify(marketResult));
      
      getJsonFromUrl(chasing_coins.Top100Coins, function(coinsResult) {

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
              if (!data[item.value.symbol]) {
                // console.log(item.value.symbol);
                coins[item.key].name = "Not Found";
              } else {
                coins[item.key].name = data[item.value.symbol];
              }
              // console.log(coins[item.key].name);
              result.push(coins[item.key]);
              next();
            });
          });
        }, function () {
          coinData = [];
          coinData = result;
          console.log('Got the coin data!');
        });

      });

    });

  });
}

buildCoinData();

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