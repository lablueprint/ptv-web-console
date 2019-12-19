import { Editor } from 'draft-js';
import { createEditorStateFromRaw } from 'draftail';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';
import NewResourcePage from './NewResourcePage';
import ResourcesList from './ResourcesList';

function useResource(categoryURLId, resourceURLId, isMounted) {
  const [categoryTitle, setCategoryTitle] = useState('');

  const [resource, setResource] = useState({});
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
          firebase
            .firestore()
            .collection(`resource_categories/${categoryDoc.id}/resources`)
            .where('urlId', '==', resourceURLId)
            .get()
            .then((resourceSnapshot) => {
              if (isMounted) {
                setLoading(false);
                resourceSnapshot.docs.forEach((resourceDoc) => {
                  setResource({ ...resourceDoc.data(), id: resourceDoc.id });
                });
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
  }, [categoryURLId, isMounted, resourceURLId]);

  return {
    categoryTitle, resource, loading, error,
  };
}

function ResourcePage() {
  const { categoryURLId, resourceURLId } = useParams();
  const [isMounted, setIsMounted] = useState(false);

  const {
    categoryTitle, resource, loading, error,
  } = useResource(categoryURLId, resourceURLId, isMounted);

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
          <h1>{`Category: ${categoryTitle}`}</h1>

          <hr />

          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
          {error && <p>{error.message}</p>}

          <hr />

          <div>
            {resource.body
          && <Editor readOnly editorState={createEditorStateFromRaw(JSON.parse(resource.body))} />}
          </div>
        </>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcePage);
export { NewResourceForm, ResourcesList, NewResourcePage };
