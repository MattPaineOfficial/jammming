let accessToken = "";

const clientID = "15f838ff16c6462cb6888c22e70a41fc";
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        // First check for the access token
        if (accessToken) {
            return accessToken;
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/); // Extracts access token from URL
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/); // Extracts expiry time from URL

        // Second check for the access token
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            const expiresIn = Number(urlExpiresIn[1]);

            // Setting the access token to expire at the value for expiration time
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            // Clearing the url after the access token expires
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }
    
        // Third check for the access token, if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse) {
              console.error("Response error");
            }
            return jsonResponse.tracks.items.map((track) => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
          });
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        }
        let userAccessToken = Spotify.getAccessToken();
        const header ={ Authorization: `Bearer ${userAccessToken}` };
        let userID = "";
        return fetch("https://api.spotify.com/v1/me", { headers: header })
            .then((response) => response.json())
            .then((jsonResponse) => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({name: name}),
                })
                .then((response) => response.json())
                .then(jsonResponse => {
                    let playlistID = jsonResponse.id;
                    return fetch(
                        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                        {
                            headers: header,
                            method: "POST",
                            body: JSON.stringify({ uris: trackURIs }),
                        }
                    );
                });
            });
    }
};

export { Spotify };