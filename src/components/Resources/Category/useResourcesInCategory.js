import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function useResourcesInCategory(categoryURLId, isMounted) {
  const [category, setCategory] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('resource_categories')
      .where('urlId', '==', categoryURLId)
      .get()
      .then((categorySnapshot) => {
        categorySnapshot.docs.forEach((categoryDoc) => {
          if (isMounted) {
            setCategory({ ...categoryDoc.data(), id: categoryDoc.id });
          }
        });
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });
  }, [categoryURLId, isMounted]);

  useEffect(() => {
    if (category) {
      const unsubscribe = firebase
        .firestore()
        .collection(`resource_categories/${category.id}/resources`)
        .onSnapshot((resourcesSnapshot) => {
          if (isMounted && category) {
            setResources(resourcesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
          }
        }, (err) => {
          if (isMounted) {
            setError(err);
          }
        });
      return unsubscribe;
    }
    return () => {};
  }, [category, isMounted]);

  return {
    category, resources, loading, error,
  };
}
