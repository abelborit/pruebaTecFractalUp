import React from "react";
import { AsideInfo } from "./components/AsideInfo";
import { FooterControlSong } from "./components/FooterControlSong";
import { MusicPage } from "./components/MusicPage";

export const App = () => {
  return (
    <>
      <AsideInfo />
      <MusicPage />
      <FooterControlSong />
    </>
  );
};
