import React from "react";

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
    <div className="trackCard">
      <div>
        <h3 onClick={handleSongSelect} uri={trackElement.uri}>
          {trackElement.name}
        </h3>
        <span>Álbum: {trackElement.album.name}</span>

        {trackElement.artists.map((artist) => (
          <p>Artista: {artist.name}</p>
        ))}
      </div>

      <audio controls>
        <source src={trackElement.preview_url} type="audio/mpeg" />
      </audio>
    </div>
  );
};
