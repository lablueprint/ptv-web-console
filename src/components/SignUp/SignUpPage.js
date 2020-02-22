import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  const { authUser, authLoading } = useContext(AuthUserContext);
  const history = useHistory();

  useEffect(() => {
    if (!authLoading && !!authUser) {
      history.push(ROUTES.LANDING);
    }
  }, [authLoading, authUser, history]);

  return authLoading ? null : (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}
