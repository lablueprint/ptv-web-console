import React, { useCallback, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase/app';
import { FormattedReferencedDataField } from './ForumPostsList';
import ListView from '../ListView';
import 'firebase/firestore';

const pendingPostsListColumns = [
  {
    id: 'userID',
    label: 'User',
    format: (value) => (
      <FormattedReferencedDataField
        collection="users"
        id={value}
        field="displayName"
        notFoundMessage="User not found"
        render={(item) => <>{item}</>}
      />
    ),
  },
  {
    id: 'title',
    label: 'Post Title',
  },
  {
    id: 'categoryID',
    label: 'Category',
    format: (value) => (
      <FormattedReferencedDataField
        collection="forum_categories"
        id={value}
        field="title"
        notFoundMessage="Catego;ry not found"
        render={(item) => <>{item}</>}
      />
    ),
  },
  {
    id: 'createdAt',
    label: 'Created At',
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
];

export default function ForumPendingPostsList() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const pendingActionButtons = [
    {
      Icon: EditIcon,
      color: theme.palette.text.main,
    },
    {
      Icon: CheckIcon,
      color: theme.palette.success.main,
    },
    {
      Icon: ClearIcon,
      color: theme.palette.error.main,
    },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    firebase.firestore().collection('forum_posts')
      .where('approved', '==', false)
      .orderBy('createdAt')
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
      columns={pendingPostsListColumns}
      actionButtons={pendingActionButtons}
    />
  );
}
