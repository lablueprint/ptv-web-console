import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function PasswordForgetLink() {
  return (
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  );
}
