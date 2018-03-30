var express = require('express');
var request = require('request');
var asyncLoop = require('node-async-loop');

var router = express.Router();

const config = require('../config/config');
const coinMarketAPI = config.coinMarketAPI;
const chasing_coins = config.chasing_coins;

var coinData = require('../utils/sample_coin_data');
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
router.get('/market/', function(req, res, next) {
  if (coinData.lenght <= 0) {
    res.send(400, {'message': "Error retrieving the data!"});
  } else {
    res.send(JSON.parse(JSON.stringify(coinData)));
  }
});

// Gets the coin names
function getCoinNames(callback) {
  getJsonFromUrl(coinMarketAPI, function(result) {
    if (!result) {
      callback("Error retrieving the names of the coin data for the market route", null);
    } else {
      var data = JSON.parse(JSON.stringify(result));
      var finalResult = new Array();

      asyncLoop(data, function (item, next) {
        var currentSymbol = item.symbol;
        var name = item.name;
        finalResult[currentSymbol] = name;
        next();
      }, function () {
        coinNames = finalResult;
        callback(null, "Success");
      });
    }
  });
}

// Get top 3 coins
function top3Coins(callback) {
  if (coinData[0].symbol !== undefined &&  coinData[1].symbol !== undefined && coinData[2].symbol !== undefined) {
    var object = {'1' : coinData[0].symbol, '2' : coinData[1].symbol, '3' : coinData[2].symbol};
    callback(null, object);
  } else {
    callback("Error making the sample portfolio!", null);
  }
}

// Get just coin prices
function getCurrentCoinPricesMap() {
  var coinPrices = {};

  for(coin of coinData){
    coinPrices[coin.symbol] = coin.price;
  }

  if (JSON.stringify(coinPrices) === '{}') {
    return "Error retrieving the coin prices";
  }

  return coinPrices;
}

//Make array of just the coin tickers
function getCoinTickers(){
  var coinTickers = [];

  for(coin of coinData){
    coinTickers.push(coin.symbol);
  }

  if (coinTickers.lenght <= 0) {
    return "Error retrieving the coin symbols";
  }

  return coinTickers;
}


// Helps build the coin data object
function buildCoinData(callback) {
  getJsonFromUrl(chasing_coins.Top100Coins, function(coinsResult) {
    if(!coinsResult) {
      callback("Error getting the top 100 coin data!", null);
      return;
    }

    var result = [];
    var coins = JSON.parse(JSON.stringify(coinsResult));

    asyncLoop(coins, function (item, next) {
      getJsonFromUrl(chasing_coins.HighLowOfCoin + item.value.symbol, function(coinsResultHighLow) {
        if (!coinsResultHighLow) {
          callback("Error getting the coin's market high and low data", null);
          return;
        }

        coins[item.key].HighLowOfCoin = coinsResultHighLow;

        getJsonFromUrl(chasing_coins.HighLowOfLast24Hours + item.value.symbol, function(coinsResultHighLowOf24Hours) {
          if (!coinsResultHighLowOf24Hours) {
            callback("Error getting the coin's market high and low data of the last 24 hours", null);
            return;
          }

          coins[item.key].HighLowOfLast24Hours = coinsResultHighLowOf24Hours;
          coins[item.key].image = chasing_coins.CoinImage + item.value.symbol;

          if (!coinNames[item.value.symbol]) {
            coins[item.key].name = "Not Found";
          } else {
            coins[item.key].name = coinNames[item.value.symbol];
          }

          result.push(coins[item.key]);
          next();
        });
      });
    }, function () {
      if (result.lenght <= 0) {
        callback("Error getting the coin data!", null);
      } else {
        coinData = [];
        coinData = result;
        callback(null, "Success");
      }
    });
  });
}

// helps get the coin names
getCoinNames(function(err, result) {
  if (!err) {
    console.log("Got coin names");
    buildCoinData(function(error, result_build_coin) {
      if (!error) {
        console.log('Got the coin data!');
      } else {
        console.log(error);
      }
    });
  } else {
    console.log(err);
  }
});

// Helps update coin data every 5 mins
setInterval( function() {
  buildCoinData(function(error, result_build_coin) {
    if (!error)
      console.log("Updated the coin data");
    else
      console.log(error);
  });
}, 300000);

//Gets Json from a url
function getJsonFromUrl(url, callback) {
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var result = JSON.parse(JSON.stringify(body));
        callback(result);
      } else {
        callback(null);
      }
  });
}

module.exports = {
  router : router,
  top3Coins : top3Coins,
  getCurrentCoinPricesMap: getCurrentCoinPricesMap,
  getCoinTickers: getCoinTickers
}
