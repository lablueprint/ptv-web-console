import dashify from 'dashify';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useState } from 'react';

export default function useNewDocumentForm(collection, initialState) {
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      urlId: encodeURI(dashify(formState.title, { condense: true })),
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formState.title) {
      setError({ message: 'Title must not be empty' });
      return false;
    }

    const querySnapshot = await firebase
      .firestore()
      .collection(collection)
      .where('urlId', '==', formState.urlId)
      .get();

    if (!querySnapshot.empty) {
      setError({ message: 'The same or similar title already exists. Choose a different title.' });
      return false;
    }

    setError(null);
    setFormState(initialState);

    firebase
      .firestore()
      .collection(collection)
      .doc()
      .set(formState)
      .catch((err) => {
        setError(err);
      });

    return true;
  };

  const setCustomField = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  return {
    onChange, onSubmit, setCustomField, error, ...formState,
  };
}
