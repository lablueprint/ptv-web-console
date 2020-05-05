import { useTheme } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { ForumPostsListByApproval } from './ForumPostsList';

const pendingPostsListColumns = [
  {
    id: 'createdAt',
    label: 'Created At',
    format: (value) => (value ? value.toDate().toLocaleString() : 'Date not found'),
  },
];

export default function ForumPendingPostsList() {
  const theme = useTheme();

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

  return (
    <ForumPostsListByApproval
      approved={false}
      additionalColumns={pendingPostsListColumns}
      actionButtons={pendingActionButtons}
    />
  );
}
