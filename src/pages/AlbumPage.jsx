import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FooterControlSong } from "../components/FooterControlSong";
import { Loader } from "../components/Loader";
import { SongOfAlbum } from "../components/SongOfAlbum";
import { SongPlayer } from "../components/SongPlayer";
import { useFetch } from "../hooks/useFetch";

export const AlbumPage = () => {
  const [songSelectName, setSongSelectName] = useState();
  const [previewUrlTrack, setPreviewUrlTrack] = useState();
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
    "BQB_Ilcxc55uo-ntWEbD2MwWNSQK0nunb7Dw90cluKhPeuSWysiAgfycGjUBkB6NvJe0N_iAIgfVLiOgJBi5_kBldUh66VWZeZGl5yAnERTogHYe8EDv";

  return (
    <section className="albumPage">
      <button onClick={() => navigate("/")}>Regresar</button>

      {fetchLoadingAlbum && <Loader />}

      {!fetchLoadingAlbum && (
        <div className="albumContent">
          <div>
            <figure>
              <img
                src={fetchDataAlbum.images[1].url}
                alt={fetchDataAlbum.name}
                title={fetchDataAlbum.name}
              />

              <div>
                <figcaption>
                  {fetchDataAlbum.name}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                  </svg>
                </figcaption>
                <p>Fecha de lanzamiento: {fetchDataAlbum.release_date}</p>
                <p>Canciones: {fetchDataAlbum.total_tracks}</p>

                {fetchDataAlbum.artists.map((artist) => (
                  <p>Lo mejor de {artist.name}</p>
                ))}
              </div>
            </figure>
          </div>

          <div className="tracksContainer">
            <ul>
              {fetchDataAlbum.tracks.items.map((track) => (
                <SongOfAlbum
                  key={track.id}
                  track={track}
                  setSongSelectName={setSongSelectName}
                  setPlayingTrack={setPlayingTrack}
                  setPreviewUrlTrack={setPreviewUrlTrack}
                />
              ))}
            </ul>
          </div>

          {fetchLoadingTracks && <Loader />}
          {!fetchLoadingTracks && (
            <FooterControlSong
              track={fetchDataTracks.tracks}
              previewUrl={previewUrlTrack}
            />
          )}

          <SongPlayer accessToken={accessToken} trackUri={playingTrack} />
        </div>
      )}
    </section>
  );
};
