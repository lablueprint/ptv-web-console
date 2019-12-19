import React from 'react';
import PropTypes from 'prop-types';
import AuthUserContext from './context';
import Firebase, { withFirebase } from '../Firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        authLoading: true,
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.auth.onAuthStateChanged((authUser) => {
        this.setState({ authUser: authUser || null, authLoading: !authUser });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser, authLoading } = this.state;
      return (
        <AuthUserContext.Provider value={{ authUser, authLoading }}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  WithAuthentication.propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired,
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
