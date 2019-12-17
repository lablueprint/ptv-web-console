import React from 'react';
import { useCollectionSnapshot } from '../../hooks';
import { withAuthorization } from '../Session';
import CategoryPage, { CategoriesList, NewCategoryForm } from './Category';
import ResourcePage, { NewResourcePage } from './Resource';

function ResourcesPage() {
  const { data, loading, error } = useCollectionSnapshot('resource_categories');

  return (
    <div>
      <h1>Resource Categories</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <NewCategoryForm />
      <CategoriesList categories={data} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcesPage);
export { CategoryPage, ResourcePage, NewResourcePage };
