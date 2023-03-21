import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AlbumSection } from "./AlbumSection";
import { FormSearch } from "./FormSearch";
import { Loader } from "./Loader";
import { TracksSection } from "./TracksSection";

const initalState =
  JSON.parse(window.localStorage.getItem("searchParam")) || "eminem";

export const MusicPage = () => {
  const [searchParam, setSearchParam] = useState(initalState);
  // console.log(searchParam, "MusicPage");

  const handleSearchParam = (inputValue) => {
    setSearchParam(inputValue);
  };

  const URL_ALBUM = `https://api.deezer.com/search/album?q=${searchParam}`;
  const URL_TRACKS = `https://api.deezer.com/search/track?q=${searchParam}`;

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

  return (
    <>
      <div>MusicPage</div>

      <FormSearch handleSearchParam={handleSearchParam} />

      {fetchLoadingAlbum && <Loader />}
      {fetchLoadingTracks && <Loader />}

      <h3>Álbumes</h3>
      {!fetchLoadingAlbum &&
        fetchDataAlbum.data.map((albumElement) => (
          <AlbumSection key={albumElement.id} albumElement={albumElement} />
        ))}

      <h3>Canciones</h3>
      {!fetchLoadingTracks &&
        fetchDataTracks.data.map((trackElement) => (
          <TracksSection key={trackElement.id} trackElement={trackElement} />
        ))}
    </>
  );
};
