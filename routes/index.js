var express = require('express');
var router = express.Router();

//Import the Spotify API
var Spotify = require('node-spotify-api');

//Import our Keys File
var keys = require('./keys');

//Create a Spotify Client
var spotify = new Spotify(keys.spotifyKeys);

//Store the results of a request to spotify
var results = [];

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Spotify', results: results});
});

/* GET home page. */
router.post('/tracks', function (req, res) {
    var query = req.body.artist;
    var artist = req.body.artistName;

    results = [];
    spotify.request('https://api.spotify.com/v1/artists/'+query+'/top-tracks?country=US')
        .then(function(spotRes) {

            //Store the artist, song, preview link, and album in the results array
            spotRes.tracks.forEach(function(ea){
                results.push({
                    song: ea.name,
                    trackId: ea.id,
                    album: ea.album.name});
            });
            //Render the homepage and return results to the view
            res.render('tracks', {artist: artist, results: results});
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err);
        });
});

router.post('/namecheck', function (req, res) {
    //Get the query from the user
    var query = req.body.partial;

    //Clear out old results
    results = [];

    //Make a request to Spotify
    spotify.search({type: "artist", query: query})
        .then(function (spotRes) {
            //Store the artist, song, preview link, and album in the results array

            var artist = spotRes.artists.items[0].name;
            var artistId = spotRes.artists.items[0].id;
            var albumArt = spotRes.artists.items[0].images[0].url;

            spotify.search({type: "track", query: "artist:"+artist})
                .then(function (spotRes) {

                    var topTrack = spotRes.tracks.items[0].name;
                    var topTrackID = spotRes.tracks.items[0].id;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ topArtist: artist, artistId: artistId, albumArt: albumArt, topTrack: topTrack, topTrackID: topTrackID }));

                })
                .catch(function (err) {
                console.log(err);
                res.end(JSON.stringify({ topArtist: artist, artistId: artistId, albumArt: albumArt, topTrack: null, topTrackID: null }));
            });

        })
        .catch(function (err) {
            console.log(err);
            res.end(JSON.stringify({ topArtist: null, artistId: null, albumArt: null, topTrack: null, topTrackID: null }));
        });
});


module.exports = router;