"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "@/components/searchbar/Searchbar";

const LogicaSearchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (!query.trim()) return;

    // Si estamos en /products, no redirigimos
    if (pathname === "/productos") {
      const url = new URLSearchParams({ q: query });
      router.push(`/productos?${url.toString()}`);
    } else {
      // Redirigimos a /products con la query
      router.push(`/productos?q=${encodeURIComponent(query)}`);
    }
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
