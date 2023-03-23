import React, { useState } from "react";

export const FormSearch = ({ handleSearchParam }) => {
  const [formState, setFormState] = useState("");
  // console.log(formState, "FormSearch");

  const handleChange = (e) => {
    setFormState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.trim().length < 1) return;

    setFormState("");
    handleSearchParam(formState.trim());
    localStorage.setItem("searchParam", JSON.stringify(formState.trim()));
  };

  return (
    <div className="formSection">
      <span className="user">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        Hola, Francisco M.
      </span>

      <form className="formSearch" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar"
          value={formState}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
