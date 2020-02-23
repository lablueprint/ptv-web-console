import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { CategoriesList } from './Category';
import 'firebase/firestore';

export default function ResourcesPage() {
  const [snapshot, loading, error] = useCollectionOnce(
    firebase.firestore().collection('resource_categories'),
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (snapshot) {
      setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }, [snapshot]);

  return (
    <div>
      <h1>Resource Categories</h1>
      <ClipLoader loading={loading} />
      {error && <p>{error.message}</p>}
      <Link to="/resources/new">Create a new category</Link>
      <CategoriesList categories={categories} />
    </div>
  );
}
