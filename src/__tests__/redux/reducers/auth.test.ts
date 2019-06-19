import {
  actions as authActions,
  reducer as authReducers,
} from 'redux/ducks/auth.duck';
import { initialState } from '__mocks__';

const authInitialState = initialState.auth;

describe('Auth Reducer', () => {
  test('should setup default modals state', () => {
    const state = authReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual(authInitialState);
  });
  test('should set user', () => {
    const action = authActions.setUserSuccess({
      type: 'SET_USER_SUCCESS',
      payload: {
        user: {},
      },
    });
    const state = authReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
  test('should set initial state on authLogout', () => {
    const action = authActions.authLogout();
    const state = authReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
