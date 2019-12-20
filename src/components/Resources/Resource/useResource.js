import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useResource(categoryURLId, resourceURLId, isMounted) {
  const [categoryTitle, setCategoryTitle] = useState('');

  const [resource, setResource] = useState({});
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
            setCategoryTitle(categoryDoc.data().title);
          }
          firebase
            .firestore()
            .collection(`resource_categories/${categoryDoc.id}/resources`)
            .where('urlId', '==', resourceURLId)
            .get()
            .then((resourceSnapshot) => {
              if (isMounted) {
                setLoading(false);
              }

              resourceSnapshot.docs.forEach((resourceDoc) => {
                if (isMounted) {
                  setResource({ ...resourceDoc.data(), id: resourceDoc.id });
                }
              });
            })
            .catch((err) => {
              if (isMounted) {
                setError(err);
              }
            });
        });
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });
  }, [categoryURLId, isMounted, resourceURLId]);

  return {
    categoryTitle, resource, loading, error,
  };
}
