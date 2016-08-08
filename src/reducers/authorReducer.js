import * as types from '../actions/actionsTypes';
import initial_state from './initialState';

export default function authorReducer(state = initial_state.authors, action) {
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
