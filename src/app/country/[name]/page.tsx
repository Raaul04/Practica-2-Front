"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCountryByName } from "@/lib/api/countries";
import { Country } from "@/types/Countries";

const CountryPage = () => {
  const params = useParams();
  const rawName = params.name as string;

  const name = decodeURIComponent(rawName);

  const router = useRouter();

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCountryByName(name)
      .then(setCountry)
      .catch(() => setError("País no encontrado"))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="country-detail"><p className="country-detail__loading">Cargando...</p></div>;

  if (error || !country) return (
    <div className="country-detail">
      <button className="country-detail__back" onClick={() => router.push("/")}>← Volver</button>
      <div className="country-detail__card country-detail__card--not-found">
        <p className="country-detail__flag"></p>
        <h1 className="country-detail__name">{decodeURIComponent(name)}</h1>
        <p className="country-detail__not-found-msg">País no encontrado</p>
        <ul className="country-detail__info">
          <li><strong>Capital:</strong> —</li>
          <li><strong>Región:</strong> —</li>
          <li><strong>Población:</strong> —</li>
          <li><strong>Idiomas:</strong> —</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="country-detail">
      <button className="country-detail__back" onClick={() => router.push("/")}>← Volver</button>

      <div className="country-detail__card">
        <p className="country-detail__flag">{country.flag}</p>
        <h1 className="country-detail__name">{country.name.official}</h1>

        <ul className="country-detail__info">
          <li><strong>Capital:</strong> {country.capital?.join(", ") ?? "—"}</li>
          <li><strong>Región:</strong> {country.region}</li>
          <li><strong>Población:</strong> {country.population?.toLocaleString()}</li>
          {country.languages && (
            <li><strong>Idiomas:</strong> {Object.values(country.languages).join(", ")}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryPage;
