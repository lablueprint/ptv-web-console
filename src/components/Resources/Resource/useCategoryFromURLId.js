import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function useCategoryFromURLId(categoryURLId, isMounted) {
  const [data, setCategoryDoc] = useState({});
  const [loading, setCategoryLoading] = React.useState(true);
  const [error, setCategoryError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('resource_categories')
      .where('urlId', '==', categoryURLId)
      .get()
      .then((snapshot) => {
        if (isMounted) {
          setCategoryLoading(false);
        }
        snapshot.docs.forEach((doc) => {
          if (isMounted) {
            setCategoryDoc({ ...doc.data(), id: doc.id });
          }
        });
      })
      .catch((err) => {
        if (isMounted) {
          setCategoryError(err);
        }
      });
  }, [categoryURLId, isMounted]);

  return { data, loading, error };
}
