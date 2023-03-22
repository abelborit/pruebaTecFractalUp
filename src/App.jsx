import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { AsideInfo } from "./components/AsideInfo";
import { AlbumPage } from "./pages/AlbumPage";
import { Error404 } from "./pages/Error404";
import { MusicPage } from "./pages/MusicPage";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AsideInfo />

        <Routes>
          <Route path="/" element={<MusicPage />} />
          <Route path="/album/:id/:name" element={<AlbumPage />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
