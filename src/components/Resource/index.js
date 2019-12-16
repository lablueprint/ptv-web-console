import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { useDocumentSnapshot } from '../../hooks';

function ResourcePage() {
  const { category, resourceId } = useParams();
  const { data, loading, error } = useDocumentSnapshot(`resource_categories/${category}/resources/${resourceId}`);
  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(ResourcePage);
