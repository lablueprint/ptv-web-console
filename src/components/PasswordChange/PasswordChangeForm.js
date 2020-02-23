import React, { useState, useCallback, useMemo } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const INITIAL_FORM_STATE = {
  password: '',
  confirmPassword: '',
};

export default function PasswordChangeForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    firebase
      .auth()
      .passwordUpdate(formState.password)
      .then(() => {
        setFormState(INITIAL_FORM_STATE);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [formState.password]);

  const onChange = useCallback((event) => {
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  const isInvalid = useMemo(() => formState.password !== formState.confirmPassword || formState.password === '',
    [formState.confirmPassword, formState.password]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="password"
        value={formState.password}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
