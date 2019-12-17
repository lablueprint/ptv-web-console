import dashify from 'dashify';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useState } from 'react';

export default function useNewDocumentForm(collection, initialState) {
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    event.preventDefault();
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!formState.title) {
      setError({ message: 'Title must not be empty' });
    } else {
      const encodedAndDashifiedDocId = encodeURI(dashify(formState.title, { condense: true }));

      const docRef = firebase
        .firestore()
        .collection(collection)
        .doc(encodedAndDashifiedDocId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setError({ message: `${doc.data().title} already exists.` });
          } else {
            setError(null);
            setFormState(initialState);
            docRef
              .set(formState)
              .catch((err) => {
                setError(err);
              });
          }
        });
    }
  };

  return {
    onChange, onSubmit, error, ...formState,
  };
}
