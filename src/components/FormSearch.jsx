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
    <form className="formSearch" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar"
        value={formState}
        onChange={handleChange}
      />
    </form>
  );
};
