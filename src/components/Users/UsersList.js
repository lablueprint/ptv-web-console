import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UsersList({ users }) {
  const classes = useStyles();
  const userItems = users.map((user) => (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">{user.id}</TableCell>
      <TableCell align="right">2020/04/30 12:05:02 GMT</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.role}</TableCell>
    </TableRow>
  ));
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Date Joined</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userItems}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
