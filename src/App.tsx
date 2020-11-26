import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { Countries, Country, GlobalStyles } from './components';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Countries} />
            <Route
              exact={true}
              path="/country/:countryName"
              component={Country}
            />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default hot(App);
