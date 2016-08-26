import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

class AuthorList extends React.Component {

  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.props.authors.map((author, index) =>
          <AuthorListRow
            key={author.id}
            author={author}
            index={index}
            deleting={false}
            removeAuthor={(author) => this.props.deleteAuthor(author)}
          />
        )}
        </tbody>
      </table>
    );
  }
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;
