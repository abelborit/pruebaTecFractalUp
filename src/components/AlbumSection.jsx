import React from "react";

export const AlbumSection = ({ albumElement }) => {
  // console.log(albumElement);
  return (
    <div>
      <figure>
        <img
          src={albumElement.cover_medium}
          alt={albumElement.title}
          title={albumElement.title}
        />
        <figcaption>{albumElement.title}</figcaption>
      </figure>

      <span>{albumElement.artist.name}</span>
    </div>
  );
};
