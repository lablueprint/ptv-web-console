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
            <table>
              <tbody>
                <tr>
                  <td>Author</td>
                  <td>{resource.author}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{resource.created.toDate().toString()}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{resource.updated.toDate().toString()}</td>
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
              categoryFirestoreId={category.id}
            />
          </div>
        </>
      )}
    </div>
  );
}
