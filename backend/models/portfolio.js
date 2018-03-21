var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
    caption_coin: String,
    holdings: [{
    	'coin_symbol' : String,
    	'percentage' : Number
    }]
});

var Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;