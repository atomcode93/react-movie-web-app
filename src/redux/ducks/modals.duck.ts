import { Action, createActions, handleActions, Reducer } from 'redux-actions';
import { createSelector } from 'reselect';

const initialState: IModalsState = {
  type: null,
  open: false,
  args: null,
};

const actions = createActions<IModalsState>('OPEN_MODAL', 'CLOSE_MODAL');
const reducer: Reducer<IModalsState, IModalsState> = handleActions<
  IModalsState,
  IModalsState
>(
  {
    [actions.openModal.toString()]: (
      state: IModalsState,
      { payload }: Action<IModalsState>,
    ) => ({
      ...state,
      ...payload,
      open: true,
    }),
    [actions.closeModal.toString()]: () => initialState,
  },
  initialState,
);

const getState = state => state.modals;
const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getType: cs(s => s.type),
  getOpen: cs(s => s.open),
  getArgs: cs(s => s.args),
};

export { initialState as state, reducer, actions, selectors };
