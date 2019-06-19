import * as React from 'react';
import styled from 'styled-components';
import Spinner from 'components/UI/Spinner';

interface Props {
  rest?: Object;
}

// EXPORTED COMPONENT
const LoadingScreen: React.FC<Props> = () => (
  <Content>
    <Spinner />
  </Content>
);

export default LoadingScreen;

const Content = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  background: rgba(243, 255, 255, 0.4);
  > * {
    height: 40px;
    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
