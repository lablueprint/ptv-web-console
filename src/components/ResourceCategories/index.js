import React from 'react';
import useCollectionSnapshot from '../../hooks/useCollectionSnapshot';
import { withAuthorization } from '../Session';
import ResourceCategoriesList from './ResourceCategoriesList';

function ResourceCategoriesPage() {
  const { data, loading, error } = useCollectionSnapshot('resource_categories');

  return (
    <div>
      <h1>Categories</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ResourceCategoriesList categories={data} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourceCategoriesPage);
export { ResourceCategoriesList };
