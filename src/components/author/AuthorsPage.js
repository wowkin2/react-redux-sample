import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  authorRow(author, index) {
    return <div key={index}>{author.firstName} {author.lastName}</div>;
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors&nbsp;
          <button onClick={this.redirectToAddAuthorPage}
                  className="btn btn-default"
                  style={{fontSize: '10px'}}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </h1>
        <AuthorList authors={authors}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
