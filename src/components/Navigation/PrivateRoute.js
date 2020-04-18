import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';

export default function PrivateRoute({ children, ...rest }) {
  const [user, initialising] = useAuthState(firebase.auth());
  return (
    <Route
      {...rest}
      render={({ location }) => (!initialising && user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.SIGN_IN,
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
