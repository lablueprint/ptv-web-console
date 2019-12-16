import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuthorization } from '../Session';
import ResourcesList from './ResourcesList';
import { useCollectionSnapshot } from '../../hooks';

function ResourcesPage() {
  const { category } = useParams();
  const resourcesPath = `resource_categories/${category}/resources`;
  const { data, loading, error } = useCollectionSnapshot(resourcesPath);
  return (
    <div>
      <h1>{category}</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ResourcesList resources={data} category={category} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ResourcesPage);
export { ResourcesList };
