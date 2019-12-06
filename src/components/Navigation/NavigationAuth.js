import React from 'react';
import { SignOutButton } from '../SignOut';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function NavigationAuth() {
  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
}
