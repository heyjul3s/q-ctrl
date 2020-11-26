import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  body {
    margin: 0;
    padding: 0;
    background: #f5f5f5;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;
