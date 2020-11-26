import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from '../App';
import { RecoilRoot } from 'recoil';
import 'jest-styled-components';
import { renderWithRouter } from '../test-utils';

describe('Countries', () => {
  afterEach(cleanup);

  test('shows Loader when countries are still loading', async () => {
    const { queryByAltText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(queryByAltText('preloader-image')).toBeInTheDocument();
    });
  });

  test('shows the first 10 countries in alphabetical order', async () => {
    const { container, queryByAltText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(queryByAltText('preloader-image')).not.toBeInTheDocument();
      expect(container).toHaveTextContent('Afghanistan');
      expect(container).toHaveTextContent('Åland Islands');
      expect(container).toHaveTextContent('Albania');
      expect(container).toHaveTextContent('Algeria');
      expect(container).toHaveTextContent('American Samoa');
      expect(container).toHaveTextContent('Andorra');
      expect(container).toHaveTextContent('Angola');
      expect(container).toHaveTextContent('Anguilla');
      expect(container).toHaveTextContent('Antarctica');
      expect(container).toHaveTextContent('Antigua and Barbuda');
    });
  });

  test('shows search result on clicking search button', async () => {
    const { container, getByText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    const searchInput = container.querySelector(
      'input[name="country-search-field"]'
    ) as HTMLInputElement;

    const searchInputSubmitButton = container.querySelector(
      '[name="country-search-submit-button"]'
    ) as HTMLButtonElement;

    await waitFor(() => {
      searchInput.focus();
      fireEvent.change(searchInput, {
        target: {
          value: 'Australia'
        }
      });

      expect(searchInput).toBeInTheDocument();
      expect(searchInput.value).toEqual('Australia');
    });

    await waitFor(() => {
      searchInputSubmitButton.focus();
      searchInputSubmitButton.click();
      expect(getByText('Australia')).toBeInTheDocument();
    });
  });

  test('hides previous page button when there are no more countries on the previous page ', async () => {
    const { container } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    const prevPageButtonContainer = container
      .querySelector('[name="page-navigation-prev-button"]')
      ?.closest('div');

    await waitFor(() => {
      expect(prevPageButtonContainer).toBeInTheDocument();
      expect(prevPageButtonContainer).toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });

  test('shows previous page button when there are more countries on the previous page ', async () => {
    const { container } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    const nextPageButton = container.querySelector(
      '[name="page-navigation-next-button"]'
    ) as HTMLButtonElement;

    const prevPageButton = container.querySelector(
      '[name="page-navigation-prev-button"]'
    );

    const prevPageButtonContainer = prevPageButton?.closest('div');

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
    const { container } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    const nextPageButtonContainer = container
      .querySelector('[name="page-navigation-next-button"]')
      ?.closest('div');

    await waitFor(() => {
      expect(nextPageButtonContainer).toBeInTheDocument();
      expect(nextPageButtonContainer).not.toHaveStyle(
        'visibility: hidden; pointer-events: none;'
      );
    });
  });

  test('hides next page button when there are no more countries on next page', async () => {
    const { container } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    const nextPageButton = container.querySelector(
      '[name="page-navigation-next-button"]'
    ) as HTMLButtonElement;

    const nextPageButtonContainer = nextPageButton?.closest('div');

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

  test('shows Country name, flag, population and demonym when I click on a country', async () => {
    const { getByText, getByAltText, queryByAltText } = renderWithRouter(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    await waitFor(() => {
      getByText('Albania').focus();
      getByText('Albania').click();
      expect(queryByAltText('preloader-image')).not.toBeInTheDocument();
      expect(getByAltText('Albania-flag')).toBeInTheDocument();
      expect(getByText('Albania')).toBeInTheDocument();
      expect(getByText('2886026')).toBeInTheDocument();
      expect(getByText('Albanian')).toBeInTheDocument();
    });
  });
});
