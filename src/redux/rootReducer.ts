import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import * as reducers from './ducks';

export default (history: History) =>
  combineReducers<IRootState>({
    router: connectRouter(history),
    ...reducers,
  });
