import PropTypes from 'prop-types';
import React, {
  useState, useEffect, useCallback,
} from 'react';
import { useTheme, Typography, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  normalRow: {
    backgroundColor: 'White',
  },
  roleList: {
    display: 'inline-block',
    padding: 0,
    width: 'auto',
  },
  roleListItem: {
    backgroundColor: 'lightBlue',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  errorPop: {
    marginLeft: 10,
    color: theme.palette.error.main,
    marginBottom: '-8px',
  },
}));

const tableHeaders = [
  'Display Name',
  'Date Joined',
  'Email',
  'Action',
];

export default function UsersList({
  users, searchText, adminSwitch, selectedIndex, page, setPage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = useCallback((e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  }, [setPage]);

  const handleChangeRowsPerPage = useCallback((e) => {
    e.preventDefault();
    setRowsPerPage(e.target.value);
    setPage(0);
  }, [setPage]);

  useEffect(() => {
    setRows(users.filter((user) => !searchText
    || ((user.name ? user.name : '').toLowerCase().search(searchText) !== -1
    || (user.displayName ? user.displayName : '').toLowerCase().search(searchText) !== -1)
    || (user.email ? user.email : '').toLowerCase().search(searchText) !== -1)
      .filter((user) => (adminSwitch ? user.isAdmin : !user.isAdmin))
      .sort((userA, userB) => {
        if (!userA.updatedAt || !userB.updatedAt) { return true; }
        switch (selectedIndex) {
          case 0: /* Newest users */
            if (userA.updatedAt.toDate() < userB.updatedAt.toDate()) { return 1; }
            return -1;
          case 1: /* Oldest users */
            if (userA.updatedAt.toDate() > userB.updatedAt.toDate()) { return 1; }
            return -1;
          case 2: /* Name - Alphabetical */
            if (userA.name > userB.name) { return 1; }
            return -1;
          default: /* Invalid selection */
            return true;
        }
      })
      .map((user, index) => (
        <TableRow
          key={user.id}
          className={classes.normalRow}
        >
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            {user.displayName}
            {user.isBanned ? <ErrorIcon className={classes.errorPop} /> : null}
          </TableCell>
          <TableCell align="center">{user.name}</TableCell>
          <TableCell align="center">{user.updatedAt ? user.updatedAt.toDate().toUTCString() : 'N/A'}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">
            <IconButton
              onClick={() => {
                firebase.firestore().collection('users').doc(user.id).set({
                  ...user,
                  isBanned: !user.isBanned,
                })
                  .catch((error) => {
                    setErrorMessage(error.message);
                  });
              }}
            >
              <ClearIcon
                style={user.isBanned
                  ? { color: theme.palette.text.main }
                  : { color: theme.palette.error.main }}
              />
            </IconButton>
          </TableCell>
        </TableRow>
      )));
  }, [users,
    searchText,
    adminSwitch,
    selectedIndex,
    classes.normalRow,
    classes.roleList,
    classes.roleListItem,
    theme.palette.error.main,
    theme.palette.text.main,
    classes.errorPop,
    classes.fullCol,
    classes.fullText]);

  return (
    <Typography component="div">
      <TableContainer>
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" />
              <TableCell key="Full Name">
                <Chip color="primary" label="Full Name" />
              </TableCell>
              {tableHeaders.map((name) => (
                <TableCell align="center" key={name}>
                  <Chip color="primary" label={name} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Typography>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string,
      role: PropTypes.array,
      name: PropTypes.string,
      displayName: PropTypes.string,
      isAdmin: PropTypes.bool,
    }),
  ).isRequired,
  searchText: PropTypes.string.isRequired,
  adminSwitch: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
