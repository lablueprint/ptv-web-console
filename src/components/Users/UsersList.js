import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchBarRoot: {
    marginBottom: 20,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '20%',
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

function GetUserItems({ users, searchText }) {
  return users.filter((user) => !searchText
  || ((user.name ? user.name : '').toLowerCase().search(searchText) !== -1
  || (user.displayName ? user.displayName : '').toLowerCase().search(searchText) !== -1)
  || (user.email ? user.email : '').toLowerCase().search(searchText) !== -1).map((user) => (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">{user.displayName}</TableCell>
      <TableCell align="center">{user.name}</TableCell>
      <TableCell align="center">{user.updatedAt ? user.updatedAt.toDate().toUTCString() : 'N/A'}</TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">{user.role}</TableCell>
      <TableCell align="center">
        <Button>
          Ban
        </Button>
      </TableCell>
    </TableRow>
  ));
}

export default function UsersList({ users }) {
  const classes = useStyles();
  const [userItems, setUserItems] = useState(null);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    setUserItems(<GetUserItems users={users} searchText={searchText} />);
  }, [users, searchText]);

  return (
    <div>
      <Paper component="form" className={classes.searchBarRoot}>
        <InputBase
          className={classes.input}
          placeholder="Search Users"
          inputProps={{ 'aria-label': 'search users' }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Display Name</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date Joined</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userItems}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

GetUserItems.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  searchText: PropTypes.string.isRequired,
};
