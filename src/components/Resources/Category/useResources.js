import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function useResources(categoryURLId, isMounted) {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryFirestoreId, setCategoryFirestoreId] = useState('');
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
            setCategoryTitle(categoryDoc.data().title);
            setCategoryFirestoreId(categoryDoc.id);
          }
          firebase
            .firestore()
            .collection(`resource_categories/${categoryDoc.id}/resources`)
            .get()
            .then((resourcesSnapshot) => {
              if (isMounted) {
                setLoading(false);
                setResources(resourcesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
              }
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
  }, [categoryURLId, isMounted]);

  return {
    categoryTitle, categoryFirestoreId, resources, loading, error,
  };
}
