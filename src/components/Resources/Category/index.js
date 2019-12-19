import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { withAuthorization } from '../../Session';
import { ResourcesList } from '../Resource';
import CategoriesList from './CategoriesList';
import DeleteCategoryButton from './DeleteCategoryButton';
import NewCategoryForm from './NewCategoryForm';
import NewCategoryPage from './NewCategoryPage';

function useResources(categoryURLId, isMounted) {
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
          setCategoryTitle(categoryDoc.data().title);
          setCategoryFirestoreId(categoryDoc.id);
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


function CategoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { categoryURLId } = useParams();
  const {
    categoryTitle, categoryFirestoreId, resources, loading, error,
  } = useResources(categoryURLId, isMounted);

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
          <h1>{`Resources in ${categoryTitle} category`}</h1>
          <Link to={`/resources/${categoryURLId}/new`}>New resource</Link>

          {error && <p>{error.message}</p>}

          <ResourcesList
            resources={resources}
            categoryURLId={categoryURLId}
            categoryFirestoreId={categoryFirestoreId}
          />
        </>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryPage);
export {
  CategoriesList, NewCategoryForm, DeleteCategoryButton, NewCategoryPage,
};
