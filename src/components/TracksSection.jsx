import React from "react";

export const TracksSection = ({ trackElement }) => {
  console.log(trackElement);
  return (
    <div>
      <h2>{trackElement.title}</h2>
      <span>{trackElement.album.title}</span>
      <span>{trackElement.artist.name}</span>

      <audio controls>
        <source src={trackElement.preview} type="audio/mpeg" />
      </audio>
    </div>
  );
};
