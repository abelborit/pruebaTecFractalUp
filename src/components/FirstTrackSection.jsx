import React from "react";

export const FirstTrackSection = ({
  trackElement,
  setSongSelectName,
  setPlayingTrack,
}) => {
  console.log(trackElement);

  const handleSongSelect = (e) => {
    // console.log(e.target.innerHTML);
    // console.log(e.target.getAttribute("uri"));

    setSongSelectName(e.target.innerHTML);
    setPlayingTrack(e.target.getAttribute("uri"));
  };

  return (
    <div className="firstTrackContainer">
      <div className="trackCardPhoto">
        <figure>
          <img
            src={trackElement.album.images[1].url}
            alt={trackElement.album.name}
            title={trackElement.album.name}
          />
        </figure>
      </div>

      <div className="trackCard">
        <div>
          <h3 onClick={handleSongSelect} uri={trackElement.uri}>
            {trackElement.name}
          </h3>
          <span>Álbum: {trackElement.album.name}</span>
          <p>Fecha de lanzamiento: {trackElement.album.release_date}</p>
          <p>Canciones {trackElement.album.total_tracks}</p>

          {trackElement.artists.map((artist) => (
            <p>Lo mejor de {artist.name}</p>
          ))}
        </div>

        <audio controls>
          <source src={trackElement.preview_url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};
