"use client";

import { useRouter } from "next/navigation";
import { Country } from "@/types/Countries";

type CountryCardProps = {
  country: Country;
};

const CountryCard = ({ country }: CountryCardProps) => {
  const router = useRouter();

  return (
    <div
      className="country-card"
      // encodeURIComponent convierte espacios/símbolos a formato seguro de URL.
      // Ejemplo: "United Kingdom" -> "United%20Kingdom".
      onClick={() => router.push(`/country/${encodeURIComponent(country.name.common)}`)}
    >
      <span className="country-card__flag">{country.flag}</span>
      <p className="country-card__name">{country.name.common}</p>
    </div>
  );
};

export default CountryCard;
