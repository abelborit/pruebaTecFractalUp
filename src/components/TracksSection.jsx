import React, { useState } from "react";
import { SongPlayer } from "./SongPlayer";

export const TracksSection = ({
  trackElement,
  setSongSelectName,
  setPlayingTrack,
}) => {
  // console.log(trackElement);

  const handleSongSelect = (e) => {
    // console.log(e.target.innerHTML);
    // console.log(e.target.getAttribute("uri"));

    setSongSelectName(e.target.innerHTML);
    setPlayingTrack(e.target.getAttribute("uri"));
  };

  return (
    <div>
      <h2 onClick={handleSongSelect} uri={trackElement.uri}>
        {trackElement.name}
      </h2>
      <span>{trackElement.album.name}</span>

      {trackElement.artists.map((artist) => (
        <p>{artist.name}</p>
      ))}

      <audio controls>
        <source src={trackElement.preview_url} type="audio/mpeg" />
      </audio>
    </div>
  );
};
