import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';

export default function RouteWithAuth({
  initialising, user, signedOutOnly, children, ...rest
}) {
  const render = useMemo(() => {
    if (signedOutOnly) {
      return () => (user ? <Redirect to={ROUTES.RESOURCES} /> : children);
    }
    return () => (user ? children : <Redirect to={ROUTES.SIGN_IN} />);
  }, [children, signedOutOnly, user]);

  return !initialising && (
    <Route
      {...rest}
      render={render}
    />
  );
}

RouteWithAuth.propTypes = {
  children: PropTypes.element.isRequired,
  initialising: PropTypes.bool,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
  signedOutOnly: PropTypes.bool,
};

RouteWithAuth.defaultProps = {
  initialising: null,
  user: null,
  signedOutOnly: false,
};
