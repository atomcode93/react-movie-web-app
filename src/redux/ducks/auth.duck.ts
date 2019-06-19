import { Action, createActions, handleActions, Reducer } from 'redux-actions';
import { push } from 'connected-react-router';
import { createSelector } from 'reselect';
import { toast } from 'react-toastify';
import { lensPath, view } from 'ramda';
import { firebaseApp } from 'lib/firebase';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  error: false,
};

const actions = createActions<IAuthState>(
  'SET_USER_SUCCESS',
  'SET_USER_FAILURE',
  'AUTH_LOGOUT',
);

const reducer: Reducer<IAuthState, IAuthState> = handleActions<
  IAuthState,
  IAuthState
>(
  {
    [actions.setUserSuccess.toString()]: (
      state: IAuthState,
      { payload: user }: Action<IAuthState>,
    ) => ({
      ...state,
      isAuthenticated: true,
      user,
    }),
    [actions.setUserFailure.toString()]: (state: IAuthState) => ({
      ...state,
      isAuthenticated: false,
      error: true,
    }),
    [actions.authLogout.toString()]: () => initialState,
  },
  initialState,
);
const effects = {
  authLogin: (
    { email, password },
    setErrors,
    setSubmitting,
  ) => async dispatch => {
    const url = window.history.state.state;
    try {
      let data;
      const providers = await firebaseApp.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        data = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);
      }
      data = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
      await Promise.all([
        dispatch(actions.setUserSuccess(data.user)),
        setSubmitting(false),
        toast.success("You've been successfully authenticated"),
      ]);

      return await dispatch(push(url));
    } catch (error) {
      setSubmitting(false);
      if (error) {
        const message = view(lensPath(['message']), error);
        toast.error('There must be an error occured while logging in');
        return new Promise(resolve => resolve(setErrors({ form: message })));
      }
      return new Promise(resolve => resolve(error));
    }
  },
  authWithSocialNetwork: (provider: any) => async dispatch => {
    const url = window.history.state.state;
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch(push(url));
        toast.success("You've been successfully authenticated");
      })
      .catch(() => {
        dispatch(push('/'));
        toast.error('There must be an error occured while logging in');
      });
  },
  authLogout: () => async dispatch => {
    await firebaseApp.auth().signOut();
    await dispatch(actions.authLogout());
    await dispatch(push('/login'));
    await toast.success("You've been successfully unauthenticated");
  },
};

const getState = state => state.auth;
const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getUser: cs(s => s.user),
  getAuth: cs(s => s.isAuthenticated),
  getErrors: cs(s => s.error),
};

export { initialState as state, reducer, actions, selectors, effects };
