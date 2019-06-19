import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import transforms, { blacklist, whitelist } from 'redux/transformFilters';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';
// PERSIST STORE
const persistConfig = {
  key: 'root',
  storage,
  blacklist,
  whitelist,
  transforms,
};

export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const middleware = composeWithDevTools(
  applyMiddleware(thunk, routerMiddleware(history)),
);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(persistedReducer);
      });
    }
  }
  return { store, persistor, history };
};
