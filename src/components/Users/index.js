import React from 'react';
import useCollectionSnapshot from '../../hooks/useCollectionSnapshot';
import UsersList from './UsersList';

export default function UsersPage() {
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

export { UsersList };
