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

      if (author.id) {
        const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
        authors.splice(existingAuthorIndex, 1, author);
      } else {
        //Just simulating creation here.
        //The server would generate ids for new authors in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        author.id = generateId(author);
        authors.push(author);
      }
      restPost('/api/author', author)
        .then(parseJSON)
        .then(function (json) {
          Object.assign(authors, json.author);
          resolve(Object.assign([], authors));
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });

      resolve(author);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve, reject) => {
      const indexAuthor = authors.findIndex(author => author.id == authorId);
      if (indexAuthor > -1) {
        authors.splice(indexAuthor, 1);
      }

      restDelete('/api/author/' + authorId)
        .then(parseJSON)
        .then(function (json) {})
        .catch(function(ex) {
          reject('Error during request.', ex);
        });

      resolve(Object.assign([], authors));
    });
  }
}

export default AuthorApi;
