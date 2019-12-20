import { Editor } from 'draft-js';
import { createEditorStateFromRaw } from 'draftail';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { withAuthorization } from '../../Session';
import useResource from './useResource';


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
