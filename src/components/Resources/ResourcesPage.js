import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import firebase from 'firebase/app';
import { CategoriesList } from './Category';
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
      <ClipLoader loading={loading} />
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/resources/new">Create a new category</Link>
      <CategoriesList categories={categories} />
    </div>
  );
}
