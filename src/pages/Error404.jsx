import React from "react";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")}>Volver a la página principal</button>
  );
};
