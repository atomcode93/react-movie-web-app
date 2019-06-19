import { Action, createActions, handleActions, Reducer } from 'redux-actions';
import { createSelector } from 'reselect';

const initialState: IFiltersState = {
  rating: {
    min: 5,
    max: 10,
  },
  runtime: {
    min: 45,
    max: 250,
  },
  sort_by: {
    value: 'vote_average',
    label: 'Rating',
  },
  order: {
    value: 'desc',
    label: 'Descending',
  },
  year: new Date().getFullYear(),
};

const actions = createActions<IFiltersState>('RESET_FILTERS', 'UPDATE_FILTERS');

const reducer: Reducer<IFiltersState, IFiltersState> = handleActions<
  IFiltersState,
  IFiltersState
>(
  {
    [actions.resetFilters.toString()]: () => initialState,
    [actions.updateFilters.toString()]: (
      state: IFiltersState,
      { payload: filters }: Action<IFiltersState>,
    ) => ({
      ...state,
      ...filters,
    }),
  },
  initialState,
);

const effects = {};

const getState = state => state.filters;
const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getFilters: cs(s => s),
  getErrors: cs(s => s.error),
};

export { initialState as state, reducer, actions, selectors, effects };
