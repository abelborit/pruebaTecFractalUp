import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AlbumSection } from "../components/AlbumSection";
import { FormSearch } from "../components/FormSearch";
import { Loader } from "../components/Loader";
import { TracksSection } from "../components/TracksSection";
import { SongPlayer } from "../components/SongPlayer";

const initalState =
  JSON.parse(window.localStorage.getItem("searchParam")) || "adele";

export const MusicPage = () => {
  const [searchParam, setSearchParam] = useState(initalState);
  const [songSelectName, setSongSelectName] = useState();
  const [playingTrack, setPlayingTrack] = useState();

  const handleSearchParam = (inputValue) => {
    setSearchParam(inputValue);
  };

  const URL_ALBUM = `https://api.spotify.com/v1/search?q=${searchParam}&type=album`;
  const URL_TRACKS = `https://api.spotify.com/v1/search?q=${searchParam}&type=track`;

  const {
    useFetchData: fetchDataAlbum,
    useFetchError: fetchErrorAlbum,
    useFetchLoading: fetchLoadingAlbum,
  } = useFetch(URL_ALBUM);

  const {
    useFetchData: fetchDataTracks,
    useFetchError: fetchErrorTracks,
    useFetchLoading: fetchLoadingTracks,
  } = useFetch(URL_TRACKS);

  // console.log(fetchDataAlbum, "fetchDataAlbum");
  // console.log(fetchDataTracks, "fetchDataTracks");

  const accessToken =
    "BQB_Ilcxc55uo-ntWEbD2MwWNSQK0nunb7Dw90cluKhPeuSWysiAgfycGjUBkB6NvJe0N_iAIgfVLiOgJBi5_kBldUh66VWZeZGl5yAnERTogHYe8EDv";

  return (
    <main className="main">
      <FormSearch handleSearchParam={handleSearchParam} />

      {fetchLoadingAlbum && <Loader />}
      {fetchLoadingTracks && <Loader />}

      <div>
        <h3>Álbumes</h3>
        <section className="sectionAlbums">
          {!fetchLoadingAlbum &&
            fetchDataAlbum.albums.items.map((albumElement) => (
              <AlbumSection key={albumElement.id} albumElement={albumElement} />
            ))}
        </section>
      </div>

      <hr />

      <div>
        <h3>Canciones</h3>
        <section className="sectionTracks">
          {!fetchLoadingTracks &&
            fetchDataTracks.tracks.items.map((trackElement) => (
              <TracksSection
                key={trackElement.id}
                trackElement={trackElement}
                setSongSelectName={setSongSelectName}
                setPlayingTrack={setPlayingTrack}
              />
            ))}
        </section>
      </div>

      <SongPlayer accessToken={accessToken} trackUri={playingTrack} />
    </main>
  );
};
