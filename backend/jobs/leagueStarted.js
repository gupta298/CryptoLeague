var express = require('express');
const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

// module.exports = function(leagueObject) {
// 	console.log("CRON JOB EXECUTED BITCHEZ!!!");
// 	console.log(leagueObject);
// 	mongo.getLeagueTypes((err, res) => {
// 		console.log(res);
// 		console.log(err);
// 	})
// 	//mongo.startLeague(leagueObject.league_id);
// }

function doThis(leagueObject) {
	console.log("CRON JOB EXECUTED BITCHEZ!!!");
	console.log(leagueObject);
	mongo.getLeagueTypes(function(err, res) {
		console.log(res);
		console.log(err);
	});
}

module.exports = {
  doThis: doThis
}