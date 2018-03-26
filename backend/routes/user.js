var express = require('express');
var router = express.Router();
require('../config/passport');

const config = require('../config/config');
const passport = require('passport');
const mongo = require('../utils/mongoDBCalls');

var token = require('../utils/token');

/**
 * @api {GET} /user Request the user information
 * @apiName Get_User_Information
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.get('/',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    mongo.getUserViaID(req.user._id, function(error, result) {
      if (error) {
        res.send(null);
      } else {
        res.send({ 'jwt' : token.generateAccessToken(result) });
      }
    });
  }
);

/**
 * @api {PUT} /user Request to update the user's information
 * @apiName Update_User_Information
 * @apiGroup User
 *
 * @apiParam {User_Object} User User object with updated information.
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.put('/',
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    mongo.getUserViaID(req.user._id, function(error, result) {
      if (error) {
        res.send("User does not exists");
      } else {
        if (req.body.email) result.email = req.body.email;
        if (req.body.profilePicture) result.profilePicture = req.body.profilePicture;

        if (req.body.username) {
          mongo.getUserViaUsername(req.body.username, function(error, response) {
            if (!response) {
              result.username = req.body.username;
            }

            mongo.updateUser(result, function(error, token) {
              if (error) {
                res.send("Could not update user");
              } else {
                res.send({ 'jwt' : token });
              }
            });

          });
        } else {
          mongo.updateUser(result, function(error, token) {
            if (error) {
              res.send("Could not update user");
            } else {
              res.send({ 'jwt' : token });
            }
          });
        }
      }
    });
  }
);

/**
 * @api {GET} /user/null_out Request the null out the current league
 * @apiName Get_And_Update_User_Information
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.get('/null_out', passport.authenticate(['jwt'], { session: false }), (req, res) => {
  //console.log(req.user.currentLeague_id);
  if (req.user.currentLeague_id) {
    mongo.getLeague(req.user.currentLeague_id, req.user._id, function(error, response) {
      console.log('chala');
      console.log(req.user.currentLeague_id);
        if(response.status == 4) {
          req.user.past_leagues.push(req.user.currentLeague_id);
          req.user.currentLeague_id = null;
          mongo.updateUserLeague(req.user, function(error, result) {
          if(error) console.log(error);
          console.log('User is no longer in a league');
          res.send({'jwt' : token.generateAccessToken(req.user)});
          });
        } else {
          res.send({'message' : "League has not ended yet"});
        }
      });
  } else {
    res.send({'message' : "Not a league"});
    return;
  }
});
// router.get('/null_out',
//   passport.authenticate(['jwt'], { session: false }),
//   (req, res) => {
//     // Follow the below logic please:
//       // 1. check if the user is in a league and the league has ended
      
//       // if (req.user.currentLeague_id) {
//     	// 	mongo.getPortfolio(req.user.currentLeague_id, req.user._id, req.user._id, function(error, response) {
//     	//       res.send(response);
//       //       if(req.user.currentLeague_id){
//       //
//       //       }
//     	//     });
//     	// } else {
//     	// 	res.send({'message' : "Not in a league"})
//     	// }


//       // 2. Add the current league in the past leagues array
//       // 3. Null out the current league
//       // 4. update the user object in the database
//       // 5. return the updated jwt token
//   }
// );

module.exports = router;
