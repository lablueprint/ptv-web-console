import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import EditResourceForm from './EditResourceForm';


export default function ResourcePage() {
  const { categoryId, resourceId } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const [categorySnapshot, categoryLoading, categoryError] = useDocumentOnce(
    firebase.firestore().collection('resource_categories').doc(categoryId),
  );
  const [resourceSnapshot, resourceLoading, resourceError] = useDocumentOnce(
    firebase.firestore().collection('resources').doc(resourceId),
  );
  const [category, setCategory] = useState({});
  const [resource, setResource] = useState([]);

  useEffect(() => {
    if (categorySnapshot) {
      setCategory({ ...categorySnapshot.data(), id: categorySnapshot.id });
    }
  }, [categorySnapshot]);

  useEffect(() => {
    if (resourceSnapshot) {
      setResource({ ...resourceSnapshot.data(), id: resourceSnapshot.id });
    }
  }, [resourceSnapshot]);

  const loading = categoryLoading && resourceLoading;

  return (
    <div>
      <ClipLoader loading={loading} />
      {!loading && (
        <>
          <h1>{`Category: ${category.title}`}</h1>

          <hr />

          {categoryError && <p>{categoryError.message}</p>}
          {resourceError && <p>{resourceError.message}</p>}

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
            <button disabled={!readOnly} type="button" onClick={() => { setReadOnly(false); }}>
              Edit
            </button>
          </div>

          <div>
            <EditResourceForm
              readOnly={readOnly}
              currentState={resource}
            />
          </div>
        </>
      )}
    </div>
  );
}
