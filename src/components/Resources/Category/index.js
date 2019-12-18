import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { useCollectionSnapshot } from '../../../hooks';
import { withAuthorization } from '../../Session';
import { ResourcesList } from '../Resource';
import CategoriesList from './CategoriesList';
import DeleteCategoryButton from './DeleteCategoryButton';
import NewCategoryForm from './NewCategoryForm';

import 'firebase/firestore';

function CategoryPage() {
  const { categoryURLId } = useParams();
  const [categoryDoc, setCategoryDoc] = useState({});
  const [categoryLoading, setCategoryLoading] = useState(true);
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

  const resourcesPath = `resource_categories/${categoryDoc.id}/resources`;
  const { data, loading, error } = useCollectionSnapshot(resourcesPath);

  return (
    <div>
      <h1>{!categoryLoading && `Resources in ${categoryDoc.title} category`}</h1>
      {categoryError && <p>{categoryError.message}</p>}
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <Link to={`/resources/${categoryURLId}/new`}>New resource</Link>
      <ResourcesList
        resources={data}
        categoryURLId={categoryURLId}
        categoryFirestoreId={categoryDoc.id}
      />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryPage);
export { CategoriesList, NewCategoryForm, DeleteCategoryButton };
