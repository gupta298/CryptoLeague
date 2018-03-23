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
    past_leagues: [String]
});

var User = mongoose.model('User', userSchema);
module.exports = User;