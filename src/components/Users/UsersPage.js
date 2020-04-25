import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import UsersList from './UsersList';

const useStyles = makeStyles({
  searchBarRoot: {
    // marginBottom: 20,
    padding: 5,
    display: 'flex',
    // alignItems: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 10,
  },
});

export default function UsersPage() {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('users'),
  );

  const [users, setUsers] = useState([]);

  const classes = useStyles();

  /* Search bar text state */
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    if (value) {
      setUsers(value.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }, [value]);

  return (
    <div>
      <h1>Users List</h1>
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
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <UsersList users={users} searchText={searchText} />
    </div>
  );
}
