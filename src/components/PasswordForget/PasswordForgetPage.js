import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import * as ROUTES from '../../constants/routes';
import PasswordForgetForm from './PasswordForgetForm';
import 'firebase/auth';

export default function PasswordForget() {
  const [user, initialising] = useAuthState(firebase.auth());
  const history = useHistory();

  useEffect(() => {
    if (!initialising && !!user) {
      history.push(ROUTES.SIGN_IN);
    }
  }, [initialising, user, history]);

  return initialising ? null : (
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
}
