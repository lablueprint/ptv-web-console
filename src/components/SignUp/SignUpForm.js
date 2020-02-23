import React, { useState, useCallback, useMemo } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import * as ROUTES from '../../constants/routes';
import ROLES from '../../constants/roles';
import 'firebase/auth';

const INITIAL_FORM_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
};

export default function SignUpForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(formState.email, formState.password)
      .then((userCredential) => firebase.collection('users')
        .doc(userCredential.user.uid)
        .set({
          email: formState.email,
          role: formState.role,
        }))
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [formState.email, formState.password, formState.role, history]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  const isInvalid = useMemo(() => (
    formState.password !== formState.confirmPassword
      || formState.password === ''
      || formState.email === ''
      || formState.username === ''
      || formState.role === ''),
  [formState.confirmPassword, formState.email, formState.password,
    formState.role, formState.username]);

  const roleRadioButtons = Object.entries(ROLES).map((kv, i) => (
    <label htmlFor={i}>
      <input
        name="role"
        id={i}
        key={kv[0]}
        type="radio"
        onChange={onChange}
        value={kv[0]}
      />
      {kv[0]}
    </label>
  ));

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={formState.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
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
      <input
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      {roleRadioButtons}
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
