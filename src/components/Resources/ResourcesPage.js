import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
import CategoriesGrid from './Category/CategoriesGrid';
import 'firebase/firestore';


export default function ResourcesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('resource_categories')
      .get()
      .then((snapshot) => {
        setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Resource Categories</h1>
      {loading && <CircularProgress />}
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ display: 'flex' }}>
        <CategoriesGrid categories={categories} />
      </div>
    </div>
  );
}
