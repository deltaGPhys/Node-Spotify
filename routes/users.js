var express = require('express');
var userUtils = require("../public/javascripts/spotifyController");
var router = express.Router();

/* GET users listing. */
router.get('users/', function(req, res, next) {

  console.log('after');
  var result;
  var client = userUtils.getSpotifyClient().then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get the most popular tracks by David Bowie in Great Britain
    return spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB');
  })

  console.log(result);
  console.log(typeof result);
});

module.exports = router;
