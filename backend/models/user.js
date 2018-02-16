var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    email: String,
    firstname: String,
    lastname: String,
    tokens: Number,
    profilePicture: String,
    currentLeague_id: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;