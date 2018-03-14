var mongoose = require('mongoose');

var leagueSchema = new mongoose.Schema({
    league_type: String,
    status: String,
    portfolio_ids: [{ user_id: String, portfolio_id: String}],
    start_time: Date,
    current_market_coin: [String]
});

var League = mongoose.model('League', leagueSchema);
module.exports = League;