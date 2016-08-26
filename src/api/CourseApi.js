import 'whatwg-fetch';
import {checkStatus, parseJSON, restGet, restPost, restDelete, restPut} from './helpers';

const courses = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      restGet('/api/courses')
        .then(checkStatus)
        .then(parseJSON)
        .then(function (json) {
          Object.assign(courses, json.courses);
          resolve(Object.assign([], courses));
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      // Simulate server-side validation
      const minCourseTitleLength = 1;
      if (course.title.length < minCourseTitleLength) {
        reject(`Title must be at least ${minCourseTitleLength} characters.`);
      }

      let requestPromise;
      let suffix = '';

      if (course.id) {
        const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        courses.splice(existingCourseIndex, 1, course);
        requestPromise = restPut;
        suffix = '/' + course.id;
      } else {
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        course.id = generateId(course);
        course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        courses.push(course);

        requestPromise = restPost;
      }
      requestPromise('/api/course' + suffix, course)
        .then(checkStatus)
        .then(parseJSON)
        .then(function (json) {
          // Object.assign(courses, json.course);
          // resolve(Object.assign([], courses));
          resolve(course);
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      const indexCourse = courses.findIndex(course => course.id == courseId);
      if (indexCourse > -1) {
        courses.splice(indexCourse, 1);
      }

      restDelete('/api/course/' + courseId)
        .then(checkStatus)
        .then(function (json) {
          // just to refresh data
          resolve(Object.assign([], courses));
        })
        .catch(function(ex) {
          reject('Error during request.', ex);
        });
    });
  }
}

export default CourseApi;
