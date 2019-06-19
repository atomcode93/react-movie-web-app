import { actions as filtersActions } from 'redux/ducks/filters.duck';
import { initialState } from '__mocks__';

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

describe('Filters Actions', () => {
  test('should update sort filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      sortBy,
    });
    expect(action).toEqual({
      type: 'UPDATE_FILTERS',
      payload: {
        ...initialState.filters,
        sortBy,
      },
    });
  });
  test('should update order filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      orderBy,
    });
    expect(action).toEqual({
      type: 'UPDATE_FILTERS',
      payload: {
        ...initialState.filters,
        orderBy,
      },
    });
  });
  test('should update rating filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      rating,
    });
    expect(action).toEqual({
      type: 'UPDATE_FILTERS',
      payload: {
        ...initialState.filters,
        rating,
      },
    });
  });
  test('should update runtime filter', () => {
    const action = filtersActions.updateFilters({
      ...initialState.filters,
      runtime,
    });
    expect(action).toEqual({
      type: 'UPDATE_FILTERS',
      payload: {
        ...initialState.filters,
        runtime,
      },
    });
  });
  test('should reset filters', () => {
    const action = filtersActions.resetFilters();
    expect(action).toEqual({
      type: 'RESET_FILTERS',
    });
  });
});
