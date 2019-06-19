import * as React from 'react';
import { useTransition, config } from 'react-spring';
// HOCS
import { withModalState } from 'components/HOC';
// COMPONENTS
import MainPortal from './MainPortal';
import RenderModals from './renderModals';
import ModalContainer from './ModalContainer';

interface Props {
  closeModal: any;
  open: boolean;
  type: string;
  args: any;
}

const { useEffect, useState } = React;

// EXPORTED COMPONENT
const ModalRenderer: React.FC<Props> = (rest: Props) => {
  const { open } = rest;
  const [isOpen, set] = useState(open);
  useEffect(() => set(open), [open]);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translateY(-10%)' },
    enter: { opacity: 1, transform: 'translateY(10%)' },
    leave: { opacity: 0, transform: 'translateY(-30%)' },
    config: {
      ...config.default,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 0.01,
      overshootClamping: true,
    },
  });
  return (
    <MainPortal>
      {/* @ts-ignore */}
      {transitions.map(({ item, key, props }) =>
        item ? (
          <ModalContainer key={key} style={props} maxWidth={700} {...rest}>
            {<RenderModals {...rest} />}
          </ModalContainer>
        ) : null,
      )}
    </MainPortal>
  );
};

export default withModalState(ModalRenderer);
