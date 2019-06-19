import * as React from 'react';
import styled from 'styled-components';

const Button = ({ onClick }) => {
  return <Content onClick={() => onClick} />;
};

Button.defaultProps = {
  onClick: null,
};

export default React.memo(Button);

const Content = styled.button`
  width: 200px;
  padding: 1rem 1rem;
  margin: 0 1rem;
  transition: all 0.5s ease;
  color: #41403e;
  font-size: 1.4rem;
  letter-spacing: 1px;
  outline: none;
  background: transparent;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  cursor: pointer;

  :hover,
  :active {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
    border: solid 2px #41403e;
  }
`;
