import {
  actions as filtersActions,
  reducer as filtersReducers,
} from 'redux/ducks/filters.duck';
import { initialState } from '__mocks__';

const filtersInitialState = initialState.filters;

const sortBy = {
  value: 'vote_average',
  label: 'Rating',
};

const orderBy = {
  value: 'desc',
  label: 'Descending',
};

const rating = {
  min: 5,
  max: 10,
};
const runtime = {
  min: 45,
  max: 250,
};

describe('Filters Reducer', () => {
  test('should setup default filters state', () => {
    const state = filtersReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual(filtersInitialState);
  });
  test('should update sort filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      sortBy,
    });
    const state = filtersReducers(undefined, action);
    expect(state.sortBy).toMatchSnapshot();
  });
  test('should update order filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      orderBy,
    });
    const state = filtersReducers(undefined, action);
    expect(state.orderBy).toMatchSnapshot();
  });
  test('should update rating filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      rating,
    });
    const state = filtersReducers(undefined, action);
    expect(state.rating).toMatchSnapshot();
  });
  test('should update runtime filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      runtime,
    });
    const state = filtersReducers(undefined, action);
    expect(state.runtime).toMatchSnapshot();
  });
  test('should reset filters', () => {
    const action = filtersActions.resetFilters();
    const state = filtersReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
