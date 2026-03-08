import { Country, CountriesApiResponse } from "@/types/Countries";
import api from "./axios";
import axios from "axios";

// Trae todos los países (resumen) para la pantalla principal cuando no hay búsqueda.
export const getCountries = async () => {
  const response = await api.get<CountriesApiResponse>("all?fields=name,flag");
  return response.data;
};

// Busca países por texto usando la API (el filtrado lo hace el servidor, no React).
// Ejemplo: "spa" puede devolver Spain, etc.
export const searchCountriesByName = async (name: string) => {
  try {
    // encodeURIComponent evita romper la URL si el nombre tiene espacios o caracteres especiales.
    const response = await api.get<CountriesApiResponse>(
      `name/${encodeURIComponent(name)}?fields=name,flag`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// Trae un país exacto para la vista de detalle.
// fullText=true exige coincidencia por nombre completo (más preciso para /country/[name]).
export const getCountryByName = async (name: string) => {
  // También se codifica aquí por la misma razón: seguridad y formato correcto de URL.
  const response = await api.get<Country[]>(
    `name/${encodeURIComponent(name)}?fullText=true&fields=name,flag,capital,region,population,languages`
  );
  const country = response.data[0];
  if (!country) throw new Error("País no encontrado");
  return country;
};
