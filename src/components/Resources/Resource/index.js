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

  const [categoryTitle, setCategoryTitle] = useState('');

  const [data, setData] = useState({});
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
              setLoading(false);
              resourceSnapshot.docs.forEach((resourceDoc) => {
                setData({ ...resourceDoc.data(), id: resourceDoc.id });
              });
            })
            .catch((err) => {
              setError(err);
            });
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [categoryURLId, resourceURLId]);

  return (
    <div>
      <h1>{`Category: ${categoryTitle}`}</h1>

      <hr />

      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {error && <p>{error.message}</p>}

      <hr />

      {loading && <p>loading...</p>}

      <div>
        {data.body
        && <Editor readOnly editorState={createEditorStateFromRaw(JSON.parse(data.body))} />}
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcePage);
export { NewResourceForm, ResourcesList, NewResourcePage };
