import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { withAuthorization } from '../../Session';
import { ResourcesList } from '../Resource';
import CategoriesList from './CategoriesList';
import DeleteCategoryButton from './DeleteCategoryButton';
import NewCategoryForm from './NewCategoryForm';


function CategoryPage() {
  const { categoryURLId } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryFirestoreId, setCategoryFirestoreId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    firebase
      .firestore()
      .collection('resource_categories')
      .where('urlId', '==', categoryURLId)
      .get()
      .then((categorySnapshot) => {
        categorySnapshot.docs.forEach((categoryDoc) => {
          setCategoryTitle(categoryDoc.data().title);
          setCategoryFirestoreId(categoryDoc.id);
          unsubscribe = firebase
            .firestore()
            .collection(`resource_categories/${categoryDoc.id}/resources`)
            .onSnapshot((resourcesSnapshot) => {
              setLoading(false);
              setData(resourcesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }, (err) => {
              setError(err);
            });
        });
      })
      .catch((err) => {
        setError(err);
      });
    return () => {
      unsubscribe();
    };
  }, [categoryURLId]);

  return (
    <div>
      <h1>{`Resources in ${categoryTitle} category`}</h1>
      <Link to={`/resources/${categoryURLId}/new`}>New resource</Link>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ResourcesList
        resources={data}
        categoryURLId={categoryURLId}
        categoryFirestoreId={categoryFirestoreId}
      />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryPage);
export { CategoriesList, NewCategoryForm, DeleteCategoryButton };
