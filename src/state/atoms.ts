import { atom } from 'recoil';
import type { Country, CountryAll } from '../typings';

export const countriesState = atom<CountryAll[]>({
  key: 'countriesState',
  default: []
});

export const pageIndexState = atom<number>({
  key: 'pageIndexState',
  default: 0
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: ''
});

export const searchQueryResultState = atom<Country[][]>({
  key: 'searchQueryResultState',
  default: []
});
