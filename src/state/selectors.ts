import { selector } from 'recoil';
import {
  countriesState,
  pageIndexState,
  searchQueryResultState,
  searchQueryState
} from './atoms';
import type { Country } from '../typings';
import chunk from 'lodash.chunk';

export const allCountries = selector({
  key: 'allCountries',
  get: ({ get }) => get(countriesState)
});

export const paginatedCountries = selector({
  key: 'countriesList',
  get: ({ get }) => {
    const allCountries = get(countriesState);

    return chunk(
      allCountries.reduce((acc, { name, demonym, flag, population }) => {
        return [...acc, { name, demonym, flag, population }];
      }, [] as Country[]),
      10
    );
  }
});

export const searchQuery = selector({
  key: 'searchQuery',
  get: ({ get }) => get(searchQueryState)
});

export const searchQueryResults = selector({
  key: 'searchQueryResult',
  get: ({ get }) => get(searchQueryResultState)
});

export const currentPageIndex = selector({
  key: 'currentPageIndex',
  get: ({ get }) => get(pageIndexState)
});
