import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';

export default function NavigationNonAuth() {
  return (
    <div>
      <Button color="inherit" component={Link} to={ROUTES.SIGN_IN}>Sign In</Button>
    </div>
  );
}
