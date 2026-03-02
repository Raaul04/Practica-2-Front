"use client";

import { useEffect, useState } from "react";
import { getCountries } from "@/lib/api/countries";
import { Country } from "@/types/Countries";
import CountryCard from "@/component/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCountries()
      .then((data) => setCountries(data))
      .catch(() => setError("Error al cargar los países"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido a los países</h1>
      <input
        className="home-search"
        type="text"
        placeholder="Buscar país..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando países...</p>}
      {error && <p className="home-error">{error}</p>}

      <div className="countries-grid">
        {countries
          .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
