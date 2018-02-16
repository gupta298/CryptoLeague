var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: Number,
    email: String,
    jwtToken: String,
    firstname: String,
    lastname: String,
    facebook_token: String,
    token: Number,
    profilePicture: String,
    currentLeague_id: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;


// db.createCollection("Users", { autoIndexId : true} )
// { id: Number,
//     email: String,
//     jwtToken: String,
//     firstname: String,
//     lastname: String,
//     facebook_token: String,
//     token: Number,
//     profilePicture: String,
//     currentLeague_id: Number
// }