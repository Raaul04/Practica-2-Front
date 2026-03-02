export type NativeName = {
  official: string;
  common: string;
};

export type Country = {
  flag: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<string, NativeName>;
  };
  capital?: string[];
  region?: string;
  population?: number;
  languages?: Record<string, string>;
};

export type CountriesApiResponse = Country[];