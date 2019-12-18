import { Editor } from 'draft-js';
import { createEditorStateFromRaw } from 'draftail';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';
import NewResourcePage from './NewResourcePage';
import ResourcesList from './ResourcesList';

function ResourcePage() {
  const { categoryURLId, resourceURLId } = useParams();

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

  const [resourceDoc, setResourceDoc] = useState({});
  const [resourceLoading, setResourceLoading] = useState(true);
  const [resourceError, setResourceError] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`resource_categories/${categoryDoc.id}/resources`)
      .where('urlId', '==', resourceURLId || '')
      .get()
      .then((snapshot) => {
        setResourceLoading(false);
        snapshot.docs.forEach((doc) => {
          setResourceDoc({ ...doc.data(), id: doc.id });
        });
      })
      .catch((err) => {
        setResourceError(err);
      });
  }, [categoryDoc.id, resourceURLId]);

  return (
    <div>

      {!categoryLoading && <h1>{categoryDoc.title}</h1>}
      {categoryError && <p>{categoryError.message}</p>}
      <h1>{resourceDoc.title}</h1>
      <p>{resourceDoc.description}</p>
      {resourceLoading && <p>loading...</p>}
      {resourceError && <p>{resourceError.message}</p>}

      <hr />

      <div>
        {resourceDoc.body
        && <Editor readOnly editorState={createEditorStateFromRaw(JSON.parse(resourceDoc.body))} />}
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcePage);
export { NewResourceForm, ResourcesList, NewResourcePage };
