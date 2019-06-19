import * as React from 'react';
import * as ReactDOM from 'react-dom';

const defaultProps = {
  sidebarRoot: document.getElementById('modal-sidebar'),
};

interface Props {
  children: JSX.Element[];
}

type DefaultProps = Readonly<typeof defaultProps>;
// EXPORTED COMPONENT
const SidebarPortal: React.FC<Props & Partial<DefaultProps>> = ({
  children,
  sidebarRoot,
}): React.ReactPortal =>
  ReactDOM.createPortal(children, sidebarRoot as HTMLElement);

SidebarPortal.defaultProps = defaultProps;

export default SidebarPortal;
