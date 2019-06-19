import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// HOOKS
import { useSetGlobalEventHandler } from 'lib/hooks';
// DUCKS
import { actions, selectors } from 'redux/ducks/modals.duck';

const { useEffect } = React;

// TYPES
interface InjectedProps {
  open: boolean;
  args: any;
  type: string;
  closeModal: () => void;
}

// EXPORTED HOC
const withModalState = <P extends InjectedProps>(
  Component: React.ComponentType<P>,
): React.FC<P & InjectedProps> => props => {
  const { open, closeModal } = props;

  const onEscKeyPressed = event => {
    if (event.keyCode === 27 && open) {
      closeModal();
      return null;
    }
    return null;
  };

  useEffect(() => {
    if (open) {
      const body: HTMLBodyElement = document.querySelector(
        'body',
      ) as HTMLBodyElement;
      body.style.overflow = 'hidden';
    }
    if (!open) {
      const body: HTMLBodyElement = document.querySelector(
        'body',
      ) as HTMLBodyElement;
      body.style.overflow = 'auto';
    }
  }, [open]);

  useSetGlobalEventHandler(window, 'keydown', onEscKeyPressed, open);
  return <Component {...props} />;
};

export default compose(
  connect(
    state => ({
      open: selectors.getOpen(state),
      args: selectors.getArgs(state),
      type: selectors.getType(state),
    }),
    { ...actions },
  ),
  withModalState,
);
