import React from 'react';
import PropTypes from 'prop-types';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';

export default function Navigation({ authenticated }) {
  return authenticated ? <NavigationAuth /> : <NavigationNonAuth />;
}

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
