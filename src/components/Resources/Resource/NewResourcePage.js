import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';

function NewResourcePage() {
  const { categoryURLId } = useParams();

  const [categoryDoc, setCategoryDoc] = useState({});
  const [categoryLoading, setCategoryLoading] = React.useState(true);
  const [categoryError, setCategoryError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('resource_categories')
      .where('urlId', '==', categoryURLId)
      .get()
      .then((snapshot) => {
        setCategoryLoading(false);
        snapshot.docs.forEach((doc) => {
          setCategoryDoc({ ...doc.data(), id: doc.id });
        });
      })
      .catch((err) => {
        setCategoryError(err);
      });
  }, [categoryURLId]);


  return (
    <div>
      <h1>{!categoryLoading && `Create a new resource in ${categoryDoc.title} category`}</h1>
      {categoryError && <p>{categoryError.message}</p>}
      <NewResourceForm categoryURLId={categoryURLId} categoryFirestoreId={categoryDoc.id} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NewResourcePage);
