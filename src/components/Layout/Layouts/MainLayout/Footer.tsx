import * as React from 'react';
import styled from 'styled-components';
// STYLES
import { media } from 'lib/styles';
// COMPONENTS
import Copyright from 'components/Copyright';

const Footer = () => {
  return (
    <Wrapper>
      <Copyright />
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: auto; /* Stick to bottom of sidebar */
  height: 70px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.black};

  ${media.phone`
    display: none;
  `};
`;
