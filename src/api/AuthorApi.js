import 'whatwg-fetch';
import {checkStatus, parseJSON, restGet, restPost, restDelete, restPut} from './helpers';

const authors = [];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve, reject) => {
      restGet('/api/authors')
        .then(checkStatus)
        .then(parseJSON)
        .then(function (json) {
          Object.assign(authors, json.authors);
          resolve(Object.assign([], authors));
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }

  static saveAuthor(author) {
    author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      // Simulate server-side validation
      const minAuthorNameLength = 3;
      if (author.firstName.length < minAuthorNameLength) {
        reject(`First Name must be at least ${minAuthorNameLength} characters.`);
      }

      if (author.lastName.length < minAuthorNameLength) {
        reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
      }

      let requestPromise;
      let suffix = '';

      if (author.id) {
        const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
        authors.splice(existingAuthorIndex, 1, author);
        requestPromise = restPut;
        suffix = '/' + author.id;
      } else {
        //Just simulating creation here.
        //The server would generate ids for new authors in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        author.id = generateId(author);

        authors.push(author);

        requestPromise = restPost;
      }
      requestPromise('/api/author' + suffix, author)
        .then(checkStatus)
        .then(function (json) {
          // Object.assign(authors, json.author);
          resolve(author);
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve, reject) => {
      const indexAuthor = authors.findIndex(author => author.id == authorId);
      if (indexAuthor > -1) {
        authors.splice(indexAuthor, 1);
      }

      restDelete('/api/author/' + authorId)
        .then(checkStatus)
        .then(function (json) {
          // just to refresh data
          resolve(Object.assign([], authors));
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }
}

export default AuthorApi;
