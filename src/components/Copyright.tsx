import * as React from 'react';
import styled from 'styled-components';
// STYLES
import { media } from 'lib/styles';
// ASSETS
import logo from 'assets/tmdb_logo.png';

const Copyright = () => (
  <Wrapper>
    <a href="https://www.themoviedb.org/">
      <img src={logo} alt="logo" />
    </a>
    <p>
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </p>
  </Wrapper>
);

export default Copyright;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  svg {
    width: 60px;
    height: auto;
    & > * :hover {
      fill: ${({ theme }) => theme.colors.green};
    }
  }

  svg:hover {
    fill: ${({ theme }) => theme.colors.green};
  }

  p {
    font-size: 14px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.phone`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 10px;
  padding: 15px;
     svg {
        width: 40px;
     }
   `};
`;
