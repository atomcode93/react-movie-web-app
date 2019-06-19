import * as React from 'react';
import styled from 'styled-components';

interface Props {
  voteAverage: number;
  right: string;
  top: string;
}

const VoteBadge: React.FC<Props> = ({ voteAverage, ...rest }) => (
  <Wrapper {...rest}>{voteAverage}</Wrapper>
);

export default VoteBadge;

const Wrapper = styled.span<{ right: string; top: string }>`
  background-color: ${({ theme }) => theme.colors.yellow};
  position: absolute;
  border-radius: 50%;
  font-size: 12px;
  z-index: 1;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  top: ${({ top }) => top || '15px'};
  right: ${({ right }) => right || '-20px'};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.4);
`;
