'use client';

import { useState } from "react";
import SearchBar from "@/components/searchbar/Searchbar";


const LogicaSearchbar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", query);
    // Aquí poné tu lógica (API, filtro, etc.)
  };

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onSubmit={handleSearch}
      placeholder="Buscar productos..."
    />
  );
};

export default LogicaSearchbar;
