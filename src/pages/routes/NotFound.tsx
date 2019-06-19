import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Content>
      <Text>
        <h1>Oops!</h1>
        <p>The page you are looking for doesn't exist</p>
        <Link to="/">Go Home</Link>
      </Text>
    </Content>
  );
};

export default NotFound;

const Content = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};

  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const Text = styled.div`
  display: grid;
  grid-gap
`;
