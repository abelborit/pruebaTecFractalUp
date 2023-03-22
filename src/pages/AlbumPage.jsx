import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FooterControlSong } from "../components/FooterControlSong";
import { Loader } from "../components/Loader";
import { SongOfAlbum } from "../components/SongOfAlbum";
import { SongPlayer } from "../components/SongPlayer";
import { useFetch } from "../hooks/useFetch";

export const AlbumPage = () => {
  const [songSelectName, setSongSelectName] = useState();
  const [playingTrack, setPlayingTrack] = useState();

  const navigate = useNavigate();

  const { id } = useParams();
  const URL_ALBUM_DETAILS = `https://api.spotify.com/v1/albums/${id}`;

  const {
    useFetchData: fetchDataAlbum,
    useFetchError: fetchErrorAlbum,
    useFetchLoading: fetchLoadingAlbum,
  } = useFetch(URL_ALBUM_DETAILS);

  // console.log(fetchDataAlbum);

  const URL_TRACKS = `https://api.spotify.com/v1/search?q=${songSelectName}&type=track`;
  const {
    useFetchData: fetchDataTracks,
    useFetchError: fetchErrorTracks,
    useFetchLoading: fetchLoadingTracks,
  } = useFetch(URL_TRACKS);

  // console.log(fetchDataTracks);

  const accessToken =
    "BQCXXY_rWwA3Ww-rbalqjkizhif09wS2uJPe_8eHulonvnKfEtIzCJ5qsivVzoCRcNxAg5n0n43diZLss2rQ1GraDhAt0-lxg1wGXmDIH7H9_yry9HSk";

  return (
    <>
      <button onClick={() => navigate("/")}>
        Volver a la página principal
      </button>

      {fetchLoadingAlbum && <Loader />}

      {!fetchLoadingAlbum && (
        <>
          <div>
            <figure>
              <img
                src={fetchDataAlbum.images[1].url}
                alt={fetchDataAlbum.name}
                title={fetchDataAlbum.name}
              />
              <figcaption>{fetchDataAlbum.name}</figcaption>
            </figure>

            {fetchDataAlbum.artists.map((artist) => (
              <p>{artist.name}</p>
            ))}
          </div>

          <div>
            <ul>
              {fetchDataAlbum.tracks.items.map((track) => (
                <SongOfAlbum
                  key={track.id}
                  track={track}
                  setSongSelectName={setSongSelectName}
                  setPlayingTrack={setPlayingTrack}
                />
              ))}
            </ul>
          </div>

          {fetchLoadingTracks && <Loader />}
          {!fetchLoadingTracks && (
            <FooterControlSong track={fetchDataTracks.tracks} />
          )}

          <SongPlayer accessToken={accessToken} trackUri={playingTrack} />
        </>
      )}
    </>
  );
};
