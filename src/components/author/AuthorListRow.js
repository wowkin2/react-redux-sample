import React, {PropTypes} from 'react';

const AuthorListRow = ({author}) => {
  return (
    <tr>
      <td></td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
