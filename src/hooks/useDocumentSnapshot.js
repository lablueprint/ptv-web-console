import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function useDocumentSnapshot(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .doc(path)
      .onSnapshot((snapshot) => {
        setLoading(false);
        setData({ id: snapshot.id, ...snapshot.data() });
      }, (err) => {
        setError(err);
      });
    return () => {
      unsubscribe();
    };
  }, [path]);

  return { data, loading, error };
}
