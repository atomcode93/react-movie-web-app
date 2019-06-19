import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => (
  <Preloader>
    <li />
    <li />
    <li />
    <li />
  </Preloader>
);

export default Spinner;

const animate = keyframes`
  0%,
  40%,
  100% {
    transform: scale(.2);
  }
  20% {
    transform: scale(1);
  }
`;

const Preloader = styled.ul`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-auto-flow: column;
  width: max-content;
  margin: 0;
  padding: 0;
  li {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    animation: ${animate} 1.1s ease-in-out infinite;
  }
  li:nth-child(1) {
    animation-delay: 0.6s;
    background-color: ${({ theme }) => theme.colors.white};
  }
  li:nth-child(2) {
    animation-delay: 0.8s;
    background-color: ${({ theme }) => theme.colors.white};
  }
  li:nth-child(3) {
    animation-delay: 1s;
    background-color: ${({ theme }) => theme.colors.white};
  }
  li:nth-child(4) {
    animation-delay: 1.1s;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
