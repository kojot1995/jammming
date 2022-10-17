const clientId = 'fbba2162e14f49378508798caa13dbd7';
// const redirectURI = 'http://localhost:3000/';
const redirectURI = 'https://surge_jammming_project.surge.sh/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    async search(term) { 
        accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            { 
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    async savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }
        
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        // make a GET request that returns the Spotify username
        const response1 = await fetch('https://api.spotify.com/v1/me', {headers: headers});
        // convert the response to JSON format
        const jsonResponse1 = await response1.json();
        userId = jsonResponse1.id;

        // make a POST request that creates a new playlist in user's account
        const response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
        });
        // convert the response to JSON format
        const jsonResponse2 = await response2.json();
        const playlistId = jsonResponse2.id;

        // make a POST request that adds tracks to a playlist
        const response3 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
        })
    }
}

export default Spotify;
