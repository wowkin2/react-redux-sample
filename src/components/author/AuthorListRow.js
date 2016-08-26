import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, index, deleting, removeAuthor}) => {

  return (
    <tr>
      <td>{index + 1})</td>
      <td><Link to={'/author/' + author.id}>{author.firstName}</Link></td>
      <td><Link to={'/author/' + author.id}>{author.lastName}</Link></td>
      <td>
        <input
          type="submit"
          disabled={deleting}
          value={deleting ? 'Deleting...' : 'Delete'}
          className="btn btn-danger btn-xs"
          onClick={() => removeAuthor(author)}
        />
      </td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleting: PropTypes.bool.isRequired,
  removeAuthor: PropTypes.func.isRequired
};

export default AuthorListRow;
