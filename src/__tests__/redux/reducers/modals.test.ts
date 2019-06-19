import {
  actions as modalsActions,
  reducer as modalsReducers,
} from 'redux/ducks/modals.duck';
import { initialState } from '__mocks__';

const modalsInitialState = initialState.modals;

describe('Modals Reducer', () => {
  test('should setup default modals state', () => {
    const state = modalsReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual(modalsInitialState);
  });
  test('should open modal', () => {
    const action = modalsActions.openModal({
      type: 'video',
    });
    const state = modalsReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
  test('should close modal', () => {
    const action = modalsActions.closeModal();
    const state = modalsReducers(undefined, action);
    expect(state).toMatchSnapshot();
  });
});
