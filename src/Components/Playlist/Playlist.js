import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../TrackList/TrackList";

function Playlist(props) {
  function handleNameChange({ target }) {
    props.onNameChange(target.value);
  }

  return (
    <div className={styles.Playlist}>
      <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet" />
      
      <div className={styles["input-container"]}>
        <input 
          placeholder="My Playlist"
          onChange={handleNameChange}
        />
        <i className="fa fa-edit"></i>
      </div>

      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />

      <button 
        className={styles["Playlist-save"]}
        onClick={props.onSave}
      >Save Playlist</button>

      <a className={styles["Open-spotify"]} href="https://open.spotify.com/" target="_blank" rel="noreferrer">Open
        <img className={styles.icon} src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify"/>
        {/* <button className={styles["Open-spotify"]}>Open Spotify</button> */}
      </a>
    </div>
  );
}

export default Playlist;