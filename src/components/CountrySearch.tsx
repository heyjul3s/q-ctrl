import React, { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Button,
  FormControl,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { allCountries } from '../state/selectors';
import {
  searchQueryState,
  searchQueryResultState,
  pageIndexState
} from '../state/atoms';
import chunk from 'lodash.chunk';
import includes from 'lodash.includes';

const useStyles = makeStyles((theme) => ({
  searchFormControl: {
    width: '100%'
  },
  searchSubmitButton: {
    width: '100%'
  },
  searchForm: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));

export function CountrySearch(): JSX.Element {
  const classes = useStyles();
  const textRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [pageIndex, setPageIndex] = useRecoilState(pageIndexState);
  const [searchQueryResults, setSearchQueryResults] = useRecoilState(
    searchQueryResultState
  );
  const countries = useRecoilValue(allCountries);

  const onChangeSearchCountry = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event.target.value) {
      setSearchQuery('');
      setPageIndex(0);
    }
  };

  const onClickSearchCountry = () => {
    const searchQueryValue = textRef?.current?.value || '';
    setSearchQuery(searchQueryValue);

    const searchResults = chunk(
      countries.filter((country) => {
        const query = searchQueryValue.toLowerCase();
        const countryName = country.name.toLowerCase();
        return includes(countryName, query);
      }),
      10
    );

    setSearchQueryResults(searchResults);
  };

  return (
    <form className={classes.searchForm} noValidate>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={8}>
          <FormControl className={classes.searchFormControl}>
            <TextField
              inputRef={textRef}
              variant="outlined"
              id="country-search"
              label="Search Countries"
              size="small"
              type="search"
              name="country-search-field"
              onChange={onChangeSearchCountry}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            className={classes.searchSubmitButton}
            variant="contained"
            color="primary"
            name="country-search-submit-button"
            onClick={onClickSearchCountry}
            size="large"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
