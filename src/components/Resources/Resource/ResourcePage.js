import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import firebase from 'firebase/app';
import EditResourceForm from './EditResourceForm';


export default function ResourcePage() {
  const { categoryId, resourceId } = useParams();

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

  const [resource, setResource] = useState({});
  const [resourceLoading, setResourceLoading] = useState(true);
  const [resourceErrorMessage, setResourceErrorMessage] = useState(null);

  useEffect(() => {
    setResourceLoading(true);
    firebase.firestore().collection('resources').doc(resourceId)
      .get()
      .then((snapshot) => {
        setResource({ ...snapshot.data(), id: snapshot.id });
        setResourceLoading(false);
      })
      .catch((error) => {
        setResourceErrorMessage(error.message);
        setResourceLoading(false);
      });
  }, [resourceId]);


  const loading = categoryLoading && resourceLoading;

  return (
    <div>
      <ClipLoader loading={loading} />
      {!loading && (
        <>
          <h1>{`Category: ${category.title}`}</h1>

          <hr />

          {categoryErrorMessage && <p>{categoryErrorMessage}</p>}
          {resourceErrorMessage && <p>{resourceErrorMessage}</p>}

          <div>
            <table>
              <tbody>
                <tr>
                  <td>Author</td>
                  <td>{resource.author}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{resource.createdAt ? resource.createdAt.toDate().toString() : null}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{resource.updatedAt ? resource.updatedAt.toDate().toString() : null}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <EditResourceForm currentState={resource} />
          </div>
        </>
      )}
    </div>
  );
}
