import React from 'react';
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { renderWithRouter, renderApp } from '../test-utils';
import 'jest-styled-components';
import App from '../App';

describe('Countries', () => {
  test('shows Loader when countries are still loading', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByAltText('preloader-image')).toBeInTheDocument();
    });
  });

  test('shows the first 10 countries in alphabetical order', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.queryByAltText('preloader-image')).not.toBeInTheDocument();
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
      expect(screen.getByText('Åland Islands')).toBeInTheDocument();
      expect(screen.getByText('Albania')).toBeInTheDocument();
      expect(screen.getByText('Algeria')).toBeInTheDocument();
      expect(screen.getByText('American Samoa')).toBeInTheDocument();
      expect(screen.getByText('Andorra')).toBeInTheDocument();
      expect(screen.getByText('Angola')).toBeInTheDocument();
      expect(screen.getByText('Anguilla')).toBeInTheDocument();
      expect(screen.getByText('Antarctica')).toBeInTheDocument();
      expect(screen.getByText('Antigua and Barbuda')).toBeInTheDocument();
    });
  });

  test('shows search result on clicking search button', async () => {
    renderApp();

    const searchInput = screen.getByLabelText('Search Countries');
    const searchInputSubmitButton = screen.getByText('Search');

    await waitFor(() => {
      searchInput.focus();
      fireEvent.change(searchInput, {
        target: {
          value: 'Australia'
        }
      });

      expect(searchInput).toBeInTheDocument();
    });

    await waitFor(() => {
      searchInputSubmitButton.focus();
      searchInputSubmitButton.click();
      expect(screen.getByText('Australia')).toBeInTheDocument();
    });
  });

  test('hides previous page button when there are no more countries on the previous page ', async () => {
    renderApp();

    const prevPageButtonContainer = screen.getByTitle('Previous Page Button');

    await waitFor(() => {
      expect(prevPageButtonContainer).toBeInTheDocument();
      expect(prevPageButtonContainer).toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });

  test('shows previous page button when there are more countries on the previous page ', async () => {
    renderApp();

    const nextPageButton = screen.getByText('Next');
    const prevPageButtonContainer = screen.getByTitle('Previous Page Button');

    await waitFor(() => {
      nextPageButton.focus();
      nextPageButton.click();
      expect(prevPageButtonContainer).toBeInTheDocument();
      expect(prevPageButtonContainer).not.toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });

  test('shows next page button when there are more countries on next page', async () => {
    renderApp();

    const nextPageButtonContainer = screen.getByTitle('Next Page Button');

    await waitFor(() => {
      expect(nextPageButtonContainer).toBeInTheDocument();
      expect(nextPageButtonContainer).not.toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });

  test('hides next page button when there are no more countries on next page', async () => {
    renderApp();

    const nextPageButton = screen.getByText('Next');
    const nextPageButtonContainer = screen.getByTitle('Next Page Button');

    await waitFor(() => {
      nextPageButton.focus();

      for (let i = 0; i < 25; i++) {
        nextPageButton.click();
      }

      expect(nextPageButtonContainer).toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });
});

describe('Country', () => {
  test('shows loader when country are still loading', async () => {
    renderWithRouter(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
      { route: '/country/Albania' }
    );

    await waitFor(() => {
      expect(screen.queryByAltText('preloader-image')).toBeInTheDocument();
    });
  });

  test('shows Country name, flag, population and demonym when I click on a country', async () => {
    renderWithRouter(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText('preloader-image')
    );

    await waitFor(() => {
      expect(screen.getByText('Albania')).toBeInTheDocument();
      screen.getByText('Albania').focus();
      screen.getByText('Albania').click();
      expect(screen.getByAltText('Albania-flag')).toBeInTheDocument();
      expect(screen.getByText('Albania')).toBeInTheDocument();
      expect(screen.getByText('2886026')).toBeInTheDocument();
      expect(screen.getByText('Albanian')).toBeInTheDocument();
    });
  });
});
