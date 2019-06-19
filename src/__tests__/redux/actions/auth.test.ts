import { actions as authActions } from 'redux/ducks/auth.duck';

describe('Auth Actions', () => {
  test('should set user', () => {
    const action = authActions.setUserSuccess({
      type: 'SET_USER_SUCCESS',
      payload: {
        user: {},
      },
    });
    expect(action).toMatchSnapshot();
  });
  test('should set initial state on authLogout', () => {
    const action = authActions.authLogout();
    expect(action).toMatchSnapshot();
  });
});
