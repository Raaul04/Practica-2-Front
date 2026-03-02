import { Country, CountriesApiResponse } from "@/types/Countries";
import api from "./axios";

export const getCountries = async () => {
  const response = await api.get<CountriesApiResponse>("all?fields=name,flag");
  return response.data;
};

export const getCountryByName = async (name: string) => {
  const response = await api.get<Country[]>(
    `name/${encodeURIComponent(name)}?fullText=true&fields=name,flag,capital,region,population,languages`
  );
  const country = response.data[0];
  if (!country) throw new Error("País no encontrado");
  return country;
};
