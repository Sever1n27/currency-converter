import { createGlobalStyle } from 'styled-components';

export const StyleReset = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), url('/assets/fonts/Montserrat-Regular.ttf') format('truetype');
  }
  @font-face {
      font-family: 'Montserrat';
      font-weight: 700;
      src: local('Montserrat'), url('/assets/fonts/Montserrat-Bold.ttf') format('truetype');
  }
  @font-face {
      font-family: 'Montserrat';
      font-weight: 300;
      src: local('Montserrat'), url('/assets/fonts/Montserrat-Light.ttf') format('truetype');
  }
  @font-face {
      font-family: 'Montserrat';
      font-weight: 200;
      src: local('Montserrat'), url('/assets/fonts/Montserrat-Thin.ttf') format('truetype');
  }

  * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
  #root, html, body {
    height: 100%;
    font-family: 'Montserrat';
  }
`;
