var mongoose = require('mongoose');

var leagueSchema = new mongoose.Schema({
	league_id: String,
    league_type: String,
    league_buy_in: Number,
    status: String,
    portfolio_ids: [{ 
    	"username": String,
        "tokens": Number,
        "profilePicture": String,
        "user_id": String,
        "portfolio_id" : String,
        "portfolio_value" : Number
    }],
    start_time: Date,
    current_market_coin: [String]
});

var League = mongoose.model('League', leagueSchema);
module.exports = League;