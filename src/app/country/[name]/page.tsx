"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCountryByName } from "@/lib/api/countries";
import { Country } from "@/types/Countries";

const CountryPage = () => {
  const {name} = useParams() as { name: string }
  

  // decodeURIComponent hace el proceso inverso de encodeURIComponent.
  // Ejemplo: "United%20Kingdom" -> "United Kingdom".
  const nameCountry = decodeURIComponent(name);

  const router = useRouter();

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Este efecto carga el detalle del país desde la API.
  // Se ejecuta al entrar en la página y también si cambias a otra ruta /country/[name].
  useEffect(() => {
    // Pide a la API el país cuyo nombre viene en la URL.
    getCountryByName(nameCountry)
      // Si va bien, guarda el resultado en el estado `country`.
      .then(setCountry)
      // Si falla (por ejemplo 404), mostramos mensaje de error.
      .catch(() => setError("País no encontrado"))
      // Tanto si va bien como si falla, quitamos el estado de carga.
      .finally(() => setLoading(false));
    // [name] es la dependencia:
    // - si cambia el nombre en la URL, vuelve a pedir el nuevo país.
    // - si no cambia, no repite la petición.
  }, [name]);

  if (loading) return <div className="country-detail"><p className="country-detail__loading">Cargando...</p></div>;


  return (
    <div className="country-detail">
      <button className="country-detail__back" onClick={() => router.push("/")}>← Volver</button>

      <div className="country-detail__card">
        <p className="country-detail__flag">{country?.flag}</p>
        <h1 className="country-detail__name">{country?.name.official}</h1>

        <ul className="country-detail__info">
          {/* ?. evita error si country todavía es null/undefined */}
          {/* capital es un array, join(", ") lo convierte en texto: "Madrid, Barcelona" */}
          {/* ?? "—" solo se usa si el resultado de la izquierda es null o undefined */}
          <li><strong>Capital:</strong> {country?.capital?.join(", ") ?? "—"}</li>

          {/* Si country no existe aún, muestra undefined (no rompe por usar ?.) */}
          <li><strong>Región:</strong> {country?.region}</li>

          {/* toLocaleString formatea números grandes: 1234567 -> 1.234.567 (según idioma) */}
          <li><strong>Población:</strong> {country?.population?.toLocaleString()}</li>

          {/* languages es un objeto: { spa: "Spanish", cat: "Catalan" } */}
          {/* Object.values(...) extrae ["Spanish", "Catalan"] y join lo une con comas */}
          {country?.languages && (
            <li><strong>Idiomas:</strong> {Object.values(country.languages).join(", ")}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryPage;
