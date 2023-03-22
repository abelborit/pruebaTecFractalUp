import React from "react";
import foxLogo from "../assets/foxbel-music.png";

export const AsideInfo = () => {
  return (
    <aside className="aside">
      <img src={foxLogo} alt="logo" />

      <div className="sectionContainer">
        <section className="sectionContent">
          <h3>Mi Librería</h3>
          <ul>
            <li className="select">Recientes</li>
            <li>Artistas</li>
            <li>Álbumes</li>
            <li>Canciones</li>
            <li>Estaciones</li>
          </ul>
        </section>

        <section className="sectionContent">
          <h3>Playlist</h3>
          <ul>
            <li>Metal</li>
            <li>Para bailar</li>
            <li>Rock 9s</li>
            <li>Baldas</li>
          </ul>
        </section>
      </div>
    </aside>
  );
};
