const config = require('../config/config');
const mongo = require('../utils/mongoDBCalls');

module.exports = function(leagueObject) {
	console.log("CRON JOB EXECUTED BITCHEZ!!!");
	console.log(leagueObject);
}