import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
  courses: courses,
  // courses,  // TODO: read more about "short-hand reducers name"
});

export default rootReducer;
