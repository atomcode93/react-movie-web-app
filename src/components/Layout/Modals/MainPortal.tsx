import * as React from 'react';
import { createPortal } from 'react-dom';
// TYPES
interface Props {
  children: JSX.Element[];
};

const defaultProps = {
  modalRoot: document.getElementById('modal-root'),
};
type DefaultProps = Readonly<typeof defaultProps>;

// EXPORTED COMPONENT
const MainPortal: React.FC<Props & Partial<DefaultProps>> = ({ children, modalRoot }): React.ReactPortal =>
  createPortal(children, modalRoot as HTMLElement);

MainPortal.defaultProps = defaultProps;

export default MainPortal;
