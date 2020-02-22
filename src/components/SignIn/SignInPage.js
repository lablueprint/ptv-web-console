import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
import { AuthUserContext } from '../Session';
import { SignUpLink } from '../SignUp';
import SignInForm from './SignInForm';

export default function SignInPage() {
  const { authUser, authLoading } = useContext(AuthUserContext);
  const history = useHistory();

  useEffect(() => {
    if (!authLoading && !!authUser) {
      history.push(ROUTES.LANDING);
    }
  }, [authLoading, authUser, history]);

  return authLoading ? null : (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}
