import React from "react";

export const FooterControlSong = ({ track, previewUrl }) => {
  // console.log(previewUrl);

  return (
    <section className="controlSongContainer">
      <figure className="figureSongContainer">
        <img
          src={track.items[0].album.images[2].url}
          alt={track.items[0].album.name}
          title={track.items[0].album.name}
        />

        <div>
          <figcaption>{track.items[0].album.name}</figcaption>

          {track.items[0].album.artists.map((artist, index) => (
            <span key={index}>{artist.name}</span>
          ))}
        </div>
      </figure>

      <audio controls>
        <source src={previewUrl} type="audio/mpeg" />
      </audio>
    </section>
  );
};
