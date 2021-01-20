import React, { useCallback, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import * as ROUTES from '../../constants/routes';
import firebase from 'firebase/app';
import { FormattedReferencedDataField, RepliesChip } from './ForumPostsList';
import ListView from '../ListView';
import 'firebase/firestore';

const approvedPostsListColumnsSortIndex = 1;
const approvedPostsListColumnsTimeIndex = 3;
const approvedPostsListColumns = [
  {
    id: 'userID',
    label: 'User',
    search: false,
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
    search: true,
  },
  {
    id: 'categoryID',
    label: 'Category',
    search: false,
    format: (value) => (
      <FormattedReferencedDataField
        collection="forum_categories"
        id={value}
        field="title"
        notFoundMessage="Category not found"
        render={(item) => <>{item}</>}
      />
    ),
  },
  {
    id: 'approvedAt',
    label: 'Approved At',
    search: false,
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
  {
    id: 'id',
    label: 'Replies',
    search: false,
    format: (value) => <RepliesChip postID={value} />,
  },
];

export default function ForumApprovedPostsList() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const approvedActionButtons = [
    {
      Icon: ReplyIcon,
    },
    {
      Icon: EditIcon,
      color: theme.palette.text.main,
    },
    {
      Icon: DeleteIcon,
      color: theme.palette.error.main,
    },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    firebase.firestore().collection('forum_posts')
      .where('approved', '==', true)
      .orderBy('approvedAt')
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
    <Switch>
      <Route exact path={ROUTES.FORUM_APPROVED_POST_DETAILS}>
        <ForumApprovedPostDetails />
      </Route>
      <Route exact path={ROUTES.FORUM_APPROVED_POSTS}>
        <ListView
          rows={rows}
          loading={loading}
          errorMessage={errorMessage}
          columns={approvedPostsListColumns}
          actionButtons={approvedActionButtons}
          sortColumnIndex={approvedPostsListColumnsSortIndex}
          timestampColumnIndex={approvedPostsListColumnsTimeIndex}
        />
      </Route>
    </Switch>
  );
}
