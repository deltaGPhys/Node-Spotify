var express = require('express');
var requestTest = require("../../public/javascripts/spotifyController").requestTest;
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  var jimmy = 2;
  res.send('respond with a ', jimmy);
});

module.exports = router;
