import * as types from '../actions/actionsTypes';

export default function courseReducer(state = [], action) {
  switch(action.type) {
    case types.CREATE_COURSE:
      return [
        ...state,  // TODO: investigate usage 3-fullstops
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
