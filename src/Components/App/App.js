import React, { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Artist Name 1",
      album: "Example Album Name 1",
      id: 1,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const inPlaylistAlready = playlistTracks.find((currentTracks) => currentTracks.id === track.id);
    const notInPlaylist = playlistTracks.concat(track);
    (inPlaylistAlready) ? alert("This Track is already in your Playlist") : setPlaylistTracks(notInPlaylist);
    // if (inPlaylistAlready) {
    //   alert("Track Already in Playlist");
    // } else {
    //   setPlaylistTracks(notInPlaylist);
    // }
  }

  function removeTrack(track) {
    const deleteFromPlaylist = playlistTracks.filter((currentTracks) => currentTracks.id !== track.id);
    setPlaylistTracks(deleteFromPlaylist);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  return (
      <div>
      <h1>
        Soundz<span className={styles.highlight}>Sculpt</span>
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar
          onSearch={search}l
        />
        
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
            userSearchResults={searchResults}
            onAdd={addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
      );
}

export default App;
