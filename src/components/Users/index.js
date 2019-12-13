import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../Firebase';
import UsersList from './UsersList';

export default function UsersPage() {
  const firebase = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => firebase
    .users()
    .onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      setError(err);
    }), [firebase]);

  return (
    <div>
      <h1>Users</h1>
      {error && <p>error.message</p>}
      <UsersList users={users} />
    </div>
  );
}

export { UsersList };
