import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authors: Object.assign({}, props.authors),
      errors: {},
      deleting: false
    };

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAPIAuthor = this.deleteAPIAuthor.bind(this);
  }

  authorRow(author, index) {
    return <div key={index}>{author.firstName} {author.lastName}</div>;
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  deleteAPIAuthor(author) {
    // event.preventDefault();
    if (!confirm("Are you sure, that you want to remove this author?")) {
      return false;
    }

    this.setState({deleting: true});
    this.props.actions.deleteAuthor(author)
      .then(() => this.redirect('Author removed'))
      .catch(error => {
        toastr.error(error);
        this.setState({deleting: false});
      });
  }

  redirect(message) {
    this.setState({saving: false});
    toastr.success(message);
    this.context.router.push('/authors');
  }

  render() {

    return (
      <div>
        <h1>Authors&nbsp;
          <button onClick={this.redirectToAddAuthorPage}
                  className="btn btn-default"
                  style={{fontSize: '10px'}}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </h1>
        <AuthorList
          authors={this.props.authors}
          errors={this.state.errors}
          deleting={this.state.deleting}
          deleteAuthor={this.deleteAPIAuthor}
        />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
AuthorsPage.contextTypes = {
  router: PropTypes.object
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
