import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import UsersList from './UsersList';

export default function UsersPage() {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('users'),
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (value) {
      setUsers(value.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }, [value]);

  return (
    <div>
      <h1>Users List</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <UsersList users={users} />
    </div>
  );
}
