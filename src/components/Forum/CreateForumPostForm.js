import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const INITIAL_FORM_STATE = {
  title: '',
  body: '',
};

export default function CreateForumPostForm() {
  const [user, initialising] = useAuthState(firebase.auth());

  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);

    const currTime = firebase.firestore.Timestamp.now();

    const record = {
      ...formState,
      userID: user ? user.uid : null,
      createdAt: currTime,
      updatedAt: currTime,
    };

    firebase.firestore().collection('forum_posts').add(record)
      .then(() => {
        setFormState(INITIAL_FORM_STATE);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, [formState, user]);

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
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {(loading || initialising) && <CircularProgress />}
      <form onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          value={formState.title}
          onChange={onChange}
          placeholder="Title"
        />
        <input
          name="body"
          type="text"
          value={formState.body}
          onChange={onChange}
          placeholder="Body"
        />
        <button type="submit" disabled={loading || initialising}>Submit Post</button>
      </form>
    </div>
  );
}