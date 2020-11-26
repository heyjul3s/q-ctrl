export type CountriesProps = {
  searchQuery?: string;
};

export type Country = {
  name: string;
  demonym: string;
  population: number;
  flag: string;
};

export type CountryAll = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: Array<string | Date>;
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: { [key: string]: string }[];
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
};

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
};
