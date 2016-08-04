export default function courseReducer(state, action) {
  switch(action.type) {
    case 'CREATE_COURSE':
      return [
        ...state,  // TODO: investigate usage 3-fullstops
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
