import { createGlobalStyle } from 'styled-components';

export const StyleReset = createGlobalStyle`
  * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
  #root, html, body {
    height: 100%;
  }
`;
