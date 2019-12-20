import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Firebase, { withFirebase } from '../Firebase';
import AuthUserContext from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          history.push(ROUTES.LANDING);
          alert('You are not authorized to view this page.');
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {({ authUser }) => {
            if (condition(authUser)) {
              return <Component {...this.props} />;
            }
            return null;
          }}
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
