import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { ForumPostsListByApproval, FormattedReferencedDataField, RepliesChip } from './ForumPostsList';

const approvedPostsListColumns = [
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
        notFoundMessage="Category not found"
        render={(item) => <>{item}</>}
      />
    ),
  },
  {
    id: 'approvedAt',
    label: 'Approved At',
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
  {
    id: 'id',
    label: 'Replies',
    format: (value) => <RepliesChip postID={value} />,
  },
];

export default function ForumApprovedPostsList() {
  const theme = useTheme();

  const approvedActionButtons = useMemo(() => ([
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
  ]), [theme.palette.error.main, theme.palette.text.main]);

  return (
    <Switch>
      {/* Nested route to an individual post goes here */}
      <Route exact>
        <ForumPostsListByApproval
          approved
          columns={approvedPostsListColumns}
          actionButtons={approvedActionButtons}
        />
      </Route>
    </Switch>
  );
}
