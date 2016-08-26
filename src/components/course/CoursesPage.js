import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: Object.assign({}, props.courses),
      errors: {},
      deleting: false
    };

    this.deleteAPICourse = this.deleteAPICourse.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteAPICourse(course) {
    // event.preventDefault();
    if (!confirm("Are you sure, that you want to remove this course?")) {
      return false;
    }

    this.setState({deleting: true});
    this.props.actions.deleteCourse(course)
      .then(() => this.redirect('Course removed'))
      .catch(error => {
        toastr.error(error);
        this.setState({deleting: false});
      });
  }

  redirect(message) {
    this.setState({saving: false});
    toastr.success(message);
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <h1>Courses&nbsp;
          <button onClick={this.redirectToAddCoursePage}
                  className="btn btn-default"
                  style={{fontSize: '10px'}}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </h1>
        <CourseList
          courses={this.props.courses}
          errors={this.state.errors}
          deleting={this.state.deleting}
          deleteCourse={this.deleteAPICourse}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
CoursesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
