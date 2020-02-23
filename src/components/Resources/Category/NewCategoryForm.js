import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
};

export default function NewCategoryForm() {
  const history = useHistory();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const docRef = firebase.firestore().collection('resource_categories').doc();
    docRef.set(formState)
      .then(() => {
        history.push(`/resources/${docRef.id}`);
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

  return (
    <form onSubmit={onSubmit}>
      <input
        name="title"
        type="text"
        value={formState.title}
        onChange={onChange}
        placeholder="Title"
      />
      <input
        name="description"
        type="text"
        value={formState.description}
        onChange={onChange}
        placeholder="Description"
      />
      <button type="submit">Create category</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
