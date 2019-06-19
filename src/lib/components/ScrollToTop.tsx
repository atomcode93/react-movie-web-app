import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Location } from 'history';
// HOOKS
import { usePrevious } from 'lib/hooks';


interface IScrollToTopProps extends RouteComponentProps {
  children: JSX.Element;
  location: Location;
}

const { useEffect } = React;

const ScrollToTop:  React.FC<IScrollToTopProps> = ({ children, location }) => {
  const prevLocation = usePrevious(location.pathname);
  useEffect(() => {
    if (prevLocation && prevLocation !== location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return children;
};

export default withRouter(ScrollToTop);