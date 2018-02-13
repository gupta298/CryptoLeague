var passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var _ = require("lodash");

var config = require('./config')

//TODO: REMOVE THIS!
var usersArr = [
  {
    id: "1",
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: "2",
    name: 'test',
    password: 'test'
  },
  {
  	id: "1964124173601256",
  	name: 'Nisarg Kolhe'
  }
];

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;
jwtOptions.issuer = config.JWT_ISSUER;
jwtOptions.audience = config.JWT_AUDIENCE;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = usersArr[_.findIndex(usersArr, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

/*  FACEBOOK AUTH  */
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = config.facebook.CLIENT_ID;
const FACEBOOK_APP_SECRET = config.facebook.CLIENT_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  		let user = usersArr[_.findIndex(usersArr, {id: profile.id})]; //Getting user from db
	  	
	  	if(!user){ //No user in db, add one
	  		user = {
	  			id: profile.id,
    			name: profile.displayName
   	  		};
	  	}
      return cb(null, user);
  }
));
