import * as React from 'react';
import { animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
// STYLES
import { media } from 'lib/styles';

// TYPES
interface Props {
  closeModal: Function;
  children: JSX.Element;
  maxWidth: number;
  style: any;
}

const defaultProps = {
  maxWidth: 500,
  title: '',
};

interface ModalProps {
  readonly maxWidth: number;
}

type DefaultProps = Readonly<typeof defaultProps>;

const ModalContainer: React.FC<Props & Partial<DefaultProps>> = ({
  closeModal,
  maxWidth,
  children,
  style,
}) => (
  <CloseBackground onClick={() => closeModal()}>
    <Container style={{ ...style }}>
      <ModalDialog maxWidth={maxWidth}>
        <Header>
          <CloseButton onClick={() => closeModal()}>
            <Close size="40px" />
          </CloseButton>
        </Header>
        {children}
      </ModalDialog>
    </Container>
  </CloseBackground>
);

export default ModalContainer;

ModalContainer.defaultProps = defaultProps;

const ModalDialog = styled.div<ModalProps>`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  position: relative;
  ${media.phone`
      padding-left: 0;
      padding-right: 0;
  `};
`;
const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Close = styled(MdClose)`
  cursor: pointer;
  color: white;
  fill: white;
  :hover,
  :active {
    opacity: 0.8;
  }
`;

const CloseBackground = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-overflow-scrolling: touch;
  z-index: -1;
`;

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const Container = styled(animated.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
  opacity: 0;
`;
