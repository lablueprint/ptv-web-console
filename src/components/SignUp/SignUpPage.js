import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import * as ROUTES from '../../constants/routes';
import SignUpForm from './SignUpForm';
import 'firebase/auth';

export default function SignUpPage() {
  const [user, initialising] = useAuthState(firebase.auth());
  const history = useHistory();

  useEffect(() => {
    if (!initialising && !!user) {
      history.push(ROUTES.LANDING);
    }
  }, [initialising, user, history]);

  return initialising ? null : (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}
