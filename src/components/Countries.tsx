import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import { countriesState } from '../state/atoms';
import {
  paginatedCountries,
  currentPageIndex,
  searchQuery,
  searchQueryResults
} from '../state/selectors';
import { CountrySearch } from './CountrySearch';
import { PageNavigation } from './PageNavigation';
import type { Country, CountryAll } from '../typings';
import { useRequest } from '../hooks';
import isEmpty from 'lodash.isempty';
import { Loader } from './Loader';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none'
  },
  paper: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export function Countries(): JSX.Element {
  const classes = useStyles();
  const pageIndex = useRecoilValue(currentPageIndex);
  const countries = useRecoilValue(paginatedCountries);
  const currentCountriesList = countries[pageIndex];
  const search = useRecoilValue(searchQuery);
  const searchResults = useRecoilValue(searchQueryResults);
  const countryList = !!search
    ? searchResults[pageIndex]
    : currentCountriesList;

  const [allCountries, setAllCountries] = useRecoilState<CountryAll[]>(
    countriesState
  );

  const { data, loading, error } = useRequest<CountryAll[]>(
    'https://restcountries.eu/rest/v2/all'
  );

  useEffect(() => {
    if (!loading && !error && !isEmpty(data)) {
      setAllCountries(data as CountryAll[]);
    }
  }, [loading]);

  return (
    <>
      <CountrySearch />

      <Grid container>
        {loading && (
          <Grid item xs={12}>
            <Loader />
          </Grid>
        )}

        {!loading && (
          <>
            {Array.isArray(countryList) &&
              countryList.length >= 1 &&
              countryList?.map((country: Country, i: number) => (
                <Grid item xs={12} key={`country-item-${i}-${country.name}`}>
                  <Link
                    className={classes.link}
                    to={`/country/${country.name}`}
                  >
                    <Paper className={classes.paper}>
                      <Typography variant="body1">{country.name}</Typography>
                    </Paper>
                  </Link>
                </Grid>
              ))}

            {!!search && Array.isArray(countryList) && countryList.length <= 0 && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="body1">
                    No matching results found.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </>
        )}
      </Grid>

      <PageNavigation />
    </>
  );
}
