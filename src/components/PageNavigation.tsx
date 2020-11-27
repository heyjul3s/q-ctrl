import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { pageIndexState } from '../state/atoms';
import { paginatedCountries, searchQueryResults } from '../state/selectors';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  prevButton: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  nextButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  prevButtonHidden: {
    visibility: 'hidden',
    pointerEvents: 'none'
  },
  nextButtonHidden: {
    visibility: 'hidden',
    pointerEvents: 'none'
  }
}));

export function PageNavigation(): JSX.Element {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = useRecoilState(pageIndexState);
  const countries = useRecoilValue(paginatedCountries);
  const searchResults = useRecoilValue(searchQueryResults);
  const [prevHidden, setPrevHidden] = useState(false);
  const [nextHidden, setNextHidden] = useState(false);
  const totalPages =
    Array.isArray(searchResults) && searchResults.length >= 1
      ? searchResults.length
      : countries.length;

  const setPrevPage = () => {
    const currentIndex = pageIndex > 0 ? pageIndex - 1 : pageIndex;
    setPageIndex(currentIndex);
  };

  const setNextPage = () => {
    const currentIndex =
      pageIndex <= totalPages - 1 ? pageIndex + 1 : pageIndex;
    setPageIndex(currentIndex);
  };

  useEffect(() => {
    setPageIndex(0);
  }, [searchResults]);

  useEffect(() => {
    pageIndex === 0 ? setPrevHidden(true) : setPrevHidden(false);
  }, [pageIndex]);

  useEffect(() => {
    pageIndex === totalPages - 1 ? setNextHidden(true) : setNextHidden(false);
  }, [pageIndex]);

  return (
    <Grid className={classes.container} container>
      <Grid
        item
        xs={6}
        className={!prevHidden ? classes.prevButton : classes.prevButtonHidden}
        title="Previous Page Button"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={setPrevPage}
          size="large"
          name="page-navigation-prev-button"
        >
          Prev
        </Button>
      </Grid>

      <Grid
        item
        xs={6}
        className={!nextHidden ? classes.nextButton : classes.nextButtonHidden}
        title="Next Page Button"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={setNextPage}
          size="large"
          name="page-navigation-next-button"
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
