import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AlbumSection } from "../components/AlbumSection";
import { FormSearch } from "../components/FormSearch";
import { Loader } from "../components/Loader";
import { TracksSection } from "../components/TracksSection";
import { SongPlayer } from "../components/SongPlayer";

const initalState =
  JSON.parse(window.localStorage.getItem("searchParam")) || "sixdo";

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
    "BQCXXY_rWwA3Ww-rbalqjkizhif09wS2uJPe_8eHulonvnKfEtIzCJ5qsivVzoCRcNxAg5n0n43diZLss2rQ1GraDhAt0-lxg1wGXmDIH7H9_yry9HSk";
  return (
    <>
      <div>MusicPage</div>

      <FormSearch handleSearchParam={handleSearchParam} />

      {fetchLoadingAlbum && <Loader />}
      {fetchLoadingTracks && <Loader />}

      <h3>Álbumes</h3>
      {!fetchLoadingAlbum &&
        fetchDataAlbum.albums.items.map((albumElement) => (
          <AlbumSection key={albumElement.id} albumElement={albumElement} />
        ))}

      <hr />

      <h3>Canciones</h3>
      {!fetchLoadingTracks &&
        fetchDataTracks.tracks.items.map((trackElement) => (
          <TracksSection
            key={trackElement.id}
            trackElement={trackElement}
            setSongSelectName={setSongSelectName}
            setPlayingTrack={setPlayingTrack}
          />
        ))}

      {/* <SongPlayer accessToken={accessToken} trackUri={playingTrack} /> */}
    </>
  );
};
