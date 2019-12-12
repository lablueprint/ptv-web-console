import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function NavigationNonAuth() {
  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );
}
