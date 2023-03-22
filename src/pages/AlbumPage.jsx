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
                <figcaption>{fetchDataAlbum.name}</figcaption>

                {fetchDataAlbum.artists.map((artist) => (
                  <p>{artist.name}</p>
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
