import React from 'react';
import { useCollectionSnapshot } from '../../hooks';
import UsersList from './UsersList';
import { withAuthorization } from '../Session';

function UsersPage() {
  const { data, loading, error } = useCollectionSnapshot('users');

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>loading...</p>}
      {error && <p>error.message</p>}
      <UsersList users={data} />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(UsersPage);
export { UsersList };
