import React, { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import firebase from 'firebase/app';
import * as ROUTES from '../../constants/routes';
import 'firebase/auth';

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const { email, password } = formState;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [formState, history]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  const isInvalid = useMemo(() => formState.password === '' || formState.email === '',
    [formState.email, formState.password]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={formState.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
