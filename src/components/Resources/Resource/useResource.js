import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useResource(categoryURLId, resourceURLId, isMounted) {
  const [category, setCategory] = useState(null);
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('resource_categories')
      .where('urlId', '==', categoryURLId)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (isMounted) {
            setCategory({ ...doc.data(), id: doc.id });
          }
        });
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });
  }, [categoryURLId, isMounted, resourceURLId]);

  useEffect(() => {
    if (category) {
      firebase
        .firestore()
        .collection(`resource_categories/${category.id}/resources`)
        .where('urlId', '==', resourceURLId)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (isMounted) {
              setResource({ ...doc.data(), id: doc.id });
              setLoading(false);
            }
          });
        })
        .catch((err) => {
          if (isMounted) {
            setError(err);
          }
        });
    }
  }, [category, isMounted, resourceURLId]);

  return {
    category, resource, loading, error,
  };
}
