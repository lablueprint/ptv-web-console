import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ResourcesList } from '../Resource';
import useResources from './useResources';
import EditCategoryForm from './EditCategoryForm';

export default function CategoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { categoryURLId } = useParams();
  const {
    category, resources, loading, error,
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
          <h1>{`Resources in ${category.title} category`}</h1>

          {error && <p>{error.message}</p>}

          <EditCategoryForm currentState={category} />

          <Link to={`/resources/${category.urlId}/new`}>New resource</Link>

          <ResourcesList
            resources={resources}
            categoryURLId={category.urlId}
            categoryFirestoreId={category.id}
          />
        </>
      )}
    </div>
  );
}
