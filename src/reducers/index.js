import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  // courses,  // TODO: read more about "short-hand reducers name"
});

export default rootReducer;
