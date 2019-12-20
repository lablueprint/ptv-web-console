import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useResources from './useResources';
import { ResourcesList } from '../Resource';
import { withAuthorization } from '../../Session';

function CategoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { categoryURLId } = useParams();
  const {
    categoryTitle, categoryFirestoreId, resources, loading, error,
  } = useResources(categoryURLId, isMounted);

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
          <h1>{`Resources in ${categoryTitle} category`}</h1>
          <Link to={`/resources/${categoryURLId}/new`}>New resource</Link>

          {error && <p>{error.message}</p>}

          <ResourcesList
            resources={resources}
            categoryURLId={categoryURLId}
            categoryFirestoreId={categoryFirestoreId}
          />
        </>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryPage);
