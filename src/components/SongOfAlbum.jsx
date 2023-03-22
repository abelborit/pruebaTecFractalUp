import React from "react";

export const SongOfAlbum = ({
  track,
  setSongSelectName,
  setPlayingTrack,
  setPreviewUrlTrack,
}) => {
  // console.log(track);

  const handleSongSelect = (e) => {
    setSongSelectName(e.target.innerHTML);
    setPlayingTrack(e.target.getAttribute("uri"));
    setPreviewUrlTrack(e.target.getAttribute("previewUrl"));
  };

  const milisecondsTrack = track.duration_ms;
  let durationConvert;

  const milisecondsToMinutesAndSeconds = (miliseconds) => {
    const minutes = parseInt(miliseconds / 1000 / 60);
    miliseconds -= minutes * 60 * 1000;
    const seconds = parseInt(miliseconds / 1000);

    return (durationConvert = `${minutes}:${
      seconds < 9 ? `0${seconds}` : seconds
    }`);
  };

  milisecondsToMinutesAndSeconds(milisecondsTrack);
  // console.log(durationConvert);

  return (
    <li className="listTracks">
      <span
        onClick={handleSongSelect}
        uri={track.uri}
        previewUrl={track.preview_url}
      >
        {track.name}
      </span>
      <span>{durationConvert}</span>
    </li>
  );
};
