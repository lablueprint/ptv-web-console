import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ResourcesList } from '../Resource';
import useResourcesInCategory from './useResourcesInCategory';
import EditCategoryForm from './EditCategoryForm';

export default function CategoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { categoryURLId } = useParams();
  const {
    category, resources, loading, error,
  } = useResourcesInCategory(categoryURLId, isMounted);

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

          <div>
            <table>
              <tbody>
                <tr>
                  <td>Author</td>
                  <td>{category.author}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{category.created.toDate().toString()}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{category.updated.toDate().toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

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
