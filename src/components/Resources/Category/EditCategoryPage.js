import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import EditCategoryForm from './EditCategoryForm';
import 'firebase/firestore';

export default function EditCategoryPage() {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('resource_categories').doc(categoryId)
      .get()
      .then((snapshot) => {
        setCategory({ ...snapshot.data(), id: snapshot.id });
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div>
      <h1>Edit category</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {loading ? null : (
        <EditCategoryForm currentState={category} />
      )}
    </div>
  );
}
