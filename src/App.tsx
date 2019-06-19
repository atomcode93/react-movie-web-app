import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { hot } from 'react-hot-loader/root';
import configureStore from 'redux/store';
// THEMES
import { primaryTheme, GlobalStyle } from 'lib/styles';
// ROUTES
import Routes from 'pages/RootRoutes';

const { store, persistor, history } = configureStore();

// EXPORTED APP
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={primaryTheme}>
          <React.Fragment>
            <Routes />
            <GlobalStyle />
          </React.Fragment>
        </ThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default hot(App);
