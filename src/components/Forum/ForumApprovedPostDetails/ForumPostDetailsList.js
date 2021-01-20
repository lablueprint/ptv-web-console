import React from 'react';
import {
  Table, TableContainer, TableBody, TableRow, Typography, withStyles,
  IconButton,
} from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiTableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';

const labelsColumnWidth = 160;

const dateFormatOptions = {
  dateStyle: 'long', timeStyle: 'long',
};

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell);

const ActionButtons = withTheme(({ theme }) => (
  [
    {
      Icon: ReplyIcon,
      label: 'Reply',
    },
    {
      Icon: EditIcon,
      color: theme.palette.text.main,
      label: 'Edit',
    },
    {
      Icon: DeleteIcon,
      color: theme.palette.error.main,
      label: 'Delete',
    },
  ].map(({ Icon, color, label }) => (
    <IconButton key={label} style={{ marginRight: theme.spacing(2) }}>
      <Icon style={{ color, marginRight: theme.spacing(1) }} />
      <Typography variant="body2" style={{ color }}>
        <strong>{label}</strong>
      </Typography>
    </IconButton>
  ))));

export default function ForumPostDetailsList({
  post, user, userLoading, category, categoryLoading,
}) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {[
            {
              label: 'User',
              data: user && user.displayName,
              loading: userLoading,
            },
            {
              label: 'Title',
              data: post && post.title,
            },
            {
              label: 'Category',
              data: category && category.title,
              loading: categoryLoading,
            },
            {
              label: 'Body',
              data: post && post.body,
            },
            {
              label: 'Approved At',
              data: post && post.approvedAt
                && post.approvedAt.toDate().toLocaleString('en-us', dateFormatOptions),
            },
          ].map(({ label, data, loading }) => (
            <TableRow key={label}>
              <TableCell style={{ width: labelsColumnWidth, fontWeight: 'bold' }}>
                <Typography style={{ fontWeight: 'bold' }}>{label}</Typography>
              </TableCell>
              <TableCell>
                {loading ? <CircularProgress size={20} />
                  : (
                    <Typography color={data ? 'textPrimary' : 'error'}>
                      {data || 'Data not found'}
                    </Typography>
                  )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell style={{ width: labelsColumnWidth }} />
            <TableCell>
              <ActionButtons />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ForumPostDetailsList.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    approvedAt: PropTypes.shape({
      toDate: PropTypes.func,
    }),
  }),
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  userLoading: PropTypes.bool.isRequired,
  categoryLoading: PropTypes.bool.isRequired,
};

ForumPostDetailsList.defaultProps = {
  post: {},
  user: {},
  category: {},
};
