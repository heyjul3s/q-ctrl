/* istanbul ignore file */

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './App';

export function renderApp() {
  return render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

export function renderWithRouter(
  ui: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}
