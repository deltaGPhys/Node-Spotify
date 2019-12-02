module.exports = {
    getSpotifyClient: function () {
        var SpotifyWebApi = require('spotify-web-api-node');

        return new SpotifyWebApi({
            clientId: "787fe734ba184da08b4c78ff6504c965",
            clientSecret: "79051fe89b2a479bbff0f494300b3e9b"
        });
    },

    requestTest: function () {
        var SpotifyWebApi = require('spotify-web-api-node');

        var spotifyApi = new SpotifyWebApi();
        spotifyApi
            .then(function(data) {
                // Set the access token on the API object so that it's used in all future requests
                spotifyApi.setAccessToken(data.body['access_token']);

                // Get the most popular tracks by David Bowie in Great Britain
                console.log(spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB'));
            });

    }
}