import { Action, handleActions, createActions, Reducer } from 'redux-actions';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { toast } from 'react-toastify';
// CONSTANTS
import { API_KEY, PATH_BASE, PATH_MOVIE } from 'lib/constants/searchConfig';
// HELPERS
import { firebaseApp } from 'lib/firebase';
import { getObjectIds } from 'lib/helpers';

const getMovieObject = async movieId => {
  const movie = await fetch(
    `${PATH_BASE}${PATH_MOVIE}/${movieId}?api_key=${API_KEY}&append_to_response=videos`,
  ).then(response => response.json());
  return { ...movie, watchLater: true };
};

const initialState: IWatchLaterState = {
  watchLaterMovies: null,
  watchLaterIds: [],
  error: false,
};

const actions = createActions<IWatchLaterState>(
  'SET_WATCH_LATER_IDS_SUCCESS',
  'SET_WATCH_LATER_MOVIES_SUCCESS',
  'SET_WATCH_LATER_MOVIES_FAILURE',
);

const reducer: Reducer<IWatchLaterState, IWatchLaterState> = handleActions<
  IWatchLaterState,
  IWatchLaterState
>(
  {
    [actions.setWatchLaterIdsSuccess.toString()]: (
      state: IWatchLaterState,
      { payload: watchLaterIds }: Action<IWatchLaterState>,
    ) => ({
      ...state,
      watchLaterIds,
    }),
    [actions.setWatchLaterMoviesSuccess.toString()]: (
      state: IWatchLaterState,
      { payload: watchLaterMovies }: Action<IWatchLaterState>,
    ) => ({
      ...state,
      watchLaterMovies,
    }),
  },
  initialState,
);

const effects = {
  getAllWatchLaterMoviesFromList: () => async (
    dispatch: Dispatch,
  ): Promise<void> => {
    try {
      let watchLaterList;
      // @ts-ignore
      const userUid: string = firebaseApp.auth().currentUser.uid;

      if (userUid) {
        await firebaseApp
          .database()
          .ref(`${userUid}/watch-later`)
          .once('value')
          .then(snapshot => {
            watchLaterList = snapshot.val();
          });
        if (watchLaterList) {
          const moviesIdsArr = getObjectIds(watchLaterList);
          const promises = moviesIdsArr.map(item => {
            const movie = getMovieObject(item);
            return movie;
          });
          Promise.all(promises).then(userListMovies => {
            dispatch(actions.setWatchLaterMoviesSuccess(userListMovies));
          });
        } else {
          dispatch(actions.setWatchLaterMoviesSuccess(null));
        }
      }
    } catch (error) {
      dispatch(actions.setWatchLaterMoviesFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  addToWatchLaterList: (selectedMovie: number) => async (
    dispatch: Dispatch<any>,
    getState: () => IRootState,
  ): Promise<void> => {
    const { watchLaterIds } = getState().watchLater;
    // @ts-ignore
    const userUid: string = firebaseApp.auth().currentUser.uid;
    await firebaseApp
      .database()
      .ref(userUid)
      .child('watch-later')
      .update({
        [selectedMovie]: selectedMovie,
      });
    await dispatch(
      actions.setWatchLaterIdsSuccess([
        ...watchLaterIds,
        String(selectedMovie),
      ]),
    );
    await dispatch(effects.getAllWatchLaterMoviesFromList());
    await toast.success('The new movie has been added to watch later');
  },
  removeFromWatchLaterList: selectedMovie => async (
    dispatch: Dispatch<any>,
    getState: () => IRootState,
  ): Promise<void> => {
    const { watchLaterIds } = getState().watchLater;

    // @ts-ignore
    const userUid: string = firebaseApp.auth().currentUser.uid;

    await firebaseApp
      .database()
      .ref(userUid)
      .child('watch-later')
      .child(selectedMovie)
      .remove();

    dispatch(
      actions.setWatchLaterIdsSuccess(
        watchLaterIds.filter(id => id !== String(selectedMovie)),
      ),
    );
    await dispatch(effects.getAllWatchLaterMoviesFromList());
    await toast.success('The new movie has been removed from watch later');
  },
};

const getState = state => state.watchLater;
const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getWatchLaterIds: cs(s => s.watchLaterIds),
  getWatchLaterMovies: cs(s => s.watchLaterMovies),
  getErrors: cs(s => s.error),
  getLoading: cs(s => s.loading),
};

export { initialState as state, reducer, actions, selectors, effects };
