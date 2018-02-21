var express = require('express');
var router = express.Router();
var config = require('../config/config');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var mongodbUrl = config.mongoDBHost;

router.post('/', (req, res) => {
    console.log(req.user.id);
    var page = 1;
    if (req.body.page) {
      page = req.body.page;
    }

    var start = (page - 1) * 25;
    //res.send('Secure response from ' + JSON.stringify(req.user));
    MongoClient.connect(mongodbUrl, function (err, db) {
    if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("Users").find({}).sort( { tokens: -1 } ).limit(25).skip(start).toArray(function(err, result) {
        if (err) throw err;

        if (result != null) {
          res.send(JSON.stringify(result));
        } else  {
          res.send(null);
        }

        db.close();
      });
    });
  }
);

module.exports = router;