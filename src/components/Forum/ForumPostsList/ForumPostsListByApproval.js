import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import FormattedReferencedDataField from './FormattedReferencedDataField';
import RepliesChip from './RepliesChip';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

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

export default function ForumPostsListByApproval({ approved }) {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    firebase.firestore().collection('forum_posts')
      .where('approved', '==', approved)
      .orderBy(approved ? 'approvedAt' : 'createdAt')
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
  }, [approved]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = useCallback((event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    event.preventDefault();
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const columns = useMemo(() => (
    approved ? approvedPostsListColumns : pendingPostsListColumns),
  [approved]);

  const actionButtons = useMemo(() => {
    const iconsColorsList = approved
      ? [
        [ReplyIcon],
        [EditIcon, theme.palette.text.main],
        [DeleteIcon, theme.palette.error.main],
      ]
      : [
        [EditIcon, theme.palette.text.main],
        [CheckIcon, theme.palette.success.main],
        [ClearIcon, theme.palette.error.main],
      ];
    return (
      <>
        {iconsColorsList.map(([Icon, color], i) => (
          // Array will not change; index is okay to use as key
          // eslint-disable-next-line react/no-array-index-key
          <IconButton key={i}>
            <Icon style={{ color }} />
          </IconButton>
        ))}
      </>
    );
  }, [approved, theme.palette.error.main, theme.palette.success.main, theme.palette.text.main]);

  return (
    <Paper className={classes.root} elevation={0}>
      {loading && <LinearProgress />}
      {errorMessage && <p>{errorMessage}</p>}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.label}>
                  <Chip color="primary" label={column.label} />
                </TableCell>
              ))}
              <TableCell>
                <Chip color="primary" label="Actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.label}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell>
                  {actionButtons}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

ForumPostsListByApproval.propTypes = {
  approved: PropTypes.bool.isRequired,
};
