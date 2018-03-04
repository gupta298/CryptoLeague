var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
    portfolio_id: String,
    caption_coin: String,
    holdings: [String]
});

var Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;