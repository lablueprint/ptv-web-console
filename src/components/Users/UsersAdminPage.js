import React, { useCallback, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ListView from '../ListView';

const usersListColumnsSortIndex = 0;
const usersListColumnsTimeIndex = 2;
const usersListColumns = [
  {
    id: 'name',
    label: 'Full Name',
    search: true,
  },
  {
    id: 'displayName',
    label: 'Display Name',
    search: true,
  },
  {
    id: 'updatedAt',
    label: 'Date Joined',
    search: false,
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
  {
    id: 'email',
    label: 'Email',
    search: true,
  },
];

export default function UsersAdminPage() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const pendingActionButtons = [
    {
      Icon: ClearIcon,
      color: theme.palette.error.main,
      action: (user) => {
        firebase.firestore().collection('users').doc(user.id)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            firebase.firestore().collection('users').doc(user.id).set({
              ...user,
              isBanned: !userData.isBanned,
            })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
      },
    },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    firebase.firestore().collection('users')
      .orderBy('updatedAt')
      .where('isAdmin', '==', true)
      .get()
      .then((snapshot) => {
        const forumData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRows(forumData);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ListView
      rows={rows}
      loading={loading}
      errorMessage={errorMessage}
      columns={usersListColumns}
      actionButtons={pendingActionButtons}
      sortColumnIndex={usersListColumnsSortIndex}
      timestampColumnIndex={usersListColumnsTimeIndex}
    />
  );
}
