import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuthorization } from '../Session';
import ResourcesList from './ResourcesList';
import { useCollectionSnapshot, useDocumentOnce } from '../../hooks';
import NewResourceForm from './NewResourceForm';

function ResourcesPage() {
  const { category } = useParams();
  const categoryPath = `resource_categories/${category}`;
  const { data, loading, error } = useCollectionSnapshot(`${categoryPath}/resources`);
  const categoryData = useDocumentOnce(categoryPath);
  return (
    <div>
      <h1>{!categoryData.loading && `Resources in ${categoryData.data.title} category`}</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <NewResourceForm />
      <ResourcesList resources={data} category={category} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcesPage);
export { ResourcesList, NewResourceForm };
