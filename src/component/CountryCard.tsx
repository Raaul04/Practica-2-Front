"use client";

import { useRouter } from "next/navigation";
import { Country } from "@/types/Countries";

type CountryCardProps = {
  country: Country;
};

const CountryCard = ({ country }: CountryCardProps) => {
  const router = useRouter();
  const slug = country.name.common.toLowerCase();

  return (
    <div className="country-card" onClick={() => router.push(`/country/${slug}`)}>
      <span className="country-card__flag">{country.flag}</span>
      <p className="country-card__name">{country.name.common}</p>
    </div>
  );
};

export default CountryCard;
