import { useTheme } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import React, { useMemo } from 'react';
import { ForumPostsListByApproval, FormattedReferencedDataField } from './ForumPostsList';

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
        notFoundMessage="Category not found"
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

  const pendingActionButtons = useMemo(() => ([
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
  ]), [theme.palette.error.main, theme.palette.success.main, theme.palette.text.main]);

  return (
    <ForumPostsListByApproval
      approved={false}
      columns={pendingPostsListColumns}
      actionButtons={pendingActionButtons}
    />
  );
}
