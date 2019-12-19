import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase/app';
import ClipLoader from 'react-spinners/ClipLoader';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';

function useCategoryFromURLId(categoryURLId, isMounted) {
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
          snapshot.docs.forEach((doc) => {
            setCategoryDoc({ ...doc.data(), id: doc.id });
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setCategoryError(err);
        }
      });
  }, [categoryURLId, isMounted]);

  return { data, loading, error };
}

function NewResourcePage() {
  const { categoryURLId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useCategoryFromURLId(categoryURLId, isMounted);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div>
      <ClipLoader loading={loading} />
      {!loading && (
        <>
          <h1>{`Create a new resource in ${data.title} category`}</h1>
          {error && <p>{error.message}</p>}
          <NewResourceForm categoryURLId={categoryURLId} categoryFirestoreId={data.id} />
        </>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NewResourcePage);
