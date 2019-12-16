import dashify from 'dashify';
import * as Firebase from 'firebase/app';
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

    const encodedAndDashifiedDocId = encodeURI(dashify(formState.title));

    const docRef = Firebase
      .firestore()
      .collection(collection)
      .doc(encodedAndDashifiedDocId);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setError({ message: `Category ${doc.data().title} already exists.` });
        } else {
          setError(null);
          docRef
            .set(formState)
            .catch((err) => {
              setError(err);
            });
        }
      });
  };

  return {
    onChange, onSubmit, error, ...formState,
  };
}
