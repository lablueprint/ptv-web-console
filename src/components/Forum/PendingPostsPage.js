import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';

const columns = [
  { id: 'displayName', label: 'User' },
  { id: 'title', label: 'Post Title' },
  {
    id: 'createdAt',
    label: 'Created At',
    format: (value) => value.toDate().toLocaleString(),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function PendingPostsPage() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]);

  const fetchData = useCallback(async () => {
    const forumSnapshot = await firebase.firestore().collection('forum_posts').orderBy('createdAt').get();
    const forumData = forumSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const userSnapshot = forumData.map((post) => firebase.firestore().collection('users').doc(post.userID).get());
    const userSnap = await Promise.all(userSnapshot);
    const usersData = userSnap.map((doc) => doc.data());
    setRows(forumData.map((post, i) => ({ ...post, displayName: (usersData[i] && usersData[i].displayName) || 'User not found' })));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && (typeof value === 'number' || typeof value === 'object') ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Button>Approve</Button>
                  <Button>Reject</Button>
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
