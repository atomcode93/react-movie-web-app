import * as React from 'react';
import { MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';
// STYLES
import { primaryTheme } from 'lib/styles';

interface Props {
  title: string;
  isOpen: boolean;
  toggleShowMore: () => void;
}

interface StyledProps {
  readonly isOpen: boolean;
  readonly size: string;
  readonly color: string;
  readonly onClick: () => void;
}

const ShowMore: React.FC<Props> = ({
  title,
  isOpen,
  toggleShowMore,
}: Props) => {
  return (
    <Wrapper>
      <span>{title}</span>
      <StyledExpandIcon
        isOpen={isOpen}
        size="30px"
        color={primaryTheme.colors.black}
        onClick={toggleShowMore}
      />
    </Wrapper>
  );
};

export default ShowMore;

const Wrapper = styled.p`
  display: grid;
  align-items: center;
  grid-template-columns: 134px auto;
  margin-bottom: 0;
  font-weight: bold;
`;

const StyledExpandIcon = styled(MdExpandMore)<StyledProps>`
  fill: ${({ theme }) => theme.colors.white};
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};

  :hover {
    cursor: pointer;
  }
`;
