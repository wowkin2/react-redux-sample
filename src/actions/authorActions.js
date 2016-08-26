import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

import ApiReal from '../api/AuthorApi';
import ApiMock from '../api/AuthorApi.mock';

let Api;
if (process.env.NODE_ENV == 'production') {
  Api = ApiReal;
} else {
  Api = ApiMock;
}

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}

export function deleteAuthorSuccess(authors) {
  return {type: types.DELETE_AUTHOR_SUCCESS, authors};
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return Api.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return Api.saveAuthor(author).then(author => {
      author.id ? dispatch(updateAuthorSuccess(author)) :
        dispatch(createAuthorSuccess(author));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteAuthor(author) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return Api.deleteAuthor(author.id).then(authors => {
      dispatch(deleteAuthorSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}
