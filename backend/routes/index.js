var express = require('express');
var router = express.Router();

/**
 * @api {GET} / Get the index file
 * @apiName Index
 * @apiGroup Index
 *
 * @apiSuccess {Redirect} Index_File Redirects the user to the Index file.
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.render('news');
  res.render('leagueTypes');
});

module.exports = router;