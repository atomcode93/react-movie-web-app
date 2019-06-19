import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
// COMPONENTS
import { ErrorScreen, LoadingScreen } from 'components/Layout/Screens';
import { MainLayout } from 'components/Layout/Layouts';

type Props = {
  component: React.ComponentType<any>;
  rest?: any;
};

const MainTemplate: React.FC<Props & RouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: any) => (
      <ErrorScreen>
        <MainLayout {...props}>
          <Component
            {...props}
            {...rest}
            fallback={<LoadingScreen {...props} />}
          />
        </MainLayout>
      </ErrorScreen>
    )}
  />
);

export default MainTemplate;
