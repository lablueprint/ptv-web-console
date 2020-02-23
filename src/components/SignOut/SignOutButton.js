import React, { useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router';
import * as ROUTES from '../../constants/routes';

export default function SignOutButton() {
  const history = useHistory();

  const onClick = useCallback(() => {
    firebase.auth().signOut();
    history.push(ROUTES.LANDING);
  }, [history]);

  return (
    <button type="button" onClick={onClick}>
      Sign Out
    </button>
  );
}
