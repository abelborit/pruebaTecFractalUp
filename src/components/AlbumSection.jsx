import React from "react";
import { Link } from "react-router-dom";

export const AlbumSection = ({ albumElement }) => {
  // console.log(albumElement);

  return (
    <div>
      <Link to={`/album/${albumElement.id}/${albumElement.name}`}>
        <figure>
          <img
            src={albumElement.images[1].url}
            alt={albumElement.name}
            title={albumElement.name}
          />
          <figcaption>{albumElement.name}</figcaption>
        </figure>
      </Link>

      {albumElement.artists.map((artist) => (
        <p>{artist.name}</p>
      ))}
    </div>
  );
};
