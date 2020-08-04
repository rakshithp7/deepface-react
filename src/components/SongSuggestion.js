import React, { Component } from "react";
var SpotifyWebApi = require("spotify-web-api-node");

class SongSuggestion extends Component {
  state = {
    playlists: [],
    track: null,
  };

  connectToSpotify = () => {
    const { emotion } = this.props;

    var spotifyApi = new SpotifyWebApi();
    let randomPlaylist;

    spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

    // Get Elvis' albums
    spotifyApi.searchPlaylists(emotion).then(
      function (data) {
        var randomIndex = Math.floor(Math.random() * 20);
        randomPlaylist = data.body.playlists.items[randomIndex];

        console.log(randomPlaylist);
      },
      function (err) {
        console.error(err);
      }
    );

    if (typeof randomPlaylist != "undefined") {
      return <p>Name: {randomPlaylist.name}</p>;
    }
  };

  render() {
    return (
      <div>
        <h4>Song Suggestions here</h4>
        {this.props.emotion != null ? (
          this.connectToSpotify()
        ) : (
          <p>Suggestions will be shown after analyzing the image</p>
        )}
      </div>
    );
  }
}

export default SongSuggestion;
