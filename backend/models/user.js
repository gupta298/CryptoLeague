var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    email: String,
    firstname: String,
    lastname: String,
    username: String,
    tokens: Number,
    profilePicture: String,
    currentLeague_id: String,
    past_leagues: [
    	{
            league_type: String,
            league_id: String,
            user_payout: Number,
            user_rank: Number,
            portfolio_value: Number
        }
    ]
});

var User = mongoose.model('User', userSchema);
module.exports = User;