import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import PasswordForgetForm from './PasswordForgetForm';

export default function PasswordForget() {
  const { authUser, authLoading } = useContext(AuthUserContext);
  const history = useHistory();

  useEffect(() => {
    if (!authLoading && !!authUser) {
      history.push(ROUTES.LANDING);
    }
  }, [authLoading, authUser, history]);

  return authLoading ? null : (
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
}
