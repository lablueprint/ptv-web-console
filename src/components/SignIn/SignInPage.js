import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import SignInForm from './SignInForm';
import 'firebase/auth';

export default function SignInPage() {
  const [user, initialising] = useAuthState(firebase.auth());
  const history = useHistory();

  useEffect(() => {
    if (!initialising && !!user) {
      history.push(ROUTES.LANDING);
    }
  }, [initialising, user, history]);

  return initialising ? null : (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}
