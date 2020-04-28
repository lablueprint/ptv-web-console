import React, { useMemo, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../Context';

export default function RouteWithAuth({ signedOutOnly, children, ...rest }) {
  const { user, initialising } = useContext(AuthContext);

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
  signedOutOnly: PropTypes.bool,
};

RouteWithAuth.defaultProps = {
  signedOutOnly: false,
};
