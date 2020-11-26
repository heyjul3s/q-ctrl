import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import type { CountryAll } from '../typings';
import { useRequest } from '../hooks';
import isEmpty from 'lodash.isempty';
import { Loader } from './Loader';

const useStyles = makeStyles((theme) => ({
  back: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  flag: {
    display: 'block',
    width: '100%',
    height: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export function Country(): JSX.Element {
  const classes = useStyles();
  const { countryName } = useParams<{ countryName: string }>();

  const { data, loading, error } = useRequest<CountryAll[]>(
    `https://restcountries.eu/rest/v2/name/${countryName}`
  );

  const country = !!data && !isEmpty(data) ? data[0] : void 0;

  return (
    <>
      <div className={classes.back}>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            size="large"
            name="country-back-button"
          >
            Back
          </Button>
        </Link>
      </div>

      {loading && <Loader />}

      {!loading && !isEmpty(country) && (
        <Paper className={classes.paper}>
          <img
            className={classes.flag}
            src={country?.flag}
            alt={`${country?.name}-flag`}
          />
          <Typography variant="body1">{country?.name}</Typography>

          <List>
            <ListItem>
              <Typography variant="body1">Population</Typography>&nbsp;
              <Typography variant="body1">{country?.population}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">Demonym</Typography>&nbsp;
              <Typography variant="body1">{country?.demonym}</Typography>
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
}
