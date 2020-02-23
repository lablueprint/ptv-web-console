import React, { useState, useCallback, useMemo } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const INITIAL_FORM_STATE = {
  email: '',
};

export default function PasswordForgetForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    firebase
      .passwordReset(formState.email)
      .then(() => {
        setFormState(INITIAL_FORM_STATE);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [formState.email]);

  const onChange = useCallback((event) => {
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  const isInvalid = useMemo(() => formState.email === '', [formState.email]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={onChange}
        type="email"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
