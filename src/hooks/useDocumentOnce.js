import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function useDocumentOnce(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .doc(path)
      .get()
      .then((snapshot) => {
        setLoading(false);
        setData({ id: snapshot.id, ...snapshot.data() });
      })
      .catch((err) => {
        setError(err);
      });
  }, [path]);

  return { data, loading, error };
}
