import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { withAuthorization } from '../../Session';
import { ResourcesList } from '../Resource';
import CategoriesList from './CategoriesList';
import DeleteCategoryButton from './DeleteCategoryButton';
import NewCategoryForm from './NewCategoryForm';

function useResources(categoryURLId) {
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
              setLoading(false);
              setResources(resourcesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            })
            .catch((err) => {
              setError(err);
            });
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [categoryURLId]);

  return {
    categoryTitle, categoryFirestoreId, resources, loading, error,
  };
}


function CategoryPage() {
  const { categoryURLId } = useParams();
  const {
    categoryTitle, categoryFirestoreId, resources, loading, error,
  } = useResources(categoryURLId);

  return (
    <div>
      {loading && <p>loading...</p>}
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
export { CategoriesList, NewCategoryForm, DeleteCategoryButton };
