import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase/app';
import { ResourcesList } from '../Resource';
import 'firebase/firestore';

export default function CategoryPage() {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState(null);

  useEffect(() => {
    setCategoryLoading(true);
    firebase.firestore().collection('resource_categories').doc(categoryId)
      .get()
      .then((snapshot) => {
        setCategory({ ...snapshot.data(), id: snapshot.id });
        setCategoryLoading(false);
      })
      .catch((error) => {
        setCategoryErrorMessage(error.message);
        setCategoryLoading(false);
      });
  }, [categoryId]);

  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesErrorMessage, setResourcesErrorMessage] = useState(null);

  useEffect(() => {
    setResourcesLoading(true);
    firebase.firestore().collection('resources').where('categoryId', '==', categoryId)
      .get()
      .then((snapshot) => {
        setResources(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setResourcesLoading(false);
      })
      .catch((error) => {
        setResourcesErrorMessage(error.message);
        setResourcesLoading(false);
      });
  }, [categoryId]);

  const loading = categoryLoading && resourcesLoading;

  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <h1>{`Resources in ${category.title}`}</h1>

          {categoryErrorMessage && <p>{categoryErrorMessage}</p>}
          {resourcesErrorMessage && <p>{resourcesErrorMessage}</p>}

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

          <Link to={`/resources/${categoryId}/edit`}>Edit category</Link>
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
