import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

class CourseList extends React.Component {

  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Link</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
        </thead>
        <tbody>
        {this.props.courses.map((course, index) =>
          <CourseListRow
            key={course.id}
            course={course}
            index={index}
            deleting={false}
            removeCourse={(course) => this.props.deleteCourse(course)}
          />
        )}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseList;
