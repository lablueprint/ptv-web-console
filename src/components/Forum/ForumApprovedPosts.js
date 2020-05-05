import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { ForumPostsListByApproval, RepliesChip } from './ForumPostsList';

const approvedPostsListColumns = [
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

  return (
    <Switch>
      {/* Nested route to an individual post goes here */}
      <Route exact>
        <ForumPostsListByApproval
          approved
          additionalColumns={approvedPostsListColumns}
          actionButtons={approvedActionButtons}
        />
      </Route>
    </Switch>
  );
}
