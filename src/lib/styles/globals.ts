import { css, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  #root,
  #modal-root,
  #modal-sidebar
  {
    position: relative;
    z-index: 1050;
  }
  
  body,
  html {
    height: 100%;
  }

  body {
    width: 100%;
    min-width: 320px;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;
    font-family: 'Oswald', sans-serif;
    line-height: 1.2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    margin: 20px  0;
    font-size: 30px;
  }
`;

export const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.pink};
  }

  ::-webkit-scrollbar-thumb:hover {
    opacity: 0.8;
  }
`;