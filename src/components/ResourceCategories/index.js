import React from 'react';
import { useCollectionSnapshot } from '../../hooks';
import { withAuthorization } from '../Session';
import ResourceCategoriesList from './ResourceCategoriesList';
import NewResourceCategoryForm from './NewResourceCategoryForm';

function ResourceCategoriesPage() {
  const { data, loading, error } = useCollectionSnapshot('resource_categories');

  return (
    <div>
      <h1>Categories</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <NewResourceCategoryForm />
      <ResourceCategoriesList categories={data} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourceCategoriesPage);
export { ResourceCategoriesList, NewResourceCategoryForm };
