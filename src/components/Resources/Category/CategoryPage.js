import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import firebase from 'firebase/app';
import { useDocumentOnce, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { ResourcesList } from '../Resource';
import EditCategoryForm from './EditCategoryForm';
import 'firebase/firestore';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState({});
  const [categorySnapshot, categoryLoading, categoryError] = useDocumentOnce(firebase.firestore().collection('resource_categories').doc(categoryId));
  const [resourcesSnapshot, resourcesLoading, resourcesError] = useCollectionOnce(firebase.firestore().collection('resources').where('categoryId', '==', categoryId));

  useEffect(() => {
    if (categorySnapshot) {
      setCategory({ ...categorySnapshot.data(), id: categorySnapshot.id });
    }
  }, [categorySnapshot]);

  useEffect(() => {
    if (resourcesSnapshot) {
      setResources(resourcesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }, [resourcesSnapshot]);

  const loading = categoryLoading && resourcesLoading;

  return (
    <div>
      <ClipLoader loading={loading} />
      {!loading && (
        <>
          <h1>{`Resources in ${category.title}`}</h1>

          {categoryError && <p>{categoryError.message}</p>}
          {resourcesError && <p>{resourcesError.message}</p>}

          <div>
            <table>
              <tbody>
                <tr>
                  <td>Author</td>
                  <td>{category.author}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{category.createdAt ? category.createdAt.toDate().toString() : null}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{category.updatedAt ? category.updatedAt.toDate().toString() : null}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <EditCategoryForm currentState={categorySnapshot.data()} />

          <Link to={`/resources/${categoryId}/new`}>New resource</Link>

          <ResourcesList
            resources={resources}
            categoryId={categoryId}
          />
        </>
      )}
    </div>
  );
}
