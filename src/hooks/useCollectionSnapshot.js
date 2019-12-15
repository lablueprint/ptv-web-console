import React, { useState, useEffect } from 'react';
import * as Firebase from 'firebase/app';
import 'firebase/firestore';

export default function useCollectionSnapshot(collection) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection(collection)
      .onSnapshot((snapshot) => {
        setLoading(false);
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }, (err) => {
        setError(err);
      });
    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { data, loading, error };
}
