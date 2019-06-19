import { Action, handleActions, createActions, Reducer } from 'redux-actions';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
// API
import api from 'lib/api';

const initialState: IMoviesState = {
  movies: null,
  movie: null,
  popularMovies: null,
  soonMovies: null,
  topRatedMovies: null,
  favorites: [],
  watchLater: null,
  loading: false,
  error: false,
};

const actions = createActions<IMoviesState>(
  'FETCH_MOVIES_REQUEST',
  'FETCH_MOVIES_SUCCESS',
  'FETCH_MOVIES_FAILURE',
  'FETCH_MOVIE_REQUEST',
  'FETCH_MOVIE_SUCCESS',
  'FETCH_MOVIE_FAILURE',
  'FETCH_POPULAR_MOVIES_REQUEST',
  'FETCH_POPULAR_MOVIES_SUCCESS',
  'FETCH_POPULAR_MOVIES_FAILURE',
  'FETCH_SOON_MOVIES_REQUEST',
  'FETCH_SOON_MOVIES_SUCCESS',
  'FETCH_SOON_MOVIES_FAILURE',
  'FETCH_TOP_RATED_MOVIES_REQUEST',
  'FETCH_TOP_RATED_MOVIES_SUCCESS',
  'FETCH_TOP_RATED_MOVIES_FAILURE',
  'FETCH_MOVIE_BY_QUERY_REQUEST',
  'FETCH_MOVIE_BY_QUERY_SUCCESS',
  'FETCH_MOVIE_BY_QUERY_FAILURE',
  'CLEAR_MOVIE',
);

const reducer: Reducer<IMoviesState, IMoviesState> = handleActions<
  IMoviesState,
  IMoviesState
>(
  {
    [actions.fetchMoviesRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchMoviesSuccess.toString()]: (
      state: IMoviesState,
      action: Action<IMoviesState>,
    ) => {
      const { page, results }: any = action.payload;
      const oldResults: any[] =
        state.movies && page !== 1 ? state.movies.results : [];
      return {
        ...state,
        movies: {
          ...action.payload,
          page,
          results: [...oldResults, ...results],
        },
        loading: false,
      };
    },
    [actions.fetchMoviesFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.fetchMovieRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchMovieSuccess.toString()]: (
      state: IMoviesState,
      { payload: movie }: Action<IMoviesState>,
    ) => ({
      ...state,
      movie,
      loading: false,
    }),
    [actions.fetchMovieFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.fetchMovieByQueryRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchMovieByQuerySuccess.toString()]: (
      state: IMoviesState,
      { payload: movie }: Action<IMoviesState>,
    ) => ({
      ...state,
      movie,
      loading: false,
    }),
    [actions.fetchMovieByQueryFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.fetchPopularMoviesRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchPopularMoviesSuccess.toString()]: (
      state: IMoviesState,
      action: Action<IMoviesState>,
    ) => {
      const { results }: any = action.payload;
      const oldResults: any[] = state.popularMovies
        ? state.popularMovies.results
        : [];
      return {
        ...state,
        popularMovies: {
          ...action.payload,
          results: [...oldResults, ...results],
        },
        loading: false,
      };
    },
    [actions.fetchPopularMoviesFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.fetchSoonMoviesRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchSoonMoviesSuccess.toString()]: (
      state: IMoviesState,
      action: Action<IMoviesState>,
    ) => {
      const { results }: any = action.payload;
      const oldResults: any[] = state.soonMovies
        ? state.soonMovies.results
        : [];
      return {
        ...state,
        soonMovies: {
          ...action.payload,
          results: [...oldResults, ...results],
        },
        loading: false,
      };
    },
    [actions.fetchSoonMoviesFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.fetchTopRatedMoviesRequest.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: true,
    }),
    [actions.fetchTopRatedMoviesSuccess.toString()]: (
      state: IMoviesState,
      action: Action<IMoviesState>,
    ) => {
      const { results }: any = action.payload;
      const oldResults: any[] = state.topRatedMovies
        ? state.topRatedMovies.results
        : [];
      return {
        ...state,
        topRatedMovies: {
          ...action.payload,
          results: [...oldResults, ...results],
        },
        loading: false,
      };
    },
    [actions.fetchTopRatedMoviesFailure.toString()]: (state: IMoviesState) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [actions.clearMovie.toString()]: (state: IMoviesState) => ({
      ...state,
      movie: null,
    }),
  },
  initialState,
);

const effects = {
  fetchMovies: (page: number, filters: IFiltersState) => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchMoviesRequest());
      const data = await api.getMovies(page, filters);
      await dispatch(actions.fetchMoviesSuccess(data));
    } catch (error) {
      dispatch(actions.fetchMoviesFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  fetchMovie: (id: number) => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchMovieRequest());
      const data = await api.getMovie(id);
      await dispatch(actions.fetchMovieSuccess(data));
      return data;
    } catch (error) {
      dispatch(actions.fetchMovieFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  fetchMovieByQuery: (name: string = '') => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchMovieByQueryRequest());
      const data = await api.getSearchMovie(name);
      await dispatch(actions.fetchMovieByQuerySuccess(data));
    } catch (error) {
      dispatch(actions.fetchMovieByQueryFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  fetchPopularMovies: (page: number) => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchPopularMoviesRequest());
      const data = await api.getPopularMovies(page);
      await dispatch(actions.fetchPopularMoviesSuccess(data));
    } catch (error) {
      dispatch(actions.fetchPopularMoviesFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  fetchSoonMovies: (page: number) => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchSoonMoviesRequest());
      const data = await api.getSoonMovies(page);
      await dispatch(actions.fetchSoonMoviesSuccess(data));
    } catch (error) {
      dispatch(actions.fetchSoonMoviesFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
  fetchTopRatedMovies: (page: number) => async (
    dispatch: Dispatch<any>,
  ): Promise<void> => {
    try {
      await dispatch(actions.fetchTopRatedMoviesRequest());
      const data = await api.getTopRatedMovies(page);
      await dispatch(actions.fetchTopRatedMoviesSuccess(data));
    } catch (error) {
      dispatch(actions.fetchTopRatedMoviesFailure(error.message));
      return new Promise(resolve => resolve(error.message));
    }
  },
};

const getState = state => state.movies;
const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getMovies: cs(s => s.movies),
  getMovie: cs(s => s.movie),
  getPopularMovies: cs(s => s.popularMovies),
  getTopRatedMovies: cs(s => s.topRatedMovies),
  getSoonMovies: cs(s => s.soonMovies),
  getErrors: cs(s => s.error),
  getLoading: cs(s => s.loading),
};

export { initialState as state, reducer, actions, selectors, effects };
