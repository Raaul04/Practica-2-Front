import { Country, CountriesApiResponse } from "@/types/Countries";
import api from "./axios";

export const getCountries = async (): Promise<CountriesApiResponse> => {
  const response = await api.get<CountriesApiResponse>("all?fields=name,flag");
  return response.data;
};

export const getCountryByName = async (name: string): Promise<Country> => {
  const response = await api.get<Country[]>(
    `name/${encodeURIComponent(name)}?fullText=true&fields=name,flag,capital,region,population,languages`
  );
  return response.data[0];
};
