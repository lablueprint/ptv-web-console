import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import EditResourceForm from './EditResourceForm';
import useResource from './useResource';

export default function ResourcePage() {
  const { categoryURLId, resourceURLId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const {
    category, resource, loading, error,
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
          <h1>{`Category: ${category.title}`}</h1>

          <hr />

          {error && <p>{error.message}</p>}

          <div>
            <button disabled={!readOnly} type="button" onClick={() => { setReadOnly(false); }}>
              Edit
            </button>
          </div>

          <div>
            <EditResourceForm
              readOnly={readOnly}
              currentState={resource}
              categoryFirestoreId={category.id}
            />
          </div>
        </>
      )}
    </div>
  );
}
