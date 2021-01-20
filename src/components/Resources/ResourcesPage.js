import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesGrid from './Category/CategoriesGrid';
import 'firebase/firestore';


export default function ResourcesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const useStyles = makeStyles(() => ({
    categoriesContainer: {
      display: 'flex',
    },
  }));

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

  const classes = useStyles();
  return (
    <div>
      <h1>Resource Categories</h1>
      {loading && <CircularProgress />}
      {errorMessage && <p>{errorMessage}</p>}
      <div className={classes.categoriesContainer}>
        <CategoriesGrid categories={categories} />
      </div>
    </div>
  );
}
