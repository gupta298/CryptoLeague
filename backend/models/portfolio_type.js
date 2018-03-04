var mongoose = require('mongoose');

var portfolioTypeSchema = new mongoose.Schema({
    portfolio_type_id: String,
    buy_in: Number,
    title: String,
    photo: String
});

var Portfolio_Type = mongoose.model('Portfolio_Type', portfolioTypeSchema);
module.exports = Portfolio_Type;