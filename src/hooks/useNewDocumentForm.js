import dashify from 'dashify';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useState } from 'react';

export default function useNewDocumentForm(collection, initialState) {
  const [formState, setFormState] = useState(initialState);
  const [docId, setDocId] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    event.preventDefault();
    setFormState({ ...formState, [event.target.name]: event.target.value });
    setDocId(encodeURI(dashify(formState.title, { condense: true })));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formState.title) {
      setError({ message: 'Title must not be empty' });
      return false;
    }

    const docRef = firebase
      .firestore()
      .collection(collection)
      .doc(docId);

    const doc = await docRef.get();
    if (doc.exists) {
      setError({ message: `${doc.data().title} already exists.` });
      return false;
    }

    setError(null);
    setFormState(initialState);
    docRef
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
    onChange, onSubmit, setCustomField, error, ...formState, docId,
  };
}
