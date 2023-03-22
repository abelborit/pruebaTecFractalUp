import React from "react";

export const SongOfAlbum = ({ track, setSongSelectName, setPlayingTrack }) => {
  // console.log(track);

  const handleSongSelect = (e) => {
    // console.log(e.target.innerHTML);
    // console.log(e.target.getAttribute("uri"));

    setSongSelectName(e.target.innerHTML);
    setPlayingTrack(e.target.getAttribute("uri"));
  };

  const milisecondsTrack = track.duration_ms;
  let durationConvert;

  const milisecondsToMinutesAndSeconds = (miliseconds) => {
    const minutes = parseInt(miliseconds / 1000 / 60);
    miliseconds -= minutes * 60 * 1000;
    const seconds = parseInt(miliseconds / 1000);

    return (durationConvert = `${minutes}:${seconds}`);
  };

  milisecondsToMinutesAndSeconds(milisecondsTrack);
  // console.log(durationConvert);

  return (
    <li>
      <span onClick={handleSongSelect} uri={track.uri}>
        {track.name}
      </span>
      <span>{durationConvert}</span>
    </li>
  );
};
