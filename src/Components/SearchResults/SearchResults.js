import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../TrackList/TrackList";

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
          <h2>Search Results</h2>
        
          <Tracklist 
            userSearchResults={props.userSearchResults}
            onAdd={props.onAdd}
            isRemoval={false}
          />
      </div>
        );
}

export default SearchResults;