import { actions as modalsActions } from 'redux/ducks/modals.duck';
import { initialState } from '__mocks__';

describe('Filters Actions', () => {
  test('should open modal', () => {
    const action = modalsActions.openModal({
      type: 'video',
    });
    expect(action).toEqual({
      type: 'OPEN_MODAL',
      payload: {
        type: 'video',
      },
    });
  });
  test('should close modal', () => {
    const action = modalsActions.closeModal();
    expect(action).toMatchSnapshot();
  });
});
