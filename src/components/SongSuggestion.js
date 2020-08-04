import React, { useState } from "react";
var SpotifyWebApi = require("spotify-web-api-node");

const SongSuggestion = (props) => {
  const [playlists, updatePlaylists] = useState([]);

  async function connectToSpotify() {
    const { emotion } = props;
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

    await spotifyApi.searchPlaylists(emotion).then(
      function (data) {
        var randomIndex = Math.floor(Math.random() * 20);
        const randomPlaylist = data.body.playlists.items[randomIndex];

        updatePlaylists(randomPlaylist || []);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  return (
    <div>
      <h4>Song Suggestions here</h4>
      {props.emotion != null ? (
        <div>
          <button
            style={{
              marginBottom: "10px",
            }}
            className="btn btn-primary"
            onClick={() => connectToSpotify()}
          >
            Click Me
          </button>
          <br />
          {Object.keys(playlists).length !== 0 ? (
            <div>
              <p>Emotion: {props.emotion}</p>
              <img
                style={{
                  maxHeight: "400px",
                  maxWidth: "400px",
                }}
                src={playlists.images[0].url}
                alt=""
              />
              <p>Name: {playlists.name}</p>
              <a
                href={playlists.external_urls.spotify}
                rel="noreferrer"
                target="_blank"
              >
                Open in Spotify
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p>Suggestions will be shown after analyzing the image</p>
      )}
    </div>
  );
};

export default SongSuggestion;
