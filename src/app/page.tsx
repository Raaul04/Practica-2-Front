"use client";

import { useEffect, useState } from "react";
import { getCountries, searchCountriesByName } from "@/lib/api/countries";
import { Country } from "@/types/Countries";
import CountryCard from "@/component/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Este efecto se ejecuta cada vez que cambia el texto del input (search).
  // Su trabajo es pedir países a la API, no filtrar en el cliente.
  useEffect(() => {
    // trim() elimina espacios al principio/final para no buscar "  spain  ".
    const query = search.trim();

    // Debounce: espera 350ms antes de llamar a la API para evitar una petición por cada tecla.
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);

      // Si hay texto, busca por nombre en API. Si está vacío, trae la lista general.
      const request = query ? searchCountriesByName(query) : getCountries();

      request
        .then((data) => setCountries(data))
        .catch(() => setError("Error al cargar los países"))
        .finally(() => setLoading(false));
    }, 350);

    // Limpieza del efecto: si el usuario sigue escribiendo, cancela el timer anterior.
    return () => clearTimeout(timer);
    // [search] = dependencia del efecto:
    // - Si 'search' cambia, el efecto se vuelve a ejecutar.
    // - Si 'search' NO cambia, el efecto NO se repite.
    // Gracias a esto la búsqueda responde al texto del input.
    //[] = sin dependencias, el efecto solo se ejecuta una vez al montar el componente (no responde a cambios de 'search').
    // Si olvidamos poner [search], el efecto se ejecuta en cada renderizado, causando un bucle infinito de llamadas a la API.
  }, [search]);

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
      {!loading && !error && countries.length === 0 && <p>No hay países para mostrar</p>}

      <div className="countries-grid">
        {/* Referencia (como lo tenías antes, filtrando en cliente):
        {countries
          .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        */}
        {countries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;
