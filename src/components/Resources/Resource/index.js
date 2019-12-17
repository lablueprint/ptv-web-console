import { createEditorStateFromRaw } from 'draftail';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from 'draft-js';
import { useDocumentSnapshot } from '../../../hooks';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';
import ResourcesList from './ResourcesList';
import NewResourcePage from './NewResourcePage';

function ResourcePage() {
  const { category, resourceId } = useParams();
  const { data, loading, error } = useDocumentSnapshot(`resource_categories/${category}/resources/${resourceId}`);

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <h1>{data.title}</h1>
      <p>{data.description}</p>

      <hr />

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
