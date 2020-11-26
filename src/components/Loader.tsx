import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import loader from '../preloader-lg.gif';

const useStyles = makeStyles((theme) => ({
  preloaderContainer: {
    padding: '5em'
  },
  preloader: {
    display: 'block',
    maxWidth: '64px',
    width: '100%',
    height: 'auto',
    margin: '0 auto'
  }
}));

export function Loader(): JSX.Element {
  const classes = useStyles();

  return (
    <Container className={classes.preloaderContainer}>
      <img className={classes.preloader} src={loader} alt="preloader-image" />
    </Container>
  );
}
