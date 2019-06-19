import { createStore } from 'redux';
import rootReducer from 'redux/rootReducer';
import { history } from 'redux/store';
import { actions as authActions } from 'redux/ducks/auth.duck';
import { initialState } from '__mocks__';

describe('Store', () => {
  test('should set up default state', () => {
    const store = createStore(rootReducer(history));
    store.dispatch(authActions.authLogout());
    const actual = store.getState();
    const expected = initialState;

    expect(actual).toEqual(expected);
  });
});
