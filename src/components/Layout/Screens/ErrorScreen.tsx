import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type State = {
  error?: string | null | Error;
  errorInfo?: string | null | Object;
};

type Props = {
  children: JSX.Element;
};
// EXPORTED COMPONENT
class ErrorScreen extends React.Component<Props, State> {
  state: State = {
    // eslint-disable-next-line
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error | null, errorInfo: Object) {
    this.setState({
      // eslint-disable-next-line
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <Content>
          <Text>
            <h1>Упс!</h1>
            <p>Запрашиваемая страница не существует</p>
            <Link to="/">Вернуться на главную</Link>
          </Text>
        </Content>
      );
    }
    return children;
  }
}

export default ErrorScreen;

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
  grid-gap: 10px;
`;
