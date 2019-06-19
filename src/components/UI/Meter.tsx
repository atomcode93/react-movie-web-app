import * as React from 'react';
import styled from 'styled-components';

type Props = any;

const Meter: React.FC<Props> = props => <Wrapper {...props} />;

export default Meter;

const Wrapper = styled.meter`
  position: relative;
  width: 100%;
  height: 30px;
  background: #eee;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
  border-radius: 3px;

  ::-webkit-meter-bar {
    background: #eee;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 3px;
  }
  ::-webkit-meter-optimum-value {
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 3px;
  }

  ::-webkit-meter-suboptimum-value {
    background: ${({ theme }) => theme.colors.transparentBlue};
    border-radius: 3px;
  }

  ::-webkit-meter-even-less-good-value {
    background: ${({ theme }) => theme.colors.red};
    border-radius: 3px;
  }
`;
