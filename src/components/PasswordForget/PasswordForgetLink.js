import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function PasswordForgetLink() {
  return (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );
}

export default PasswordForgetLink;
