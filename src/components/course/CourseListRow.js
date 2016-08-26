import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, index, deleting, removeCourse}) => {
  return (
    <tr>
      <td>{index + 1})</td>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td><Link to={'/author/' + course.authorId}>{course.authorId}</Link></td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td>
        <input
          type="submit"
          disabled={deleting}
          value={deleting ? 'Deleting...' : 'Delete'}
          className="btn btn-danger btn-xs"
          onClick={() => removeCourse(course)}
        />
      </td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleting: PropTypes.bool.isRequired,
  removeCourse: PropTypes.func.isRequired
};

export default CourseListRow;
