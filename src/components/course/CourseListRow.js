import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, index}) => {
  return (
    <tr>
      <td>{index + 1})</td>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td><Link to={'/author/' + course.authorId}>{course.authorId}</Link></td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default CourseListRow;
